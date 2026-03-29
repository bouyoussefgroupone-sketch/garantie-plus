import { SectionTitle } from "@/components/shell/section-title";
import { StatCard } from "@/components/ui/stat-card";
import { Tag } from "@/components/ui/tag";

const resellerFlow = [
  "Vérifier le solde wallet disponible avant la vente",
  "Créer ou retrouver le client final",
  "Sélectionner le plan de garantie adapté au TV vendu",
  "Débiter le wallet et générer le certificat PDF"
];

export default function ResellerPage() {
  return (
    <section className="platform-panel hero-card">
      <div className="platform-header">
        <Tag>Espace revendeur</Tag>
        <h1 style={{ fontFamily: "var(--font-heading)" }}>
          Dashboard reseller
        </h1>
        <p>
          Ce parcours est dédié aux revendeurs qui vendent la garantie, gèrent
          leurs clients et consultent les certificats de souscription.
        </p>
      </div>

      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <StatCard label="Plans" value="TV" helper="12 à 24 mois pour commencer" />
        <StatCard label="Wallet" value="prépayé" helper="solde disponible temps réel" />
        <StatCard label="Clients" value="B2C" helper="rattachés au reseller" />
        <StatCard label="Sortie" value="PDF" helper="certificat régénérable" />
      </div>

      <SectionTitle
        eyebrow="Parcours vente"
        title="Activation d’une garantie"
        description="Le tunnel reseller doit aller vite, tout en restant strict sur les contrôles métier."
      />
      <ul className="bullet-list">
        {resellerFlow.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
