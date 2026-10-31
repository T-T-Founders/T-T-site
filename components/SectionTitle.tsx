/**
 * Two-line serif heading as in the references: a roman line, then an italic
 * line carrying the information. Each line rises from behind a mask when the
 * heading scrolls into view (see .title-lines in globals.css).
 */
export default function SectionTitle({
  id,
  as: Tag = "h2",
  roman,
  italic,
  className = "",
}: {
  id?: string;
  as?: "h1" | "h2";
  roman: string;
  italic: string;
  className?: string;
}) {
  return (
    <Tag id={id} className={`section-title title-lines ${className}`}>
      <span>
        <span>{roman} </span>
      </span>
      <span>
        <span style={{ ["--l" as string]: 1 }}>
          <em>{italic}</em>
        </span>
      </span>
    </Tag>
  );
}
