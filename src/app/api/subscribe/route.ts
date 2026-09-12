import { NextResponse } from "next/server";

/**
 * Email capture endpoint.
 *
 * ⚠️  PLACEHOLDER. Right now this only validates the payload and logs it
 * server-side — nothing is persisted, no confirmation email is sent, and no
 * double opt-in happens. Every capture form on the site posts here.
 *
 * TODO(abed): replace the body of this handler with a real ESP integration
 * (ConvertKit / Beehiiv / Mailchimp — pending your decision). Whichever you
 * pick needs to handle:
 *   - double opt-in confirmation
 *   - automated lead-magnet delivery for `intent: "lead"`
 *   - tagging by `intent` / `resourceSlug` / `courseSlug` / `locale`
 *   - unsubscribe handling
 * Use abedlatif@fainance-lab.com as the from/reply-to address.
 *
 * NOTE: Namecheap is a registrar and mailbox host, not a marketing platform —
 * it cannot do any of the above. An ESP is required.
 */

type SubscribePayload = {
  name?: string;
  email?: string;
  intent?: string;
  resourceSlug?: string;
  courseSlug?: string;
  locale?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_INTENTS = new Set(["lead", "newsletter", "notify", "contact"]);

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = payload.email?.trim() ?? "";
  const intent = payload.intent ?? "newsletter";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 422 });
  }
  if (!VALID_INTENTS.has(intent)) {
    return NextResponse.json({ error: "invalid_intent" }, { status: 422 });
  }

  // Server-side only — never logged to the browser.
  console.info("[subscribe]", {
    intent,
    email,
    name: payload.name?.trim() || undefined,
    resourceSlug: payload.resourceSlug,
    courseSlug: payload.courseSlug,
    locale: payload.locale,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, pendingConfirmation: true });
}
