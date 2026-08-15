import styles from "./seo.module.css";

interface VoirAussiItem {
  slug: string;
  title: string;
}

/**
 * Bloc de maillage interne en fin de page, juste avant le CTA. items inclut
 * toujours au moins le lien vers /ressources (ajouté dans page.tsx), donc ce
 * bloc s'affiche sur toutes les pages, avec ou sans "voirAussi" en
 * frontmatter. Le garde-fou ci-dessous reste en place si items venait un
 * jour à être vide pour une autre raison.
 */
export default function VoirAussi({ items }: { items: VoirAussiItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="block" id="voir-aussi">
      <div className="wrap">
        <h2>Voir aussi</h2>
        <ul className={styles.voirAussiList}>
          {items.map((item) => (
            <li key={item.slug}>
              <a href={`/${item.slug}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
