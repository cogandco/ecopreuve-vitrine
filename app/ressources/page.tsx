import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getAllSeoPages, SEO_FAMILLES } from "@/lib/seo-content";
import styles from "./ressources.module.css";

const TITLE = "Toutes nos ressources";
const DESCRIPTION =
  "Toutes les pages publiées par Éco-Preuve sur la gestion des déchets de chantier, organisées par thème.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function RessourcesPage() {
  const pages = getAllSeoPages();

  return (
    <>
      <SiteHeader />

      <article>
        <div className={styles.intro}>
          <h1>{TITLE}</h1>
          <p className={styles.chapeau}>{DESCRIPTION}</p>
        </div>

        {SEO_FAMILLES.map((famille, index) => {
          const famillePages = pages
            .filter((page) => page.frontmatter.famille === famille.code)
            .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title, "fr"));

          return (
            <section
              key={famille.code}
              className="block"
              id={`famille-${famille.code.toLowerCase()}`}
              style={{ background: index % 2 === 0 ? "white" : "var(--green-pale)" }}
            >
              <div className="wrap">
                <h2>
                  {famille.code} — {famille.label}
                </h2>

                {famillePages.length > 0 ? (
                  <ul className={styles.pageList}>
                    {famillePages.map((page) => (
                      <li key={page.slug}>
                        <a href={`/${page.slug}`}>{page.frontmatter.title}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className={styles.pageList}>
                    <li className={styles.comingSoon}>Bientôt disponible</li>
                  </ul>
                )}
              </div>
            </section>
          );
        })}

        <section className="cta-final">
          <h2>Prêt à trier plus simplement ?</h2>
          <p>Commencez à documenter vos chantiers dès aujourd&apos;hui.</p>
          <a href="https://app.ecopreuve.fr/login" className="cta">
            Créer mon compte
          </a>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
