"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import MascotA from "./MascotA";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface InquiryData {
  surface: string;
  area: number;
  lights: number;
  addons: string[];
  totalPrice: number;
  room: string;
  summary: string;
}

function parseInquiryData(text: string): InquiryData | null {
  const match = text.match(
    /---INQUIRY_DATA---\s*(\{[\s\S]*?\})\s*---END_INQUIRY_DATA---/
  );
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function stripInquiryBlock(text: string): string {
  return text
    .replace(/---INQUIRY_DATA---[\s\S]*?---END_INQUIRY_DATA---/, "")
    .trim();
}

function InquiryCard({
  data,
  onSend,
}: {
  data: InquiryData;
  onSend: () => void;
}) {
  return (
    <div className="mt-3 bg-accent-soft border border-accent/20 rounded-sm p-4">
      <div className="text-[11px] font-medium text-heading mb-2 tracking-[0.04em]">
        Shrnutí konfigurace
      </div>
      <div className="flex flex-col gap-1 text-[11px] text-body mb-3">
        <div className="flex justify-between">
          <span className="text-muted">Povrch</span>
          <span className="font-medium">{data.surface}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Plocha</span>
          <span>{data.area} m²</span>
        </div>
        {data.lights > 0 && (
          <div className="flex justify-between">
            <span className="text-muted">Bodová světla</span>
            <span>{data.lights} ks</span>
          </div>
        )}
        {data.addons.length > 0 && (
          <div className="flex justify-between">
            <span className="text-muted">Doplňky</span>
            <span className="text-right max-w-[60%]">
              {data.addons.join(", ")}
            </span>
          </div>
        )}
        <div className="flex justify-between border-t border-accent/20 pt-1 mt-1">
          <span className="font-medium text-heading">Orientační cena</span>
          <span className="font-medium text-accent">
            {data.totalPrice.toLocaleString("cs-CZ")} Kč
          </span>
        </div>
      </div>
      <button
        onClick={onSend}
        className="w-full bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase py-3 hover:bg-accent-hover transition-colors rounded-sm"
      >
        Odeslat poptávku
      </button>
    </div>
  );
}

function SendInquiryForm({
  data,
  onClose,
}: {
  data: InquiryData;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          room: `${data.surface} povrch, ${data.area} m²`,
          message: `Poptávka ze Strop kecky:\n${data.summary}\n\nOrientační cena: ${data.totalPrice.toLocaleString("cs-CZ")} Kč`,
        }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Chyba při odesílání.");
      }

      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Nepodařilo se odeslat."
      );
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="p-6 text-center">
        <div className="w-10 h-10 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-5 h-5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="font-display text-base font-semibold text-heading mb-1">
          Odesláno!
        </p>
        <p className="text-[12px] text-muted">
          Ozveme se do 24 hodin s nabídkou na míru.
        </p>
        <button
          onClick={onClose}
          className="mt-3 text-[11px] text-accent hover:underline"
        >
          Zavřít
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2.5">
      <p className="text-[12px] text-body mb-1">
        Vyplň údaje a ozveme se ti do 24 hodin s nabídkou.
      </p>
      <input
        type="text"
        placeholder="Jméno a příjmení"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-light-secondary border border-border text-heading text-[12px] px-3 py-2.5 outline-none focus:border-accent rounded-sm"
      />
      <input
        type="email"
        placeholder="E-mail"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-light-secondary border border-border text-heading text-[12px] px-3 py-2.5 outline-none focus:border-accent rounded-sm"
      />
      <input
        type="tel"
        placeholder="Telefon (nepovinné)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="bg-light-secondary border border-border text-heading text-[12px] px-3 py-2.5 outline-none focus:border-accent rounded-sm"
      />
      {error && <p className="text-red-600 text-[11px]">{error}</p>}
      <button
        type="submit"
        disabled={sending}
        className="bg-accent text-white text-[11px] font-medium tracking-[0.1em] uppercase py-3 hover:bg-accent-hover transition-colors rounded-sm disabled:opacity-60"
      >
        {sending ? "Odesílám..." : "Odeslat poptávku"}
      </button>
    </form>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [inquiryForm, setInquiryForm] = useState<InquiryData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Allow other components (e.g. Calculator) to open the chat
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("openStropKecka", handler);
    return () => window.removeEventListener("openStropKecka", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageWithTracking();
    }
  };

  const [lastInquiryData, setLastInquiryData] = useState<InquiryData | null>(
    null
  );

  // We need to detect inquiry data during streaming. Let's use a ref to track full text
  const fullTextRef = useRef("");

  const sendMessageWithTracking = async (directText?: string) => {
    const text = (directText || input).trim();
    if (!text || isStreaming) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    setLastInquiryData(null);
    fullTextRef.current = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Chyba spojení.");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();

      // Don't add to React state during streaming — update DOM directly
      setMessages((prev) => [...prev, { role: "assistant", content: "\u200B" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullTextRef.current += parsed.text;
                // Direct DOM update — no React re-render
                if (streamingRef.current) {
                  streamingRef.current.textContent = stripInquiryBlock(fullTextRef.current);
                }
              }
            } catch {
              // skip
            }
          }
        }
      }

      // Clear DOM text before React takes over — prevents double text
      if (streamingRef.current) {
        streamingRef.current.textContent = "";
      }

      // Streaming done — commit final text to React state
      const finalText = stripInquiryBlock(fullTextRef.current);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: finalText,
        };
        return updated;
      });

      const inquiry = parseInquiryData(fullTextRef.current);
      if (inquiry) {
        setLastInquiryData(inquiry);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Něco se pokazilo.";
      setMessages((prev) => [
        ...prev.filter((m) => m.content !== ""),
        {
          role: "assistant",
          content: `Omlouvám se, došlo k chybě: ${errorMsg}`,
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-all duration-300 hover:scale-105 flex items-center justify-center"
        aria-label="Otevřít chat"
      >
        {isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4l12 12M16 4l-12 12" />
          </svg>
        ) : (
          <div style={{ animation: "floatSlow 4s ease-in-out infinite" }}>
            <MascotA size={36} />
          </div>
        )}
      </button>

      {/* Tooltip + pulse ring when closed */}
      {!isOpen && messages.length === 0 && (
        <>
          <div
            className="fixed bottom-[5.5rem] right-6 z-[89] bg-dark text-white text-[11px] font-medium px-3 py-2 rounded-sm shadow-lg pointer-events-none max-w-[220px] text-center leading-[1.5]"
            style={{ animation: "chatSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both" }}
          >
            Popište co potřebujete a ihned dostanete orientační cenu
            <div className="absolute -bottom-1 right-5 w-2 h-2 bg-dark rotate-45" />
          </div>
          <div className="fixed bottom-6 right-6 z-[89] w-14 h-14 rounded-full animate-ping bg-accent/20 pointer-events-none" />
        </>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[91] w-[360px] max-w-[calc(100vw-2rem)] bg-white border border-border rounded-sm shadow-2xl flex flex-col overflow-hidden"
          style={{
            height: "min(520px, calc(100dvh - 8rem))",
            animation: "chatSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Header */}
          <div className="bg-dark px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="flex-shrink-0">
              <MascotA size={32} />
            </div>
            <div className="flex-1">
              <div className="text-white text-[13px] font-medium">
                Strop kecka
              </div>
              <div className="text-white/50 text-[10px]">
                AI poradce pro napínané stropy
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>

          {/* Inquiry form overlay */}
          {inquiryForm && (
            <div className="absolute inset-0 z-10 bg-white flex flex-col">
              <div className="bg-dark px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setInquiryForm(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M10 3l-5 5 5 5" />
                  </svg>
                </button>
                <div className="text-white text-[13px] font-medium">
                  Odeslat poptávku
                </div>
              </div>

              {/* Inquiry summary */}
              <div className="p-4 border-b border-border bg-light-secondary">
                <div className="flex flex-col gap-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted">Povrch</span>
                    <span className="font-medium">{inquiryForm.surface}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Plocha</span>
                    <span>{inquiryForm.area} m²</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-1 mt-1">
                    <span className="font-medium">Cena</span>
                    <span className="text-accent font-medium">
                      {inquiryForm.totalPrice.toLocaleString("cs-CZ")} Kč
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <SendInquiryForm
                  data={inquiryForm}
                  onClose={() => setInquiryForm(null)}
                />
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div
                  className="mb-3"
                  style={{ animation: "floatSlow 4s ease-in-out infinite" }}
                >
                  <MascotA size={64} />
                </div>
                <p className="text-heading text-[14px] font-medium mb-1">
                  Zjistěte cenu během minuty
                </p>
                <p className="text-muted text-[12px] leading-[1.6] mb-4">
                  Popište svou místnost, doporučíme nejlepší řešení
                  a rovnou spočítáme orientační cenu. Bez čekání, bez závazků.
                </p>
                <div className="flex flex-col gap-1.5 w-full">
                  {[
                    "Kolik stojí strop do obýváku 20 m²?",
                    "Jaký strop je nejlepší do koupelny?",
                    "Chci moderní strop s LED osvětlením",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessageWithTracking(q)}
                      className="text-left text-[11px] text-body bg-light-secondary border border-border px-3 py-2 rounded-sm hover:border-accent hover:text-accent transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => {
              const isLastAssistant =
                msg.role === "assistant" && i === messages.length - 1;
              const isStreamingThis = isLastAssistant && isStreaming;

              return (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    ref={isStreamingThis ? streamingRef : undefined}
                    className={`max-w-[85%] text-[12px] leading-[1.7] px-3.5 py-2.5 rounded-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-accent text-white"
                        : "bg-light-secondary text-body border border-border"
                    }`}
                  >
                    {isStreamingThis ? null : msg.content}
                    {isLastAssistant &&
                      lastInquiryData &&
                      !isStreaming && (
                        <InquiryCard
                          data={lastInquiryData}
                          onSend={() => setInquiryForm(lastInquiryData)}
                        />
                      )}
                  </div>
                </div>
              );
            })}

            {isStreaming &&
              messages.length > 0 &&
              messages[messages.length - 1].content === "\u200B" && (
                <div className="flex justify-start">
                  <div className="bg-light-secondary border border-border rounded-sm px-4 py-3 flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-muted rounded-full"
                      style={{ animation: "dotPulse 1.2s infinite 0s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-muted rounded-full"
                      style={{ animation: "dotPulse 1.2s infinite 0.2s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-muted rounded-full"
                      style={{ animation: "dotPulse 1.2s infinite 0.4s" }}
                    />
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Napiš svůj dotaz..."
                rows={1}
                className="flex-1 bg-light-secondary border border-border text-heading text-[12px] px-3 py-2.5 outline-none focus:border-accent rounded-sm resize-none max-h-[80px]"
                style={{ minHeight: "38px" }}
              />
              <button
                onClick={sendMessageWithTracking}
                disabled={!input.trim() || isStreaming}
                className="bg-accent text-white w-9 h-[38px] flex items-center justify-center rounded-sm hover:bg-accent-hover transition-colors disabled:opacity-40 flex-shrink-0"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L6 8M12 2l-4 10-2-4.5L1.5 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes chatSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes dotPulse {
          0%,
          80%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
