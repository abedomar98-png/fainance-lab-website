/**
 * Generates the placeholder download files for resources whose real assets
 * don't exist yet, so the lead-magnet flow can be tested end to end.
 *
 * Run: node scripts/make-placeholder-files.mjs
 *
 * TODO(abed): once a real file replaces a placeholder, delete its entry here.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "../public/assets/resources");

/** Minimal, spec-valid single-page PDF with a correct xref table. */
function buildPdf(lines) {
  const content =
    "BT\n/F1 20 Tf\n60 760 Td\n" +
    lines
      .map((line, index) =>
        index === 0
          ? `(${escapePdf(line)}) Tj\n`
          : `0 -28 Td\n(${escapePdf(line)}) Tj\n`,
      )
      .join("") +
    "ET";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}

function escapePdf(text) {
  return text.replace(/([\\()])/g, "\\$1");
}

const files = {
  "20-actions-claude-excel.pdf": [
    "20 Actions Claude Can Do in Excel",
    "",
    "PLACEHOLDER FILE",
    "The final resource is being prepared.",
    "",
    "Fainance Lab - fainance-lab.com",
  ],
  "audit-readiness-checklist.pdf": [
    "Audit Readiness Checklist",
    "",
    "PLACEHOLDER FILE",
    "The final resource is being prepared.",
    "",
    "Fainance Lab - fainance-lab.com",
  ],
  "risk-register-starter.pdf": [
    "Risk Register Starter Template",
    "",
    "PLACEHOLDER FILE",
    "The final resource is being prepared.",
    "",
    "Fainance Lab - fainance-lab.com",
  ],
};

mkdirSync(outDir, { recursive: true });
for (const [name, lines] of Object.entries(files)) {
  writeFileSync(resolve(outDir, name), buildPdf(lines));
  console.log(`wrote ${name}`);
}
