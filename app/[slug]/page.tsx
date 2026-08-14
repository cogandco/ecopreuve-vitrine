import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllSeoSlugs, getSeoPage } from "@/lib/seo-content";
import { SITE_URL, SITE_NAME, SITE_LOGO_URL } from "@/lib/site";
import styles from "./seo.module.css";

// Export statique : tous les slugs possibles doivent être connus au build.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getSeoPage(slug);
  return {
    title: frontmatter.title,
    description: frontmatter.metaDescription,
  };
}

export default async function SeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  const pageUrl = `${SITE_URL}/${slug}`;

  // Balisage schema.org Article — voir la note dans lib/site.ts pour les
  // constantes réutilisées. Rendu en <script> directement dans le JSX :
  // generateMetadata (l'API Metadata de Next) ne prend pas en charge les
  // données structurées arbitraires, c'est la méthode recommandée par la
  // doc Next.js App Router pour le JSON-LD.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.frontmatter.title,
    description: page.frontmatter.metaDescription,
    datePublished: page.frontmatter.datePublished,
    dateModified: page.frontmatter.dateModified ?? page.frontmatter.datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO_URL,
      },
    },
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <article>
        {/* 1. H1 + chapeau */}
        <div className={styles.intro}>
          <h1>{page.frontmatter.title}</h1>
          <div
            className={styles.chapeau}
            dangerouslySetInnerHTML={{ __html: page.chapeauHtml }}
          />
        </div>

        {/* 2. Ce que dit la règle */}
        <section className="block" id="ce-que-dit-la-regle">
          <div className="wrap">
            <h2>Ce que dit la règle</h2>
            <div
              className={styles.regleBody}
              dangerouslySetInnerHTML={{ __html: page.regleHtml }}
            />
          </div>
        </section>

        {/* 3. Le modèle */}
        <section className="block" id="le-modele" style={{ background: "white" }}>
          <div className="wrap">
            <h2>Le modèle</h2>
            <div
              className={styles.modeleBody}
              dangerouslySetInnerHTML={{ __html: page.modeleHtml }}
            />
          </div>
        </section>

        {/* 4. Le problème du fait main */}
        <section className="block" id="le-probleme-du-fait-main">
          <div className="wrap">
            <h2>Le problème du fait main</h2>
            <div
              className={styles.painBody}
              dangerouslySetInnerHTML={{ __html: page.painPointHtml }}
            />
          </div>
        </section>

        {/* 5. CTA encadré — reprend telle quelle la section .cta-final de l'accueil */}
        <section className="cta-final">
          <div dangerouslySetInnerHTML={{ __html: page.ctaHtml }} />
          <a href="https://app.ecopreuve.fr/login" className="cta">
            Créer mon compte
          </a>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
