type StatCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <article className="stat-card">
      <strong>{value}</strong>
      <h3>{label}</h3>
      <p>{helper}</p>
    </article>
  );
}
