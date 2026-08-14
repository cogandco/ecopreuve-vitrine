import styles from "./seo.module.css";

interface VoirAussiItem {
  slug: string;
  title: string;
}

/**
 * Bloc de maillage interne en fin de page, juste avant le CTA. Ne s'affiche
 * pas si la page n'a pas de "voirAussi" en frontmatter (items vide).
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
