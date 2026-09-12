import { NextResponse } from "next/server";

import { site } from "@/content/site";

/**
 * Contact form endpoint.
 *
 * ⚠️  PLACEHOLDER. Validates and logs server-side; it does NOT send email yet.
 *
 * TODO(abed): wire this to a transactional sender (Resend, Postmark, SES, or
 * whatever ships alongside the ESP decision) delivering to
 * abedlatif@fainance-lab.com with the visitor's address as reply-to.
 * Namecheap's mailbox hosting can receive that mail but cannot send it from
 * the site — an SMTP/API sender is required.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: {
    name?: string;
    email?: string;
    message?: string;
    locale?: string;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (name.length === 0 || message.length === 0) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }

  console.info("[contact]", {
    to: site.email,
    name,
    email,
    message,
    locale: payload.locale,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, delivered: false });
}
