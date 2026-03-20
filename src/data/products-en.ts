import type { Surface } from "./products";

export const surfacesEn: Surface[] = [
  {
    name: "Matte",
    slug: "matny",
    color: "#E8E8E8",
    accent: "#847631",
    price: 600,
    priceLabel: "from 600 CZK/m²",
    description:
      "Traditional look of a perfectly painted surface. Matte ceiling doesn't attract attention but gives the room a clean, calm feel. No glare, no reflections. Ideal for bedrooms, offices and living rooms.",
    features: [
      "No glare or reflections",
      "Easy maintenance",
      "Suitable for all spaces",
    ],
  },
  {
    name: "Satin",
    slug: "satenovy",
    color: "#E0E0EA",
    accent: "#5B8DEF",
    price: 680,
    priceLabel: "from 680 CZK/m²",
    description:
      "A wider selection of soft pastel tones with a silky sheen. Combines the best of matte and glossy finishes. The pearlescent effect adds depth and elegance without too much drama.",
    features: [
      "Subtle pearlescent sheen",
      "Wide range of pastel tones",
      "Popular for living rooms and bedrooms",
    ],
  },
  {
    name: "Glossy",
    slug: "leskly",
    color: "#EDE8D8",
    accent: "#C9A84C",
    price: 750,
    priceLabel: "from 750 CZK/m²",
    description:
      "Mirror effect for visually enlarging the space. Highly glossy surface reflects light and interior, optically doubling the room height. Dark shades reflect up to 90% of light.",
    features: [
      "Up to 90% mirror reflection",
      "Visual space enlargement",
      "Modern luxury look",
    ],
  },
  {
    name: "Metallic",
    slug: "metalicky",
    color: "#D8D8D8",
    accent: "#C0C0C0",
    price: 820,
    priceLabel: "from 820 CZK/m²",
    description:
      "Metallic look for modern interiors. Metallic surface simulates brushed or polished metal in shades of silver, gold and copper. Premium industrial style without the weight of real metal.",
    features: [
      "Brushed metal effect",
      "Silver, gold & copper shades",
      "Premium industrial style",
    ],
  },
  {
    name: "Translucent",
    slug: "prusvitny",
    color: "#E0E0F0",
    accent: "#7B68EE",
    price: 900,
    priceLabel: "from 900 CZK/m²",
    description:
      "Unique lighting effect with gentle light diffusion. Translucent film allows LED backlighting behind the ceiling, turning the entire ceiling into one even light source. No visible fixtures.",
    features: [
      "Entire ceiling as light source",
      "Even light diffusion",
      "RGB option for color changes",
    ],
  },
  {
    name: "Custom print",
    slug: "vlastni-tisk",
    color: "#EAE0EA",
    accent: "#FF6B9D",
    price: 1200,
    priceLabel: "from 1,200 CZK/m²",
    description:
      "Original design element with material quality and easy installation. Photos, patterns or graphics in HD resolution directly on the ceiling. Popular motifs: sky, starry night, nature and corporate branding.",
    features: [
      "HD print of any design",
      "UV-resistant colors",
      "Combine with backlighting for lightbox effect",
    ],
  },
  {
    name: "Perforated",
    slug: "perforovany",
    color: "#E5E5E0",
    accent: "#E67E22",
    price: 950,
    priceLabel: "from 950 CZK/m²",
    description:
      "Distinctive decorative look for any space. Perforated film with precisely cut openings creates a visual play of light and shadow. Two-layer system with contrasting base layer adds 3D depth.",
    features: [
      "Decorative perforation patterns",
      "Starry sky effect with backlighting",
      "Two-layer system for 3D effect",
    ],
  },
  {
    name: "Acoustic",
    slug: "akusticky",
    color: "#E0E8E8",
    accent: "#3498DB",
    price: 1100,
    priceLabel: "from 1,100 CZK/m²",
    description:
      "Film with microscopic openings (0.1–0.5 mm) that effectively absorb sound. Visually indistinguishable from a matte surface but significantly improves room acoustics. Reduces echo and reverberation.",
    features: [
      "Sound absorption without visible panels",
      "Clean look like matte surface",
      "Ideal for offices, restaurants and cinemas",
    ],
  },
];
