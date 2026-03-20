import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function writeJson(dir, slug, data) {
  const filePath = path.join(dir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`  ✓ ${filePath}`);
}

// ── References ──
console.log("\n📁 Migrating references...");

const referencesCs = [
  { title: "HHSpa — hvězdná obloha", meta: "Wellness · kompletní stropy", tag: "Hvězdná obloha + LED", gradient: "from-[#0a0a1a] to-[#050510]", description: "Kompletní stropy s hvězdnou oblohou a podsvícením pro wellness centrum HHSpa. Unikátní atmosféra, která přenáší hosty pod noční oblohu.", featured: true },
  { title: "Makronkárna Ostrava", meta: "Kavárna · atypické tvary", tag: "Vlastní tisk + podsvícení", gradient: "from-[#1a0e14] to-[#120a0e]", description: "Atypické tvary stropu s potiskem a LED podsvícením. Originální design, který podtrhuje jedinečný koncept kavárny.", featured: true },
  { title: "Smuteční síň Slavkov u Opavy", meta: "Veřejný prostor · dvouúrovňový strop", tag: "Dvouúrovňový + LED", gradient: "from-[#0d0d12] to-[#08080d]", description: "Dvouúrovňový strop s LED podsvícením pro důstojný a klidný prostor smuteční síně. Citlivé řešení s důrazem na atmosféru.", featured: true },
  { title: "Moderní kuchyně s LED", meta: "Kuchyně · 18 m²", tag: "Matný + LED", gradient: "from-[#1a1a2e] to-[#12121f]", image: "/images/ref-kitchen-led.jpg", description: "Matný strop s integrovaným LED páskem v moderní kuchyni. Čistý design a funkční osvětlení pracovní plochy." },
  { title: "Designové LED linie", meta: "Chodba · 22 m²", tag: "Matný + LED linie", gradient: "from-[#0f1208] to-[#141a0a]", image: "/images/ref-hallway-led.jpg", description: "Geometrické LED linie v chodbě vytvářejí moderní industriální atmosféru. Napínaný strop s integrovaným osvětlením." },
  { title: "Strop s vlastním tiskem", meta: "Koupelna · 8 m²", tag: "Vlastní tisk + podsvícení", gradient: "from-[#1a0e08] to-[#120a06]", image: "/images/ref-bathroom-sky.jpg", description: "Průsvitný strop s potiskem oblohy v koupelně. Vodotěsné řešení, které přináší pocit otevřeného prostoru." },
  { title: "Průsvitný strop se zlatým vzorem", meta: "Hala · 15 m²", tag: "Průsvitný + tisk", gradient: "from-[#0a1212] to-[#081010]", image: "/images/ref-print-gold.jpg", description: "Průsvitný strop s designovým potiskem zlatých vln a LED podsvícením. Luxusní prvek v reprezentativním prostoru." },
  { title: "LED kosočtverec v ložnici", meta: "Ložnice · 20 m²", tag: "Matný + LED design", gradient: "from-[#100d1a] to-[#0e0b16]", image: "/images/led-design-pattern.jpg", description: "Kreativní LED vzor z překrývajících se kosočtverců. Unikátní řešení, které slouží jako hlavní osvětlení i designový prvek." },
  { title: "Rodinný dům Ostrava", meta: "Obývací pokoj · 28 m²", tag: "Lesklý povrch", gradient: "from-[#1a1008] to-[#14100a]", image: "/images/ref-kitchen-modern.jpg", description: "Kompletní stropní řešení pro moderní obývací pokoj. Lesklý povrch opticky zvětšil prostor a dodal místnosti vzdušnost." },
  { title: "Wellness centrum", meta: "Recepce · 40 m²", tag: "Saténový", gradient: "from-[#0d1218] to-[#080d12]", image: "/images/ref-print-abstract.jpg", description: "Saténový povrch pro recepci wellness centra. Jemný lesk dodává prostoru eleganci a profesionalitu." },
  { title: "Hotel Ostrava", meta: "Lobby · 85 m²", tag: "Průsvitný", gradient: "from-[#12100d] to-[#0d0b08]", image: "/images/ref-hallway-lines.jpg", description: "Průsvitný strop s podsvícením v hotelové lobby. Reprezentativní řešení pro prémiové prostory." },
  { title: "Lékařská ordinace", meta: "Čekárna · 22 m²", tag: "Matný", gradient: "from-[#0d0d14] to-[#08080f]", image: "/images/ref-bedroom-rect.jpg", description: "Matný strop pro čekárnu lékařské ordinace. Čistý a profesionální vzhled s integrovaným osvětlením." },
];

const referencesEn = [
  { title: "HHSpa — Starry Sky", meta: "Wellness · complete ceilings", tag: "Starry sky + LED", gradient: "from-[#0a0a1a] to-[#050510]", description: "Complete ceilings with starry sky and backlighting for HHSpa wellness centre. A unique atmosphere transporting guests under a night sky.", featured: true },
  { title: "Makronkárna Ostrava", meta: "Café · custom shapes", tag: "Custom print + backlighting", gradient: "from-[#1a0e14] to-[#120a0e]", description: "Custom-shaped ceiling with print and LED backlighting. Original design underscoring the café's unique concept.", featured: true },
  { title: "Funeral Hall Slavkov u Opavy", meta: "Public space · two-level ceiling", tag: "Two-level + LED", gradient: "from-[#0d0d12] to-[#08080d]", description: "Two-level ceiling with LED backlighting for a dignified and calm funeral hall. A sensitive solution emphasising atmosphere.", featured: true },
  { title: "Modern Kitchen with LED", meta: "Kitchen · 18 m²", tag: "Matte + LED", gradient: "from-[#1a1a2e] to-[#12121f]", image: "/images/ref-kitchen-led.jpg", description: "Matte ceiling with integrated LED strip in a modern kitchen. Clean design and functional work surface lighting." },
  { title: "Design LED Lines", meta: "Hallway · 22 m²", tag: "Matte + LED lines", gradient: "from-[#0f1208] to-[#141a0a]", image: "/images/ref-hallway-led.jpg", description: "Geometric LED lines in a hallway creating a modern industrial atmosphere. Stretch ceiling with integrated lighting." },
  { title: "Custom Print Ceiling", meta: "Bathroom · 8 m²", tag: "Custom print + backlighting", gradient: "from-[#1a0e08] to-[#120a06]", image: "/images/ref-bathroom-sky.jpg", description: "Translucent ceiling with sky print in a bathroom. Waterproof solution bringing a feeling of open space." },
  { title: "Translucent Ceiling with Gold Pattern", meta: "Hall · 15 m²", tag: "Translucent + print", gradient: "from-[#0a1212] to-[#081010]", image: "/images/ref-print-gold.jpg", description: "Translucent ceiling with a golden wave design print and LED backlighting. A luxurious element in a representative space." },
  { title: "LED Diamond in Bedroom", meta: "Bedroom · 20 m²", tag: "Matte + LED design", gradient: "from-[#100d1a] to-[#0e0b16]", image: "/images/led-design-pattern.jpg", description: "Creative LED pattern of overlapping diamonds. A unique solution serving as both main lighting and a design element." },
  { title: "Family House Ostrava", meta: "Living room · 28 m²", tag: "Glossy surface", gradient: "from-[#1a1008] to-[#14100a]", image: "/images/ref-kitchen-modern.jpg", description: "Complete ceiling solution for a modern living room. Glossy surface visually enlarged the space and added airiness." },
  { title: "Wellness Centre", meta: "Reception · 40 m²", tag: "Satin", gradient: "from-[#0d1218] to-[#080d12]", image: "/images/ref-print-abstract.jpg", description: "Satin surface for a wellness centre reception. Subtle sheen adds elegance and professionalism to the space." },
  { title: "Hotel Ostrava", meta: "Lobby · 85 m²", tag: "Translucent", gradient: "from-[#12100d] to-[#0d0b08]", image: "/images/ref-hallway-lines.jpg", description: "Translucent ceiling with backlighting in a hotel lobby. A representative solution for premium spaces." },
  { title: "Medical Office", meta: "Waiting room · 22 m²", tag: "Matte", gradient: "from-[#0d0d14] to-[#08080f]", image: "/images/ref-bedroom-rect.jpg", description: "Matte ceiling for a medical office waiting room. Clean and professional look with integrated lighting." },
];

referencesCs.forEach((ref, i) => {
  writeJson(path.join(CONTENT, "references-cs"), slugify(ref.title), { ...ref, sortOrder: i });
});
referencesEn.forEach((ref, i) => {
  writeJson(path.join(CONTENT, "references-en"), slugify(ref.title), { ...ref, sortOrder: i });
});

// ── Surfaces ──
console.log("\n📁 Migrating surfaces...");

const surfacesCs = [
  { name: "Matný", slug: "matny", color: "#E8E8E8", accent: "#847631", price: 600, priceLabel: "od 600 Kč/m²", description: "Tradiční vzhled dokonale natřeného povrchu. Matný strop nepřitahuje pozornost, ale dodává místnosti čistý a klidný pocit. Žádné odlesky, žádné odrazy. Ideální do ložnic, kanceláří i obývacích pokojů.", features: ["Bez odlesků a odrazů", "Snadná údržba", "Vhodný do všech prostor"] },
  { name: "Saténový", slug: "satenovy", color: "#E0E0EA", accent: "#5B8DEF", price: 680, priceLabel: "od 680 Kč/m²", description: "Širší volba jemných pastelových tónů s hedvábným leskem. Kombinuje výhody matného a lesklého provedení. Perleťový efekt dodává prostoru hloubku a eleganci bez přílišné dramatičnosti.", features: ["Jemný perleťový lesk", "Široká paleta pastelových tónů", "Oblíbený do obýváků a ložnic"] },
  { name: "Lesklý", slug: "leskly", color: "#EDE8D8", accent: "#C9A84C", price: 750, priceLabel: "od 750 Kč/m²", description: "Zrcadlový efekt pro vizuální zvětšení prostoru. Vysoce lesklý povrch odráží světlo i interiér a opticky zdvojnásobuje výšku místnosti. Tmavé odstíny odrážejí až 90 % světla.", features: ["Zrcadlový odraz až 90 %", "Optické zvětšení prostoru", "Moderní luxusní vzhled"] },
  { name: "Metalický", slug: "metalicky", color: "#D8D8D8", accent: "#C0C0C0", price: 820, priceLabel: "od 820 Kč/m²", description: "Kovový vzhled pro moderní interiéry. Metalický povrch simuluje broušený nebo leštěný kov v odstínech stříbra, zlata i mědi. Prémiový industriální styl bez hmotnosti skutečného kovu.", features: ["Efekt broušeného kovu", "Odstíny stříbra, zlata, mědi", "Prémiový industriální styl"] },
  { name: "Průsvitný", slug: "prusvitny", color: "#E0E0F0", accent: "#7B68EE", price: 900, priceLabel: "od 900 Kč/m²", description: "Jedinečný světelný efekt s jemným rozptylem světla. Průsvitná fólie propouští LED podsvícení umístěné za stropem a promění celý strop v jeden rovnoměrný světelný zdroj. Žádná viditelná svítidla.", features: ["Celý strop jako světelný zdroj", "Rovnoměrný rozptyl světla", "Možnost RGB pro změnu barev"] },
  { name: "Vlastní tisk", slug: "vlastni-tisk", color: "#EAE0EA", accent: "#FF6B9D", price: 1200, priceLabel: "od 1 200 Kč/m²", description: "Originální designový prvek s kvalitou materiálu a jednoduchou instalací. Fotografie, vzory nebo grafika v HD rozlišení přímo na stropě. Oblíbené motivy: obloha, hvězdná noc, příroda i firemní branding.", features: ["HD tisk libovolného motivu", "UV odolné barvy", "Kombinace s podsvícením pro lightbox efekt"] },
  { name: "Perforovaný", slug: "perforovany", color: "#E5E5E0", accent: "#E67E22", price: 950, priceLabel: "od 950 Kč/m²", description: "Atypický dekorativní vzhled do prostoru. Perforovaná fólie s přesně řezanými otvory vytváří vizuální hru světla a stínu. Dvouvrstvý systém s kontrastní spodní vrstvou dodává 3D hloubku.", features: ["Dekorativní vzory otvorů", "Efekt hvězdné oblohy s podsvícením", "Dvouvrstvý systém pro 3D efekt"] },
  { name: "Akustický", slug: "akusticky", color: "#E0E8E8", accent: "#3498DB", price: 1100, priceLabel: "od 1 100 Kč/m²", description: "Fólie s mikroskopickými otvory (0,1-0,5 mm), které efektivně pohlcují zvuk. Vizuálně nerozeznatelný od matného povrchu, ale výrazně zlepšuje akustiku prostoru. Snižuje ozvěnu a dobu dozvuku.", features: ["Pohlcování zvuku bez viditelných panelů", "Čistý vzhled jako matný povrch", "Ideální pro kanceláře, restaurace a kina"] },
];

const surfacesEn = [
  { name: "Matte", slug: "matny", color: "#E8E8E8", accent: "#847631", price: 600, priceLabel: "from 600 CZK/m²", description: "Traditional look of a perfectly painted surface. Matte ceiling doesn't attract attention but gives the room a clean, calm feel. No glare, no reflections. Ideal for bedrooms, offices and living rooms.", features: ["No glare or reflections", "Easy maintenance", "Suitable for all spaces"] },
  { name: "Satin", slug: "satenovy", color: "#E0E0EA", accent: "#5B8DEF", price: 680, priceLabel: "from 680 CZK/m²", description: "A wider selection of soft pastel tones with a silky sheen. Combines the best of matte and glossy finishes. The pearlescent effect adds depth and elegance without too much drama.", features: ["Subtle pearlescent sheen", "Wide range of pastel tones", "Popular for living rooms and bedrooms"] },
  { name: "Glossy", slug: "leskly", color: "#EDE8D8", accent: "#C9A84C", price: 750, priceLabel: "from 750 CZK/m²", description: "Mirror effect for visually enlarging the space. Highly glossy surface reflects light and interior, optically doubling the room height. Dark shades reflect up to 90% of light.", features: ["Up to 90% mirror reflection", "Visual space enlargement", "Modern luxury look"] },
  { name: "Metallic", slug: "metalicky", color: "#D8D8D8", accent: "#C0C0C0", price: 820, priceLabel: "from 820 CZK/m²", description: "Metallic look for modern interiors. Metallic surface simulates brushed or polished metal in shades of silver, gold and copper. Premium industrial style without the weight of real metal.", features: ["Brushed metal effect", "Silver, gold & copper shades", "Premium industrial style"] },
  { name: "Translucent", slug: "prusvitny", color: "#E0E0F0", accent: "#7B68EE", price: 900, priceLabel: "from 900 CZK/m²", description: "Unique lighting effect with gentle light diffusion. Translucent film allows LED backlighting behind the ceiling, turning the entire ceiling into one even light source. No visible fixtures.", features: ["Entire ceiling as light source", "Even light diffusion", "RGB option for color changes"] },
  { name: "Custom print", slug: "vlastni-tisk", color: "#EAE0EA", accent: "#FF6B9D", price: 1200, priceLabel: "from 1,200 CZK/m²", description: "Original design element with material quality and easy installation. Photos, patterns or graphics in HD resolution directly on the ceiling. Popular motifs: sky, starry night, nature and corporate branding.", features: ["HD print of any design", "UV-resistant colors", "Combine with backlighting for lightbox effect"] },
  { name: "Perforated", slug: "perforovany", color: "#E5E5E0", accent: "#E67E22", price: 950, priceLabel: "from 950 CZK/m²", description: "Distinctive decorative look for any space. Perforated film with precisely cut openings creates a visual play of light and shadow. Two-layer system with contrasting base layer adds 3D depth.", features: ["Decorative perforation patterns", "Starry sky effect with backlighting", "Two-layer system for 3D effect"] },
  { name: "Acoustic", slug: "akusticky", color: "#E0E8E8", accent: "#3498DB", price: 1100, priceLabel: "from 1,100 CZK/m²", description: "Film with microscopic openings (0.1–0.5 mm) that effectively absorb sound. Visually indistinguishable from a matte surface but significantly improves room acoustics. Reduces echo and reverberation.", features: ["Sound absorption without visible panels", "Clean look like matte surface", "Ideal for offices, restaurants and cinemas"] },
];

surfacesCs.forEach((s, i) => {
  writeJson(path.join(CONTENT, "surfaces-cs"), s.slug, { ...s, sortOrder: i });
});
surfacesEn.forEach((s, i) => {
  writeJson(path.join(CONTENT, "surfaces-en"), s.slug, { ...s, sortOrder: i });
});

// ── Addons ──
console.log("\n📁 Migrating addons...");

const addons = [
  { nameCz: "Bodová světla", nameEn: "Spot lights", price: 350, icon: "💡", category: "lighting" },
  { nameCz: "LED pásky", nameEn: "LED strips", price: 800, icon: "✨", category: "lighting" },
  { nameCz: "Lustr / závěsné svítidlo", nameEn: "Chandelier / pendant light", price: 600, icon: "🔮", category: "lighting" },
  { nameCz: "Lineární difuzor", nameEn: "Linear diffuser", price: 900, icon: "🌬️", category: "climate" },
  { nameCz: "Kulatý difuzor", nameEn: "Round diffuser", price: 700, icon: "⭕", category: "climate" },
  { nameCz: "Ventilační mřížka", nameEn: "Ventilation grille", price: 500, icon: "🔲", category: "climate" },
  { nameCz: "Protipožární systém", nameEn: "Fire protection system", price: 1800, icon: "🔥", category: "safety" },
  { nameCz: "Kouřový detektor", nameEn: "Smoke detector", price: 400, icon: "🚨", category: "safety" },
  { nameCz: "Nouzové osvětlení", nameEn: "Emergency lighting", price: 600, icon: "🚪", category: "safety" },
  { nameCz: "Reproduktory", nameEn: "Speakers", price: 2400, icon: "🔊", category: "tech" },
  { nameCz: "Smart Home integrace", nameEn: "Smart Home integration", price: 2800, icon: "📱", category: "tech" },
  { nameCz: "Bezpečnostní kamera", nameEn: "Security camera", price: 1500, icon: "📷", category: "tech" },
  { nameCz: "Rolety / žaluzie", nameEn: "Blinds / shutters", price: 1200, icon: "🪟", category: "other" },
  { nameCz: "Revizní dvířka", nameEn: "Access hatch", price: 800, icon: "🚪", category: "other" },
];

addons.forEach((a, i) => {
  writeJson(path.join(CONTENT, "addons"), slugify(a.nameCz), { ...a, sortOrder: i });
});

// ── Testimonials ──
console.log("\n📁 Migrating testimonials...");

const testimonialsCs = [
  { name: "Veronika Sváčková", text: "Moc děkuji této firmě, během jediného dne proměnila naši výrobnu a pak prodejnu k nepoznání. Když někoho jeho řemeslo opravdu baví, je to hned vidět. Práce byla odvedena kvalitně, precizně a s maximální pečlivostí.", rating: 5 },
  { name: "Petr Zajac", text: "Rád bych vyzdvihnul velmi pečlivou a spolehlivou práci, toto inovativní řešení při rekonstrukci bytu ušetří spoustu peněz a času.", rating: 5 },
  { name: "Michal Burek", text: "Maminka chtěla do svého bytu změnu a nejvíc ji trápil strop a světla. S výsledkem byla víc než spokojená. Firma odvedla rychlou a zároveň precizní práci. Můžu jen doporučit!", rating: 5 },
  { name: "Tomáš Kantor", text: "Naprostá spokojenost. Domluva, realizace, top, připevnění ať už k nábytku, stěně nebo kachlím. A hlavně ta údržba? Omyvatelnost 11/10!", rating: 5 },
  { name: "Tomas Bolcek", text: "Velice doporučuji. Od začátku až do konce průběhu profesionální přístup. Výběr z velké škály provedení. A výsledek? Naprosto předčil má očekávání.", rating: 5 },
  { name: "Ales Kotasek", text: "Hodně dobře to mají kluci vymyšlené, poradí co jak, práci udělají rychle, kvalitně a přesně. Podsvícení vypadá ještě líp než jsem vůbec čekal. Můžu jen doporučit.", rating: 5 },
  { name: "Fakerman", text: "Můžu jen doporučit, preciznost, rychlost, profesionální přístup mají samozřejmostí. S neobvyklými tvary a překážkami si umí poradit.", rating: 5 },
];

const testimonialsEn = [
  { name: "Veronika Sváčková", text: "A big thank you to this company — in a single day they completely transformed our production space and then our shop. When someone truly loves their craft, it shows. The work was done with quality, precision and the utmost care.", rating: 5 },
  { name: "Petr Zajac", text: "I'd like to highlight the very careful and reliable work. This innovative solution saves a lot of money and time during apartment renovation.", rating: 5 },
  { name: "Michal Burek", text: "My mum wanted a change in her flat and the ceiling and lights bothered her the most. She was more than happy with the result. The company did fast yet precise work. I can only recommend!", rating: 5 },
  { name: "Tomáš Kantor", text: "Completely satisfied. Communication, execution — top notch. Mounting to furniture, walls or tiles, everything perfect. And the maintenance? Washability 11/10!", rating: 5 },
  { name: "Tomas Bolcek", text: "Highly recommend. Professional approach from start to finish. A wide range of finishes to choose from. And the result? It absolutely exceeded my expectations.", rating: 5 },
  { name: "Ales Kotasek", text: "The guys have it really well figured out — they advise on everything, work quickly, with quality and precision. The backlighting looks even better than I ever expected. Can only recommend.", rating: 5 },
  { name: "Fakerman", text: "I can only recommend — precision, speed and a professional approach are a given for them. They handle unusual shapes and obstacles with ease.", rating: 5 },
];

testimonialsCs.forEach((t, i) => {
  writeJson(path.join(CONTENT, "testimonials-cs"), slugify(t.name), { ...t, sortOrder: i });
});
testimonialsEn.forEach((t, i) => {
  writeJson(path.join(CONTENT, "testimonials-en"), slugify(t.name), { ...t, sortOrder: i });
});

// ── FAQ ──
console.log("\n📁 Migrating FAQ...");

const faqCs = [
  { question: "Jak dlouho trvá montáž napínaného stropu?", answer: "Montáž běžné místnosti (do 30 m²) zvládneme rychle a čistě, obvykle do 1–2 dnů. Větší prostory nebo složitější projekty mohou trvat 2–3 dny." },
  { question: "Je potřeba stěhovat nábytek?", answer: "Ne, ve většině případů není potřeba nic stěhovat. Montáž probíhá čistě a bez prachu. Pokud bude potřeba, předem vás upozorníme." },
  { question: "Jaká je životnost napínaného stropu?", answer: "Napínaný strop má životnost 15–25 let. Materiál je odolný proti vlhkosti, prasklinám a nezmění barvu ani po letech používání. Poskytujeme záruku 2 roky na montáž a 12 let na stálost barev." },
  { question: "Lze do stropu integrovat osvětlení?", answer: "Ano, nabízíme kompletní řešení včetně LED bodových světel, LED pásků, průsvitných stropů s podsvícením i integrovaných reproduktorů." },
  { question: "Kolik stojí napínaný strop?", answer: "Cena závisí na typu povrchu, velikosti místnosti a doplňcích. Orientační ceny začínají od 600 Kč/m² za matný povrch. Přesnou nabídku připravíme na míru po konzultaci." },
  { question: "Děláte i mimo Ostravu?", answer: "Ano, realizujeme projekty po celé České republice. Sídlíme v Ostravě, ale rádi dojedeme kamkoli." },
];

const faqEn = [
  { question: "How long does stretch ceiling installation take?", answer: "Installation of a standard room (up to 30 m²) is done quickly and cleanly, usually within 1–2 days. Larger spaces or more complex projects may take 2–3 days." },
  { question: "Do I need to move furniture?", answer: "No, in most cases you don't need to move anything. Installation is clean and dust-free. If needed, we'll let you know in advance." },
  { question: "What is the lifespan of a stretch ceiling?", answer: "A stretch ceiling lasts 15–25 years. The material is resistant to moisture, cracks and won't change color even after years of use. We offer a 2-year installation warranty and 12-year color stability warranty." },
  { question: "Can lighting be integrated into the ceiling?", answer: "Yes, we offer complete solutions including LED spot lights, LED strips, translucent ceilings with backlighting and integrated speakers." },
  { question: "How much does a stretch ceiling cost?", answer: "The price depends on surface type, room size and add-ons. Indicative prices start from 600 CZK/m² for matte surface. We prepare a tailored offer after consultation." },
  { question: "Do you work outside Ostrava?", answer: "Yes, we carry out projects across the entire Czech Republic. We are based in Ostrava but happy to travel anywhere." },
];

faqCs.forEach((f, i) => {
  writeJson(path.join(CONTENT, "faq-cs"), slugify(f.question), { ...f, sortOrder: i });
});
faqEn.forEach((f, i) => {
  writeJson(path.join(CONTENT, "faq-en"), slugify(f.question), { ...f, sortOrder: i });
});

console.log("\n✅ Migration complete!");
