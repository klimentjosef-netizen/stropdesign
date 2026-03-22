export interface ComparisonRow {
  feature: string;
  strop: string;
  sdk: string;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: "Montáž", strop: "Rychlá, bez prachu", sdk: "Zdlouhavá, prašná" },
  { feature: "Praskliny", strop: "Bez prasklin", sdk: "Náchylný na praskliny" },
  { feature: "Údržba", strop: "Minimální, antistatický povrch", sdk: "Pravidelné malování" },
  { feature: "Vlhkost", strop: "Vodotěsný, odolný", sdk: "Neodolá vodě" },
  { feature: "Zatížení", strop: "Nízké", sdk: "Vysoké" },
  { feature: "Design", strop: "Matný, lesklý, tisk, LED podsvícení", sdk: "Omezené možnosti" },
  { feature: "Cena", strop: "Nižší celkové náklady", sdk: "Vyšší celkové náklady" },
];
