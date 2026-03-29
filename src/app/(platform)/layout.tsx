import Link from "next/link";

export default function PlatformLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="platform-shell">
      <div className="platform-topbar">
        <Link className="nav-pill" href="/">
          Retour accueil
        </Link>
        <div className="inline-links">
          <Link className="nav-pill" href="/admin">
            Admin
          </Link>
          <Link className="nav-pill" href="/reseller">
            Reseller
          </Link>
        </div>
      </div>
      {children}
    </main>
  );
}
