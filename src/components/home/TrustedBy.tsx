/**
 * Trusted-by logo strip.
 *
 * ⚠️  INTENTIONALLY NOT RENDERED.
 *
 * Putting a past employer's or client's logo here asserts that they endorse
 * Fainance Lab, which is a different claim from "Abed worked there". Abed needs
 * to decide which organisations he wants associated with THIS brand, and
 * confirm he's cleared reusing their marks, before anything ships.
 *
 * TODO(abed): supply the confirmed list, then replace the `return null` below
 * with the markup underneath it and drop the logos into
 * /public/assets/logos-trusted/.
 *
 * The intended markup, kept here so the section is a five-minute job once the
 * list exists:
 *
 *   <Section className="bg-white py-14">
 *     <Container className="flex flex-col items-center gap-8">
 *       <p className="font-mono text-xs tracking-[0.16em] text-neutral-400 uppercase">
 *         {dict.home.trustedBy.eyebrow}
 *       </p>
 *       <RevealGroup
 *         as="ul"
 *         stagger={0.06}
 *         className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 grayscale opacity-70"
 *       >
 *         {trustedLogos.map((logo) => (
 *           <Reveal as="li" key={logo.src} variant="fade">
 *             <Image src={logo.src} alt={logo.name} width={140} height={44}
 *                    className="h-8 w-auto object-contain" />
 *           </Reveal>
 *         ))}
 *       </RevealGroup>
 *     </Container>
 *   </Section>
 */
export function TrustedBy() {
  return null;
}
