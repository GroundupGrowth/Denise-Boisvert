"use client";

import { useId, useRef, useState } from "react";

const PDF_PATH = "/the-purpose-driven-wealth-plan.pdf";
const PDF_FILENAME = "The-Purpose-Driven-Wealth-Plan.pdf";

// Pragmatic email check — good enough to catch typos without rejecting
// valid-but-unusual addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function triggerDownload() {
  const a = document.createElement("a");
  a.href = PDF_PATH;
  a.download = PDF_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Email capture + ebook download.
 *
 * variant: "light" (default) or "dark" — only changes styling.
 * id: unique id so multiple instances (hero + final CTA) don't collide.
 */
export default function EmailCapture({ variant = "light", id = "capture" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [error, setError] = useState("");
  const inputId = useId();
  const startedDownload = useRef(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      // Fire the download automatically, once.
      if (!startedDownload.current) {
        startedDownload.current = true;
        triggerDownload();
      }
    } catch (err) {
      setStatus("idle");
      setError(
        err.message === "Failed to fetch"
          ? "Network error. Please try again."
          : err.message
      );
    }
  };

  const wrapperClass =
    "capture" + (variant === "dark" ? " capture--ondark" : "");

  if (status === "success") {
    return (
      <div className={wrapperClass}>
        <div className="capture__success" role="status">
          <h3>Your ebook is on the way.</h3>
          <p>
            The download should have started automatically. If it didn&rsquo;t,
            use the link below.
          </p>
          <a
            className="capture__backup"
            href={PDF_PATH}
            download={PDF_FILENAME}
            onClick={() => {
              startedDownload.current = true;
            }}
          >
            Download the ebook (PDF)
          </a>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className={wrapperClass} onSubmit={onSubmit} noValidate>
      <label htmlFor={inputId} className="sr-only" style={srOnly}>
        Email address
      </label>
      <div className="capture__row">
        <input
          id={inputId}
          className="capture__input"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-err` : undefined}
          disabled={submitting}
          required
        />
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send Me the Ebook"}
        </button>
      </div>
      <p className="capture__error" id={`${inputId}-err`} aria-live="polite">
        {error}
      </p>
      <p className="capture__note">
        Free PDF, sent straight to your inbox. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}

const srOnly = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};
