import { NextRequest, NextResponse } from "next/server";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

interface Attachment {
  filename: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const ctype = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let phone = "";
    let room = "";
    let message = "";
    const attachments: Attachment[] = [];
    let totalBytes = 0;

    if (ctype.includes("multipart/form-data")) {
      const form = await req.formData();
      name = String(form.get("name") || "").trim();
      email = String(form.get("email") || "").trim();
      phone = String(form.get("phone") || "").trim();
      room = String(form.get("room") || "").trim();
      message = String(form.get("message") || "").trim();

      const fileEntries = form.getAll("files").filter((v): v is File => v instanceof File);
      if (fileEntries.length > MAX_FILES) {
        return NextResponse.json(
          { error: `Maximálně ${MAX_FILES} souborů.` },
          { status: 400 }
        );
      }
      for (const file of fileEntries) {
        if (!ALLOWED_TYPES.has(file.type)) {
          return NextResponse.json(
            { error: `Nepovolený typ souboru: ${file.name}` },
            { status: 400 }
          );
        }
        if (file.size > MAX_FILE_BYTES) {
          return NextResponse.json(
            { error: `Soubor ${file.name} je větší než 4 MB.` },
            { status: 400 }
          );
        }
        totalBytes += file.size;
        if (totalBytes > MAX_TOTAL_BYTES) {
          return NextResponse.json(
            { error: "Celková velikost příloh přesahuje 4 MB." },
            { status: 400 }
          );
        }
        const buf = Buffer.from(await file.arrayBuffer());
        attachments.push({ filename: file.name, content: buf.toString("base64") });
      }
    } else {
      const body = (await req.json()) as Partial<{
        name: string;
        email: string;
        phone: string;
        room: string;
        message: string;
      }>;
      name = (body.name || "").trim();
      email = (body.email || "").trim();
      phone = (body.phone || "").trim();
      room = (body.room || "").trim();
      message = (body.message || "").trim();
    }

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: "Jméno a e-mail nebo telefon jsou povinné." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || "info@stropdesign.cz";

    const htmlBody = `
      <!DOCTYPE html>
      <html lang="cs">
      <head><meta charset="utf-8"></head>
      <body>
      <h2 style="font-family:Arial,sans-serif;">Nová poptávka z webu StropDesign</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
        <tr><td style="padding:6px 12px;font-weight:bold;">Jméno:</td><td style="padding:6px 12px;">${escapeHtml(name)}</td></tr>
        ${email ? `<tr><td style="padding:6px 12px;font-weight:bold;">E-mail:</td><td style="padding:6px 12px;">${escapeHtml(email)}</td></tr>` : ""}
        ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold;">Telefon:</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>` : ""}
        ${room ? `<tr><td style="padding:6px 12px;font-weight:bold;">Místnost:</td><td style="padding:6px 12px;">${escapeHtml(room)}</td></tr>` : ""}
        ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Zpráva:</td><td style="padding:6px 12px;">${escapeHtml(message)}</td></tr>` : ""}
        ${attachments.length ? `<tr><td style="padding:6px 12px;font-weight:bold;">Přílohy:</td><td style="padding:6px 12px;">${attachments.length} (viz přílohy mailu)</td></tr>` : ""}
      </table>
      </body>
      </html>
    `;

    let resendData: unknown = "dev-mode";

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "StropDesign <onboarding@resend.dev>",
          to: [toEmail],
          subject: `Poptávka od ${name}`,
          html: htmlBody,
          reply_to: email || undefined,
          attachments: attachments.length ? attachments : undefined,
        }),
      });

      resendData = await res.json();

      if (!res.ok) {
        console.error("Resend error:", JSON.stringify(resendData));
        return NextResponse.json(
          { error: "Nepodařilo se odeslat email.", debug: resendData },
          { status: 500 }
        );
      }
    } else {
      console.log("═══ NOVÁ POPTÁVKA (dev mode) ═══");
      console.log({ name, email, phone, room, message, attachments: attachments.length });
    }

    return NextResponse.json({ success: true, resend: resendData });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
