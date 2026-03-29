import Link from "next/link";
import { SectionTitle } from "@/components/shell/section-title";
import { StatCard } from "@/components/ui/stat-card";
import { Tag } from "@/components/ui/tag";

const foundationCards = [
  {
    title: "Admin / Reseller séparés",
    description:
      "Deux parcours lisibles dès le départ pour éviter de mélanger supervision plateforme et opérations terrain."
  },
  {
    title: "Wallet transactionnel",
    description:
      "Solde prépayé centralisé, écritures idempotentes et historique avant/après pour chaque mouvement."
  },
  {
    title: "Certificats versionnés",
    description:
      "Un certificat par garantie, régénérable avec historique de version et piste d’audit."
  }
];

const nextSteps = [
  "Brancher l’auth sécurisée par sessions et cookies HttpOnly",
  "Créer les server actions de vente et d’annulation",
  "Produire le PDF de certificat à partir des données de garantie",
  "Connecter les dashboards au schéma PostgreSQL"
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="page-shell">
          <div className="hero-card">
            <div className="hero-grid">
              <div className="stack">
                <span className="eyebrow">Garantie TV • SaaS B2B2C</span>
                <h1 style={{ fontFamily: "var(--font-heading)" }}>
                  Garantie Plus
                </h1>
                <p>
                  Base de travail pour un SaaS de vente de garanties TV avec
                  rôles sécurisés, wallet prépayé, catalogue de plans et
                  certificats PDF régénérables.
                </p>
                <div className="hero-actions">
                  <Link className="primary-link" href="/admin">
                    Ouvrir l&apos;espace admin
                  </Link>
                  <Link className="secondary-link" href="/reseller">
                    Ouvrir l&apos;espace reseller
                  </Link>
                </div>
              </div>

              <div className="stack">
                <Tag>Socle déjà bootstrapé</Tag>
                <div className="stat-grid">
                  <StatCard label="Rôles" value="4" helper="super_admin à reseller" />
                  <StatCard label="Modules" value="5" helper="auth, wallet, warranties, certificates, admin" />
                  <StatCard label="DB" value="Postgres" helper="schéma Prisma prêt" />
                  <StatCard label="Routeur" value="App" helper="Next.js App Router" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Fondations"
            title="Une base pensée pour la suite"
            description="On pose tout de suite les frontières métier qui vont compter quand les ventes et les certificats commenceront à s’enchaîner."
          />
          <div className="card-grid">
            {foundationCards.map((card) => (
              <article key={card.title} className="card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-shell">
          <SectionTitle
            eyebrow="Suite logique"
            title="Ce qu’on peut attaquer juste après"
            description="Le socle est prêt pour brancher les parcours métier réels."
          />
          <div className="surface-card" style={{ padding: 28 }}>
            <div className="inline-links" style={{ marginBottom: 18 }}>
              <Link className="nav-pill" href="/api/health">
                API health
              </Link>
              <Link className="nav-pill" href="/admin">
                Dashboard admin
              </Link>
              <Link className="nav-pill" href="/reseller">
                Dashboard reseller
              </Link>
            </div>
            <ul className="bullet-list">
              {nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
