import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/Icon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { Slogan } from "@/components/ui/Slogan";
import { site } from "@/content/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const copy = dict.contact;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <Section className="bg-neutral-50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <Reveal variant="settle">
              <ContactForm />
            </Reveal>

            <RevealGroup stagger={0.08} className="flex flex-col gap-6">
              <Reveal
                as="h2"
                variant="rise"
                className="font-mono text-xs tracking-[0.16em] text-brand-blue uppercase"
              >
                {copy.direct.title}
              </Reveal>

              <Reveal variant="settle">
                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="interactive flex items-center gap-3 rounded-card border border-neutral-100 bg-white p-4 hover:-translate-y-1 hover:shadow-lift"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-chip bg-brand-blue text-white">
                        <MailIcon className="size-5" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-mono text-[0.65rem] tracking-wide text-neutral-400 uppercase">
                          {copy.direct.email}
                        </span>
                        <span dir="ltr" className="truncate text-sm font-semibold">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={site.instagramUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="interactive flex items-center gap-3 rounded-card border border-neutral-100 bg-white p-4 hover:-translate-y-1 hover:shadow-lift"
                    >
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-chip bg-brand-green text-white">
                        <InstagramIcon className="size-5" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-mono text-[0.65rem] tracking-wide text-neutral-400 uppercase">
                          {copy.direct.instagram}
                        </span>
                        <span dir="ltr" className="truncate text-sm font-semibold">
                          {site.instagramHandle}
                        </span>
                      </span>
                    </a>
                  </li>

                  {/* WhatsApp: rendered as a disabled placeholder rather than a
                      link, because inventing a number would reach a stranger.
                      TODO(abed): supply the real number in content/site.ts. */}
                  <li>
                    <div className="flex items-center gap-3 rounded-card border border-dashed border-neutral-300 bg-white/60 p-4">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-chip bg-neutral-200 text-neutral-500">
                        <WhatsAppIcon className="size-5" />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-mono text-[0.65rem] tracking-wide text-neutral-400 uppercase">
                          {copy.direct.whatsapp}
                        </span>
                        <span className="truncate text-sm font-semibold text-neutral-400">
                          {site.whatsapp ?? copy.direct.whatsappPlaceholder}
                        </span>
                      </span>
                    </div>
                  </li>
                </ul>
              </Reveal>

              <Reveal variant="rise">
                <Slogan />
              </Reveal>
            </RevealGroup>
          </div>
        </Container>
      </Section>
    </>
  );
}
