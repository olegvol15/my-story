const EXCERPT_LENGTH = 220;

/** Strip markdown down to plain prose and cut it to a meta-description length. */
export const toExcerpt = (markdown: string) => {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= EXCERPT_LENGTH) return plain;
  const cut = plain.slice(0, EXCERPT_LENGTH);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : EXCERPT_LENGTH).trimEnd()}…`;
};
