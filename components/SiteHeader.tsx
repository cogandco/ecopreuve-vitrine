import Link from "next/link";

export default function SiteHeader() {
  return (
    <header>
      <Link href="/" className="logo-mark">
        <img src="/images/logo.png" alt="" />
        <span className="logo-word">Éco-Preuve</span>
      </Link>
      <nav>
        <Link href="/ressources" className="nav-link">
          Ressources
        </Link>
        <a href="https://app.ecopreuve.fr/login">Connexion</a>
      </nav>
    </header>
  );
}
