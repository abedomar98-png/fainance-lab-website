"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/Button";
import { CheckIcon, CloseIcon, DownloadIcon } from "@/components/ui/Icon";
import { Slogan } from "@/components/ui/Slogan";
import { cn } from "@/lib/utils";

/**
 * One modal, three content variants.
 *
 * `lead`      — name + email, unlocks a file download (Resources page)
 * `newsletter`— email only (Home newsletter CTA)
 * `notify`    — email only, for a course that hasn't launched (Courses page)
 *
 * Phase 2 can add a `register` variant (live session booking) by extending
 * `ModalIntent` and the `copy` map below — no structural change needed.
 */
export type ModalIntent = "lead" | "newsletter" | "notify";

type ModalRequest = {
  intent: ModalIntent;
  /** Populated for `lead` so the success state can offer the file. */
  resourceSlug?: string;
  resourceTitle?: string;
  fileUrl?: string;
  /**
   * Several files unlocked by one registration (e.g. an event's deck and
   * self-assessment). Takes precedence over `fileUrl`.
   */
  files?: { label: string; url: string }[];
  /** Called once the registration succeeds, so the opener can remember it. */
  onUnlocked?: () => void;
  /** Populated for `notify` so we know which course they asked about. */
  courseSlug?: string;
};

type ModalContextValue = {
  open: (request: ModalRequest) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function useCaptureModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useCaptureModal must be used inside <ModalProvider>");
  }
  return ctx;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function ModalProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ModalRequest | null>(null);

  const open = useCallback((next: ModalRequest) => setRequest(next), []);
  const close = useCallback(() => setRequest(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {request ? (
          <CaptureModal key="capture-modal" request={request} onClose={close} />
        ) : null}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

function CaptureModal({
  request,
  onClose,
}: {
  request: ModalRequest;
  onClose: () => void;
}) {
  const { dict, locale } = useLocale();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const needsName = request.intent === "lead";

  const copy =
    request.intent === "lead"
      ? dict.modal.lead
      : request.intent === "notify"
        ? dict.modal.notify
        : dict.modal.newsletter;

  /* Lock background scrolling while the modal is up. Lenis owns the scroll
     position, so it has to be stopped explicitly — `overflow: hidden` alone
     leaves it running underneath. */
  useEffect(() => {
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [lenis]);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  /* Esc to dismiss, Tab cycles within the panel. */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (needsName && name.trim().length === 0) {
      setError(dict.modal.validation.nameRequired);
      return;
    }
    if (email.trim().length === 0) {
      setError(dict.modal.validation.emailRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError(dict.modal.validation.emailInvalid);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: needsName ? name.trim() : undefined,
          email: email.trim(),
          intent: request.intent,
          resourceSlug: request.resourceSlug,
          courseSlug: request.courseSlug,
          locale,
        }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("done");
      request.onUnlocked?.();
    } catch {
      // The capture endpoint is a placeholder until an ESP is wired in, so a
      // failure here must not strand the visitor — surface it and let them retry.
      setStatus("idle");
      setError(dict.contact.form.error);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      <div
        className="absolute inset-0 bg-ink/55 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative w-full max-w-md rounded-panel bg-white p-7 shadow-lift sm:p-8"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={dict.modal.close}
          className="interactive absolute end-4 top-4 rounded-chip p-2 text-neutral-400 hover:bg-neutral-100 hover:text-ink"
        >
          <CloseIcon className="size-5" />
        </button>

        {status === "done" ? (
          <SuccessState
            titleId={titleId}
            descriptionId={descriptionId}
            files={
              request.intent !== "lead"
                ? []
                : (request.files ??
                  (request.fileUrl
                    ? [{ label: dict.modal.success.downloadNow, url: request.fileUrl }]
                    : []))
            }
            onClose={onClose}
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <header className="flex flex-col gap-2 pe-8">
              <h2 id={titleId} className="text-2xl font-bold">
                {copy.title}
              </h2>
              <p
                id={descriptionId}
                className="text-sm leading-relaxed text-neutral-500"
              >
                {copy.description}
              </p>
              {request.resourceTitle ? (
                <p className="mt-1 rounded-chip bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-600">
                  {request.resourceTitle}
                </p>
              ) : null}
            </header>

            <div className="flex flex-col gap-3">
              {needsName ? (
                <Field
                  ref={firstFieldRef}
                  label={dict.modal.lead.name}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={setName}
                />
              ) : null}
              <Field
                ref={needsName ? undefined : firstFieldRef}
                label={copy.email}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                dir="ltr"
                value={email}
                onChange={setEmail}
              />
            </div>

            {error ? (
              <p role="alert" className="text-sm font-semibold text-danger">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="lg" disabled={status === "sending"}>
              {status === "sending" ? dict.common.sending : copy.submit}
            </Button>

            {/* Slogan closes the surface — last line, once only. */}
            <Slogan className="self-center" />
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function SuccessState({
  titleId,
  descriptionId,
  files,
  onClose,
}: {
  titleId: string;
  descriptionId: string;
  files: { label: string; url: string }[];
  onClose: () => void;
}) {
  const { dict } = useLocale();

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-green/12 text-brand-green">
        <CheckIcon className="size-7" />
      </span>

      <div className="flex flex-col gap-2">
        <h2 id={titleId} className="text-2xl font-bold">
          {dict.modal.success.title}
        </h2>
        <p
          id={descriptionId}
          className="text-sm leading-relaxed text-neutral-500"
        >
          {dict.modal.success.description}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        {files.length > 1 ? (
          <p className="font-mono text-[0.7rem] tracking-wide text-neutral-500 uppercase">
            {dict.modal.success.filesTitle}
          </p>
        ) : null}
        {files.map((file, index) => (
          <Button
            key={file.url}
            href={file.url}
            download
            // A file, not a route — and some are large (the event deck).
            prefetch={false}
            size={files.length > 1 ? "md" : "lg"}
            variant={index === 0 ? "primary" : "outline"}
            className="text-center whitespace-normal"
          >
            <DownloadIcon className="size-5 shrink-0" />
            {file.label}
          </Button>
        ))}
        <Button variant="ghost" onClick={onClose}>
          {dict.modal.success.done}
        </Button>
      </div>
    </div>
  );
}

function Field({
  ref,
  label,
  name,
  value,
  onChange,
  ...rest
}: {
  ref?: React.Ref<HTMLInputElement>;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "name"
>) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[0.7rem] tracking-wide text-neutral-500 uppercase"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "interactive rounded-chip border border-neutral-200 bg-neutral-50 px-4 py-3 text-[0.95rem]",
          "placeholder:text-neutral-400 hover:border-neutral-300",
          "focus:border-brand-blue focus:bg-white focus:outline-none",
        )}
        {...rest}
      />
    </div>
  );
}
