/**
 * Typographie française.
 *
 * En français, on met une espace avant « : ; ! ? % € » et à l'intérieur des
 * guillemets. Si cette espace est ordinaire, le navigateur peut couper la
 * ligne juste avant le signe et le laisser tout seul en début de ligne.
 * Cette fonction la remplace par une espace insécable (\u00a0), ce qui évite
 * de devoir y penser en écrivant les textes dans lib/content.ts.
 */
export function typo(texte: string): string {
  return (
    texte
      // l'audit → l’audit (apostrophe typographique)
      .replace(/(\p{L})'(\p{L})/gu, "$1’$2")
      // 15 % · 1 000 € · Soisy : … · Vraiment ?
      .replace(/ ([;:!?»%€])/g, "\u00a0$1")
      .replace(/« /g, "«\u00a0")
      // milliers : 1 000
      .replace(/(\d) (\d{3})(?!\d)/g, "$1\u00a0$2")
      // unités : 72 h, 20 min, 30 jours…
      .replace(/(\d) (h|min|km|nuits?|jours?|ans?|semaines?)(?![a-zà-ÿ])/g, "$1\u00a0$2")
  );
}
