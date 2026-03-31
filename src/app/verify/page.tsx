type VerifyPageProps = {
  searchParams?: {
    certificate?: string;
  };
};

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  const certificateNumber = searchParams?.certificate ?? null;

  return (
    <main className="platform-shell">
      <section className="platform-panel hero-card">
        <div className="platform-header">
          <span className="eyebrow">Verification certificat</span>
          <h1 style={{ fontFamily: "var(--font-heading)" }}>
            Controle d&apos;attestation
          </h1>
          <p>
            Cette page est le point d&apos;entree du QR code present sur
            l&apos;attestation. Elle pourra ensuite verifier le certificat en
            base et afficher son statut reel.
          </p>
        </div>

        <div className="card">
          <h3>Numero de certificat</h3>
          <p>
            {certificateNumber
              ? certificateNumber
              : "Aucun numero de certificat n'a ete transmis dans l'URL."}
          </p>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <h3>Prochaine etape</h3>
          <p>
            Connecter cette page a PostgreSQL pour retrouver l&apos;attestation,
            le revendeur, le produit et le statut du certificat en temps reel.
          </p>
        </div>
      </section>
    </main>
  );
}
