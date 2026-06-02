"use client";

import { useId, useRef, useState } from "react";

const PDF_PATH = "/the-purpose-driven-wealth-plan.pdf";
const PDF_FILENAME = "The-Purpose-Driven-Wealth-Plan.pdf";

// Pragmatic checks — catch typos without rejecting valid-but-unusual input.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitsOf = (s) => (s.match(/\d/g) || []).length;

function triggerDownload() {
  const a = document.createElement("a");
  a.href = PDF_PATH;
  a.download = PDF_FILENAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Lead capture (name + email + phone) -> download the ebook.
 *
 * variant: "light" (default) or "dark" — only changes styling.
 * id: unique id so multiple instances (hero + final CTA) don't collide,
 *     and so the API/webhook can see which form converted.
 */
export default function EmailCapture({ variant = "light", id = "capture" }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState(""); // name | email | phone
  const baseId = useId();
  const fieldId = (n) => `${baseId}-${n}`;
  const startedDownload = useRef(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (name.length < 2) {
      return { field: "name", message: "Please enter your name." };
    }
    if (!EMAIL_RE.test(email)) {
      return { field: "email", message: "Please enter a valid email address." };
    }
    if (digitsOf(phone) < 7) {
      return { field: "phone", message: "Please enter a valid phone number." };
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrorField("");

    const problem = validate();
    if (problem) {
      setError(problem.message);
      setErrorField(problem.field);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          source: id,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
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
  const errId = `${baseId}-err`;

  return (
    <form className={wrapperClass} onSubmit={onSubmit} noValidate>
      <div className="capture__fields">
        <div className="capture__field">
          <label htmlFor={fieldId("name")} style={srOnly}>
            Full name
          </label>
          <input
            id={fieldId("name")}
            className="capture__input"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Full name"
            value={form.name}
            onChange={update("name")}
            aria-invalid={errorField === "name" ? "true" : undefined}
            aria-describedby={error ? errId : undefined}
            disabled={submitting}
            required
          />
        </div>

        <div className="capture__field">
          <label htmlFor={fieldId("email")} style={srOnly}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            className="capture__input"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email address"
            value={form.email}
            onChange={update("email")}
            aria-invalid={errorField === "email" ? "true" : undefined}
            aria-describedby={error ? errId : undefined}
            disabled={submitting}
            required
          />
        </div>

        <div className="capture__field">
          <label htmlFor={fieldId("phone")} style={srOnly}>
            Phone number
          </label>
          <input
            id={fieldId("phone")}
            className="capture__input"
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={update("phone")}
            aria-invalid={errorField === "phone" ? "true" : undefined}
            aria-describedby={error ? errId : undefined}
            disabled={submitting}
            required
          />
        </div>
      </div>

      <button className="btn btn--block" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send Me the Ebook"}
      </button>

      <p className="capture__error" id={errId} aria-live="polite">
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
