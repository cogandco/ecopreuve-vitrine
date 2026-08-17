import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Éco-Preuve — Le tri de chantier qui paie, prêt pour vos appels d'offres",
  description:
    "Documentez le tri de vos déchets sur chaque chantier, bénéficiez de la reprise REP PMCB (gratuite sous conditions), et générez vos preuves pour les appels d'offres avec critères RSE.",
  icons: {
    icon: { url: "/images/favicon.png", type: "image/png" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600&family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
