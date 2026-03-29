type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description
}: SectionTitleProps) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 style={{ fontFamily: "var(--font-heading)", marginBottom: 8 }}>
        {title}
      </h2>
      <p className="section-copy">{description}</p>
    </div>
  );
}
