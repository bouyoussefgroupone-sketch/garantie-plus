import { SectionTitle } from "@/components/shell/section-title";
import { StatCard } from "@/components/ui/stat-card";
import { Tag } from "@/components/ui/tag";

const adminPriorities = [
  "Piloter les resellers et suivre leurs soldes wallet",
  "Contrôler les plans actifs et les ventes réalisées",
  "Régénérer les certificats en conservant l’historique",
  "Tracer les ajustements financiers et les annulations"
];

export default function AdminPage() {
  return (
    <section className="platform-panel hero-card">
      <div className="platform-header">
        <Tag>Espace plateforme</Tag>
        <h1 style={{ fontFamily: "var(--font-heading)" }}>Dashboard admin</h1>
        <p>
          Vue pensée pour les équipes internes qui supervisent les partenaires,
          alimentent les wallets et gardent le contrôle sur les certificats.
        </p>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Resellers" value="n/a" helper="à connecter à PostgreSQL" />
        <StatCard label="Wallets" value="atomiques" helper="idempotency key + audit" />
        <StatCard label="Certificats" value="versionnés" helper="régénération traçable" />
        <StatCard label="Rôles" value="3 internes" helper="super_admin, admin, sub_admin" />
      </div>

      <SectionTitle
        eyebrow="Mission"
        title="Bloc d’administration"
        description="Cette zone va accueillir les écrans de gouvernance plateforme."
      />
      <ul className="bullet-list">
        {adminPriorities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
