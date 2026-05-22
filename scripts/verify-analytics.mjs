import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SITE = "https://www.stropdesign.cz/";

const hits = { ga4: [], ads: [], sklik: [] };
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();

page.on("request", (req) => {
  const u = req.url();
  if (u.includes("/g/collect")) {
    const p = new URL(u).searchParams;
    hits.ga4.push(`tid=${p.get("tid")} en=${p.get("en")}`);
  }
  if (u.includes("googleads.g.doubleclick.net") || u.includes("google.com/pagead") || u.includes("/ccm/collect")) {
    hits.ads.push(u.slice(0, 70));
  }
  if ((u.includes("seznam.cz") || u.includes("imedia.cz")) && !u.includes("/js/rc.js")) {
    hits.sklik.push(u.slice(0, 90));
  }
});

await page.goto(SITE, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2500);
const before = { ga4: hits.ga4.length, ads: hits.ads.length, sklik: hits.sklik.length };
console.log("[BEZ SOUHLASU - consent denied]");
console.log("  GA4:", hits.ga4.length, hits.ga4.slice(0, 4).join(" | "));
console.log("  Ads:", hits.ads.length);
console.log("  Sklik:", hits.sklik.length);

try {
  await page.getByText("Přijmout", { exact: false }).first().click({ timeout: 8000 });
  console.log('\n→ kliknuto "Přijmout"');
} catch {
  console.log('\n⚠ "Přijmout" nenalezeno');
}
await page.waitForTimeout(3500);

console.log("\n[PO SOUHLASU - consent granted]");
console.log(`  GA4:   ${hits.ga4.length} (+${hits.ga4.length - before.ga4})  ${hits.ga4.slice(before.ga4).join(" | ")}`);
console.log(`  Ads:   ${hits.ads.length} (+${hits.ads.length - before.ads})`);
console.log(`  Sklik: ${hits.sklik.length} (+${hits.sklik.length - before.sklik})`);

await browser.close();
const ok = hits.ga4.length > 0 && hits.ads.length > 0;
console.log(`\n${ok ? "✅ GA4 i Google Ads reálně střílí hity" : "❌ Něco ještě nestřílí"}`);
