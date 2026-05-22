import { chromium } from "playwright-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "https://www.stropdesign.cz/";

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();

const gtagJsResponses = [];
page.on("response", (res) => {
  if (res.url().includes("googletagmanager.com/gtag/js")) {
    gtagJsResponses.push(`${res.status()} ${res.url().slice(0, 80)}`);
  }
});
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 120));
});
page.on("pageerror", (err) => consoleErrors.push("PAGEERROR: " + err.message.slice(0, 120)));

await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(3000);

const diag = await page.evaluate(() => {
  const scripts = Array.from(document.querySelectorAll("script"));
  const consentScript = scripts.find((s) => s.id === "gtag-consent-default");
  return {
    hasGtag: typeof window.gtag === "function",
    dataLayerLen: Array.isArray(window.dataLayer) ? window.dataLayer.length : -1,
    dataLayerDump: (window.dataLayer || []).map((x) => {
      try { return JSON.stringify(Array.from(x)); } catch { return String(x); }
    }),
    consentScriptInDom: !!consentScript,
    consentScriptType: consentScript?.getAttribute("type") || "(none)",
    consentScriptSnippet: consentScript ? consentScript.textContent.slice(0, 200) : "(NOT IN DOM)",
    gtagJsScriptTags: scripts.filter((s) => s.src && s.src.includes("googletagmanager")).map((s) => s.src.slice(0, 80)),
  };
});

console.log("=== gtag.js network responses ===");
console.log(gtagJsResponses.length ? gtagJsResponses.join("\n") : "(žádná odpověď z googletagmanager)");
console.log("\n=== console errory ===");
console.log(consoleErrors.length ? consoleErrors.join("\n") : "(žádné)");
console.log("\n=== stav window ===");
console.log("window.gtag funkce:    ", diag.hasGtag);
console.log("dataLayer délka:       ", diag.dataLayerLen);
console.log("\n=== dataLayer obsah ===");
diag.dataLayerDump.forEach((x, i) => console.log(`  [${i}] ${x}`));
console.log("\n=== consent skript v DOM ===");
console.log("přítomen:  ", diag.consentScriptInDom);
console.log("type attr: ", diag.consentScriptType);
console.log("snippet:   ", diag.consentScriptSnippet.replace(/\s+/g, " ").trim());
console.log("\n=== gtag.js <script> tagy v DOM ===");
console.log(diag.gtagJsScriptTags.length ? diag.gtagJsScriptTags.join("\n") : "(žádný)");

await browser.close();
