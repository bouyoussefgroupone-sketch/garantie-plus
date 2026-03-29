import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Garantie Plus",
  description:
    "SaaS de gestion de garanties TV avec wallet revendeur, rôles sécurisés et certificats régénérables."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <body>{children}</body>
    </html>
  );
}
