"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons";

type Status = "idle" | "sending" | "sent" | "mailto" | "whatsapp" | "error";

const MESSAGES: Record<Status, string> = {
  idle: "",
  sending: "Sending…",
  sent: "Thanks! Your message is on its way — I'll reply soon.",
  mailto: "Opening your email app…",
  whatsapp: "Opening WhatsApp — just tap send there and I'll reply soon.",
  error: "Something went wrong. Please email me directly instead.",
};

type ContactFormProps = { email: string; endpoint?: string; whatsapp?: string };

export function ContactForm({ email, endpoint, whatsapp }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // WhatsApp: open a chat with the message pre-filled. This runs before any
    // await, so browsers treat the new tab as a direct click (not a popup).
    if (whatsapp) {
      const text = `Hi! I'm ${name} (${from}).\n\n${message}`;
      const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
      const tab = window.open(url, "_blank");
      if (tab) tab.opener = null;
      else window.location.href = url; // popup blocked: open in this tab
      form.reset();
      setStatus("whatsapp");
      return;
    }

    if (endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" placeholder="Jane Doe" autoComplete="name" required />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" placeholder="jane@company.com" autoComplete="email" required />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} placeholder="Tell me about your project…" required />
      </label>
      <button type="submit" className="btn btn-primary btn-block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} <Icon name="send" />
      </button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {MESSAGES[status]}
      </p>
    </form>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" className="email-btn" onClick={copy} aria-label={`Copy email address ${email}`}>
      <Icon name="mail" />
      <span className="email-text">{email}</span>
      <span className={copied ? "email-copy copied" : "email-copy"}>
        <Icon name={copied ? "check" : "copy"} />
        <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
      </span>
    </button>
  );
}
