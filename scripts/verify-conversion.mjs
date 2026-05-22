import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SITE = "https://www.stropdesign.cz/kontakt";

const hits = {
  ga4Lead: [],
  adsConv: [],
  sklikConv: [],
  adsAny: [],
};

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();

page.on("request", (req) => {
  const u = req.url();
  // GA4 generate_lead — check both query string and POST body
  if (u.includes("/g/collect")) {
    let body = "";
    try { body = req.postData() || ""; } catch { /* noop */ }
    if (u.includes("en=generate_lead") || body.includes("en=generate_lead")) {
      hits.ga4Lead.push("generate_lead");
    }
  }
  // Google Ads conversion (label OI72CJCgsd4bEOTK8YQr)
  if (u.includes("googleadservices.com") || u.includes("google.com/pagead") || u.includes("googleads.g.doubleclick.net") || u.includes("/ccm/collect")) {
    hits.adsAny.push(u.slice(0, 80));
    if (u.includes("OI72CJCgsd4bEOTK8YQr") || u.includes("conversion")) {
      hits.adsConv.push(u.slice(0, 90));
    }
  }
  // Sklik conversion (id 100264044)
  if (u.includes("seznam.cz") && (u.includes("100264044") || u.includes("conv"))) {
    hits.sklikConv.push(u.slice(0, 90));
  }
});

console.log("→ Otevírám /kontakt...");
await page.goto(SITE, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(1500);

// Souhlas s cookies (aby konverze běžely v granted režimu)
try {
  await page.getByText("Přijmout", { exact: false }).first().click({ timeout: 6000 });
  console.log('→ Souhlas udělen ("Přijmout")');
} catch {
  console.log('⚠ Cookie lišta nenalezena (pokračuji)');
}
await page.waitForTimeout(1000);

// Vyplnění formuláře
console.log("→ Vyplňuji formulář...");
await page.locator('input[type="text"]').first().fill("TEST – Claude E2E ověření (ignorujte)");
await page.locator('input[type="email"]').first().fill("test-e2e@example.com");
await page.locator('input[type="tel"]').first().fill("+420000000000");
await page.locator("textarea").first().fill("Automatický test konverzního měření, prosím ignorujte.");
await page.locator('input[type="checkbox"]').first().check();

console.log("→ Odesílám...");
await page.locator('button[type="submit"]').first().click();

// Počkej na úspěšné odeslání (success screen) + konverzní hity
await page.waitForTimeout(6000);

const submitted = await page.getByText(/Děkujeme za poptávku|Thank you/i).count();

console.log("\n=== VÝSLEDEK ===");
console.log("Formulář odeslán (success screen):", submitted > 0 ? "✅ ano" : "❌ ne");
console.log("GA4 generate_lead:    ", hits.ga4Lead.length, hits.ga4Lead.length ? "✅" : "❌");
console.log("Google Ads conversion:", hits.adsConv.length, hits.adsConv.length ? "✅" : "❌");
console.log("  (všechny Ads hity:", hits.adsAny.length + ")");
console.log("Sklik conversion:     ", hits.sklikConv.length, hits.sklikConv.length ? "✅" : "❌");
if (hits.adsConv.length) console.log("  Ads conv URL:", hits.adsConv[0]);
if (hits.sklikConv.length) console.log("  Sklik conv URL:", hits.sklikConv[0]);

await browser.close();

const ok = submitted > 0 && hits.ga4Lead.length > 0 && hits.adsConv.length > 0 && hits.sklikConv.length > 0;
console.log(`\n${ok ? "✅ VŠECHNY konverze fungují" : "⚠ Něco z konverzí nestřílí — viz výše"}`);
