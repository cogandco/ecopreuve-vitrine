export default function SiteHeader() {
  return (
    <header>
      <div className="logo-mark">
        <img src="/images/logo.png" alt="" />
        <span className="logo-word">Éco-Preuve</span>
      </div>
      <nav>
        <a href="https://app.ecopreuve.fr/login">Connexion</a>
      </nav>
    </header>
  );
}
