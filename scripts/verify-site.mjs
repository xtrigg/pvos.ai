import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const checks = [];

function check(name, condition) {
  checks.push({ name, pass: Boolean(condition) });
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

let html = "";
let css = "";

try {
  html = read("index.html");
  css = read("assets/styles.css");
} catch (error) {
  console.error(`Missing required site file: ${error.path || error.message}`);
  process.exit(1);
}

check("sets PVOS title", /<title>PVOS\.ai/.test(html));
check("defines Private Voice OS", /Private Voice OS/.test(html));
check("explains AI recorder", /AI Recorder/i.test(html));
check("explains privacy gateway", /Privacy Gateway/i.test(html));
check("explains Memory OS", /Memory OS/i.test(html));
check("targets 100-1000 person companies", /100[\s-]1000/.test(html));
check("has three pricing tiers", (html.match(/class="price-card/g) || []).length === 3);
check("uses trigg@gmic.ai contact", /trigg@gmic\.ai/.test(html));
check("mentions edge redaction", /edge/i.test(html) && /redact/i.test(html));
check("has responsive CSS", /@media\s*\(/.test(css));
check("keeps CSS reasonably substantial", statSync(join(root, "assets/styles.css")).size > 4000);

const failed = checks.filter((item) => !item.pass);

for (const item of checks) {
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} verification check(s) failed.`);
  process.exit(1);
}

console.log("\nAll site verification checks passed.");
