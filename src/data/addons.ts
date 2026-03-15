export interface Addon {
  name: string;
  price: number;
  icon: string;
  category: "lighting" | "climate" | "safety" | "tech" | "other";
}

export const addons: Addon[] = [
  // Osvětlení
  { name: "Bodová světla", price: 350, icon: "💡", category: "lighting" },
  { name: "LED pásky", price: 800, icon: "✨", category: "lighting" },
  { name: "Lustr / závěsné svítidlo", price: 600, icon: "🔮", category: "lighting" },

  // Klimatizace & ventilace
  { name: "Lineární difuzor", price: 900, icon: "🌬️", category: "climate" },
  { name: "Kulatý difuzor", price: 700, icon: "⭕", category: "climate" },
  { name: "Ventilační mřížka", price: 500, icon: "🔲", category: "climate" },

  // Bezpečnost
  { name: "Protipožární systém", price: 1800, icon: "🔥", category: "safety" },
  { name: "Kouřový detektor", price: 400, icon: "🚨", category: "safety" },
  { name: "Nouzové osvětlení", price: 600, icon: "🚪", category: "safety" },

  // Technologie
  { name: "Reproduktory", price: 2400, icon: "🔊", category: "tech" },
  { name: "Smart Home integrace", price: 2800, icon: "📱", category: "tech" },
  { name: "Bezpečnostní kamera", price: 1500, icon: "📷", category: "tech" },

  // Ostatní
  { name: "Rolety / žaluzie", price: 1200, icon: "🪟", category: "other" },
  { name: "Revizní dvířka", price: 800, icon: "🚪", category: "other" },
];

export const categoryLabels: Record<Addon["category"], string> = {
  lighting: "Osvětlení",
  climate: "Klimatizace & ventilace",
  safety: "Bezpečnost",
  tech: "Technologie",
  other: "Ostatní",
};
