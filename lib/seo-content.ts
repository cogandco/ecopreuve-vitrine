import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content", "seo");

/** Familles de requêtes A à F (voir la liste des 46 requêtes cibles). */
export type SeoFamille = "A" | "B" | "C" | "D" | "E" | "F";

export interface SeoFrontmatter {
  title: string;
  metaDescription: string;
  requeteCible: string;
  famille: SeoFamille;
  /** Date de première publication, format AAAA-MM-JJ. */
  datePublished: string;
  /** Date de dernière modification factuelle, format AAAA-MM-JJ. Retombe sur datePublished si absente. */
  dateModified?: string;
}

export interface SeoPage {
  slug: string;
  frontmatter: SeoFrontmatter;
  /** Chapeau (texte avant le premier "## "), rendu en HTML. */
  chapeauHtml: string;
  regleHtml: string;
  modeleHtml: string;
  painPointHtml: string;
  ctaHtml: string;
}

/**
 * Titres H2 attendus dans le corps Markdown, dans cet ordre de lecture.
 * Le gabarit impose la structure : la position de ces titres dans le
 * fichier .md n'a pas d'importance, seul leur contenu compte.
 */
const SECTION_HEADINGS = {
  regle: "Ce que dit la règle",
  modele: "Le modèle",
  painPoint: "Le problème du fait main",
  cta: "CTA",
} as const;

function splitSections(body: string): {
  chapeau: string;
  sections: Record<string, string>;
} {
  const lines = body.split(/\r?\n/);
  const sections: Record<string, string> = {};
  const chapeauLines: string[] = [];
  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentTitle !== null) {
      sections[currentTitle] = currentLines.join("\n").trim();
    }
  };

  for (const line of lines) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      flush();
      currentTitle = heading[1];
      currentLines = [];
    } else if (currentTitle === null) {
      chapeauLines.push(line);
    } else {
      currentLines.push(line);
    }
  }
  flush();

  return { chapeau: chapeauLines.join("\n").trim(), sections };
}

function requireSection(
  sections: Record<string, string>,
  heading: string,
  slug: string
): string {
  const value = sections[heading];
  if (value === undefined) {
    throw new Error(
      `content/seo/${slug}.md : section obligatoire manquante "## ${heading}".`
    );
  }
  return value;
}

function toHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

export function getAllSeoSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getSeoPage(slug: string): SeoPage {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as SeoFrontmatter;
  const { chapeau, sections } = splitSections(content);

  return {
    slug,
    frontmatter,
    chapeauHtml: toHtml(chapeau),
    regleHtml: toHtml(requireSection(sections, SECTION_HEADINGS.regle, slug)),
    modeleHtml: toHtml(requireSection(sections, SECTION_HEADINGS.modele, slug)),
    painPointHtml: toHtml(
      requireSection(sections, SECTION_HEADINGS.painPoint, slug)
    ),
    ctaHtml: toHtml(requireSection(sections, SECTION_HEADINGS.cta, slug)),
  };
}
