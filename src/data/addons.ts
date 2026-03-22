export interface Addon {
  name: string;
  price: number;
  icon: string;
  unit: string;
  category: "lighting" | "tech" | "other";
}

export const addons: Addon[] = [
  // Osvětlení
  { name: "Obvodové podsvícení LED pásky", price: 980, icon: "✨", unit: "bm", category: "lighting" },
  { name: "Liniové světelné profily s difuzorem", price: 990, icon: "💡", unit: "bm", category: "lighting" },
  { name: "Magnetické světelné profily", price: 1150, icon: "🧲", unit: "bm", category: "lighting" },
  { name: "Lustr / závěsné svítidlo (montáž)", price: 200, icon: "🔮", unit: "ks", category: "lighting" },
  { name: "Vestavěný garnyžový profil s LED", price: 1350, icon: "🪟", unit: "bm", category: "lighting" },

  // Technologie (montáž)
  { name: "Reproduktory (montáž)", price: 500, icon: "🔊", unit: "ks", category: "tech" },
  { name: "Bezpečnostní kamera (montáž)", price: 200, icon: "📷", unit: "ks", category: "tech" },
  { name: "Detektor kouře a jiné (montáž)", price: 200, icon: "🚨", unit: "ks", category: "tech" },

  // Ostatní
  { name: "Obvodová krycí lišta", price: 28, icon: "📏", unit: "bm", category: "other" },
  { name: "Výřez pro trubky od topení", price: 200, icon: "🔧", unit: "ks", category: "other" },
  { name: "Revizní dvířka", price: 4500, icon: "🚪", unit: "ks", category: "other" },
];

export const categoryLabels: Record<Addon["category"], string> = {
  lighting: "Osvětlení",
  tech: "Technologie",
  other: "Ostatní",
};
