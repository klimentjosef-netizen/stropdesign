import { NextRequest, NextResponse } from "next/server";

/* ────────────────────────────────────────────
   POST /api/contact
   Přijme formulářová data a odešle email přes Resend.
   Pokud RESEND_API_KEY není nastavený, spadne do
   fallback režimu (loguje do konzole — vhodné pro dev).
   ──────────────────────────────────────────── */

interface ContactBody {
  name: string;
  email?: string;
  phone?: string;
  room?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    // Validace povinných polí
    if (!body.name?.trim() || (!body.email?.trim() && !body.phone?.trim())) {
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
        <tr><td style="padding:6px 12px;font-weight:bold;">Jméno:</td><td style="padding:6px 12px;">${escapeHtml(body.name)}</td></tr>
        ${body.email ? `<tr><td style="padding:6px 12px;font-weight:bold;">E-mail:</td><td style="padding:6px 12px;">${escapeHtml(body.email)}</td></tr>` : ""}
        ${body.phone ? `<tr><td style="padding:6px 12px;font-weight:bold;">Telefon:</td><td style="padding:6px 12px;">${escapeHtml(body.phone)}</td></tr>` : ""}
        ${body.room ? `<tr><td style="padding:6px 12px;font-weight:bold;">Místnost:</td><td style="padding:6px 12px;">${escapeHtml(body.room)}</td></tr>` : ""}
        ${body.message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Zpráva:</td><td style="padding:6px 12px;">${escapeHtml(body.message)}</td></tr>` : ""}
      </table>
      </body>
      </html>
    `;

    const customerHtml = body.email
      ? `
      <!DOCTYPE html>
      <html lang="cs">
      <head><meta charset="utf-8"></head>
      <body style="font-family:Arial,sans-serif;color:#333;">
      <h2 style="color:#847631;">Děkujeme za vaši poptávku!</h2>
      <p>Dobrý den, ${escapeHtml(body.name)},</p>
      <p>vaši poptávku jsme přijali a budeme se vám věnovat co nejdříve. Obvykle odpovídáme do 48 hodin.</p>
      <h3 style="margin-top:24px;color:#847631;">Shrnutí vaší poptávky:</h3>
      <table style="border-collapse:collapse;">
        ${body.phone ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Telefon:</td><td style="padding:4px 0;">${escapeHtml(body.phone)}</td></tr>` : ""}
        ${body.room ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Místnost:</td><td style="padding:4px 0;">${escapeHtml(body.room)}</td></tr>` : ""}
        ${body.message ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Zpráva:</td><td style="padding:4px 0;">${escapeHtml(body.message)}</td></tr>` : ""}
      </table>
      <p style="margin-top:24px;">S pozdravem,<br/><strong>Tým StropDesign</strong></p>
      <p style="font-size:12px;color:#999;margin-top:16px;">StropDesign / Derbau s.r.o. · +420 739 457 794 · info@stropdesign.cz</p>
      </body>
      </html>
    `
      : null;

    if (apiKey) {
      // Produkční režim — odesílání přes Resend
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "StropDesign Web <web@stropdesign.cz>",
          to: [toEmail],
          subject: `Poptávka od ${body.name}`,
          html: htmlBody,
          reply_to: body.email || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json(
          { error: "Nepodařilo se odeslat email." },
          { status: 500 }
        );
      }

      // Potvrzovací email zákazníkovi
      if (body.email && customerHtml) {
        const customerRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "StropDesign <web@stropdesign.cz>",
            to: [body.email],
            subject: "Děkujeme za vaši poptávku – StropDesign",
            html: customerHtml,
            reply_to: toEmail,
          }),
        });

        if (!customerRes.ok) {
          console.error("Resend customer email error:", await customerRes.text());
        }
      }
    } else {
      // Dev režim — logujeme do konzole
      console.log("═══ NOVÁ POPTÁVKA (dev mode) ═══");
      console.log("Jméno:", body.name);
      console.log("E-mail:", body.email || "–");
      console.log("Telefon:", body.phone || "–");
      console.log("Místnost:", body.room || "–");
      console.log("Zpráva:", body.message || "–");
      console.log("════════════════════════════════");
      if (body.email) {
        console.log("→ Potvrzovací email by byl odeslán na:", body.email);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Neplatný požadavek." },
      { status: 400 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
