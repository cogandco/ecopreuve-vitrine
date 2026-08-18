"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  children: ReactNode;
}

/**
 * Révèle une section (fondu + léger décalage vertical) au moment où elle
 * entre dans le viewport, via IntersectionObserver natif — pas de librairie.
 * Se déclenche une seule fois (unobserve après la première apparition) :
 * pas de rejeu de l'animation en remontant/redescendant la page. Pour une
 * section déjà visible au chargement (ex. le Hero), l'observer se déclenche
 * quasi immédiatement, sans qu'aucun scroll ne soit nécessaire : même
 * composant, comportement de fondu d'entrée plutôt que de révélation au
 * scroll.
 *
 * Rend un <section> directement (pas de <div> wrapper) pour ne pas casser
 * les mises en page CSS existantes (grid, gap...) qui ciblent la section
 * elle-même. Compatible export statique : client component, aucune
 * dépendance serveur.
 */
export default function Reveal({ id, className, style, delay, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Filet de sécurité pour les navigateurs sans l'API : pas d'observer
    // possible, le contenu reste simplement visible plutôt que bloqué à 0.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", visible && "reveal-visible", className]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties | undefined =
    style || delay !== undefined
      ? { ...style, ...(delay !== undefined ? { transitionDelay: `${delay}ms` } : {}) }
      : undefined;

  return (
    <section ref={ref} id={id} className={classes} style={mergedStyle}>
      {children}
    </section>
  );
}
