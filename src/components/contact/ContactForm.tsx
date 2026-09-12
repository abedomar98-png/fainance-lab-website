"use client";

import { useId, useState, type FormEvent } from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const { dict, locale } = useLocale();
  const copy = dict.contact.form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          locale,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Reveal
        variant="settle"
        className="flex flex-col items-start gap-4 rounded-panel border border-brand-green/25 bg-brand-green/8 p-8"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
          <CheckIcon className="size-6" />
        </span>
        <p className="leading-relaxed font-semibold text-ink">{copy.success}</p>
      </Reveal>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-panel border border-neutral-100 bg-white p-6 shadow-card sm:p-8"
    >
      <Field
        label={copy.name}
        placeholder={copy.namePlaceholder}
        value={name}
        onChange={setName}
        autoComplete="name"
        required
      />
      <Field
        label={copy.email}
        placeholder={copy.emailPlaceholder}
        value={email}
        onChange={setEmail}
        type="email"
        autoComplete="email"
        dir="ltr"
        required
      />
      <Field
        label={copy.message}
        placeholder={copy.messagePlaceholder}
        value={message}
        onChange={setMessage}
        multiline
        required
      />

      {status === "error" ? (
        <p role="alert" className="text-sm font-semibold text-danger">
          {copy.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "sending"} className="self-start">
        {status === "sending" ? dict.common.sending : copy.submit}
      </Button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const id = useId();
  const className = cn(
    "interactive w-full rounded-chip border border-neutral-200 bg-neutral-50 px-4 py-3 text-[0.95rem]",
    "placeholder:text-neutral-400 hover:border-neutral-300",
    "focus:border-brand-blue focus:bg-white focus:outline-none",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[0.7rem] tracking-wide text-neutral-500 uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={rest.placeholder}
          required={rest.required}
          className={cn(className, "resize-y")}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={className}
          {...rest}
        />
      )}
    </div>
  );
}
