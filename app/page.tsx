import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <Reveal className="hero">
        <div className="hero-content">
          <span className="eyebrow">Documentez le tri, le circuit court et la traçabilité de vos déchets de chantier</span>
          <h1>Chaque chantier trié, chaque déchet valorisé.</h1>
          <p className="subhead">
            {`Photographiez vos preuves de tri en quelques secondes sur le terrain, et constituez votre dossier de preuves au fil de l'eau, prêt pour votre prochain marché.`}
          </p>
          <a href="#comment-ca-marche" className="cta">Voir comment ça marche en 30 secondes</a>
        </div>
        <div className="hero-visual">
          <img src="/images/hero-chantier.jpg" alt="Artisan photographiant des déchets de chantier" />
          <div className="tag">Horodatée · Géolocalisée</div>
        </div>
      </Reveal>

      <Reveal className="block" id="quotidien" style={{ background: "var(--green-pale)" }}>
        <div className="wrap" style={{ maxWidth: "780px", textAlign: "center" }}>
          <h2>Une obligation de tri, une preuve à construire chaque jour</h2>
          <p style={{ fontSize: "15px", color: "var(--muted)", marginBottom: "24px" }}>
            {`Le tri à la source des déchets de chantier est une obligation générale pour tout professionnel du bâtiment. Depuis mai 2023, la filière REP PMCB organise la reprise de ces déchets triés par les éco-organismes agréés, sous conditions de tri, de propreté et de volume. Documenter ce geste au moment où il a lieu, photo, date, lieu, transforme une obligation quotidienne en preuve exploitable pour vos dossiers, sans attendre le jour où elle est demandée.`}
          </p>
          <a
            href="https://oca-batiment.org/reseau-points-de-collecte/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            style={{ background: "var(--green-brand)" }}
          >
            Trouver un point de collecte agréé
          </a>
        </div>
      </Reveal>

      <Reveal className="block" id="solution" style={{ background: "white" }}>
        <div className="wrap">
          <h2>{`Ce qu'Éco-Preuve documente pour vous`}</h2>
          <div className="solution-grid">
            <div className="solution-item">
              <div className="check">✓</div>
              <h3>Tri par flux REP PMCB</h3>
              <p>Bois, métaux, plâtre, inertes... classés selon les 7 flux officiels, sur chaque chantier.</p>
            </div>
            <div className="solution-item">
              <div className="check">✓</div>
              <h3>Circuit court</h3>
              <p>Distance réelle avec vos fournisseurs, calculée automatiquement depuis leur adresse.</p>
            </div>
            <div className="solution-item">
              <div className="check">✓</div>
              <h3>Géolocalisation et horodatage</h3>
              <p>Chaque preuve est datée et localisée automatiquement, sans saisie manuelle.</p>
            </div>
            <div className="solution-item">
              <div className="check">✓</div>
              <h3>Rapport à jour en permanence</h3>
              <p>{`Un PDF cumulatif, régénérable à tout moment, prêt dès qu'un appel d'offres se présente.`}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="block" id="obligation">
        <div className="wrap">
          <h2>Un bonus disponible dans tous vos marchés publics</h2>
          <div className="problem-list">
            <div className="problem-item">
              <div>
                <span className="num">01</span>
                <p>
                  {`Depuis le 21 août 2026, `}
                  <strong>un critère environnemental obligatoire</strong>
                  {` dans l'attribution de tout marché public — dès le dépôt de candidature.`}
                </p>
              </div>
            </div>
            <div className="problem-item">
              <div>
                <span className="num">02</span>
                <p>
                  <strong>{`Une clause d'exécution opposable`}</strong>
                  {` pendant toute la durée du marché — vos preuves du quotidien deviennent votre meilleur atout.`}
                </p>
              </div>
            </div>
            <div className="problem-item">
              <div>
                <span className="num">03</span>
                <p>
                  <strong>{`Une exigence qui s'étend au privé`}</strong>
                  {` : de plus en plus de donneurs d'ordres privés intègrent des critères RSE comparables.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="block steps" id="comment-ca-marche">
        <h2>Comment ça marche</h2>
        <div className="step-row">
          <div className="step">
            <div className="step-visual">
              <img src="/images/etape-1-chantier.jpg" alt="Photo prise sur le chantier" />
            </div>
            <div className="step-badge">1</div>
            <h3>Sur le chantier</h3>
            <p>{`Une photo, la géolocalisation et l'horodatage sont enregistrés automatiquement.`}</p>
          </div>
          <div className="step">
            <div className="step-visual">
              <img src="/images/etape-2-rapport.jpg" alt="Génération du rapport PDF" />
            </div>
            <div className="step-badge">2</div>
            <h3>Le rapport se génère</h3>
            <p>Un PDF de synthèse est prêt à tout moment, cumulant toutes vos preuves.</p>
          </div>
          <div className="step">
            <div className="step-visual">
              <img src="/images/etape-3-dossier.jpg" alt="Dépôt dans le dossier de candidature" />
            </div>
            <div className="step-badge">3</div>
            <h3>Dans votre dossier</h3>
            <p>{`Le rapport appuie votre réponse à l'appel d'offres, public ou privé — le jour où vous en avez besoin.`}</p>
          </div>
        </div>
      </Reveal>

      <Reveal className="cta-final">
        <h2>Prêt à trier plus simplement ?</h2>
        <p>{`Commencez à documenter vos chantiers dès aujourd'hui.`}</p>
        <a href="https://app.ecopreuve.fr/login" className="cta">Créer mon compte</a>
      </Reveal>

      <SiteFooter />
    </>
  );
}
