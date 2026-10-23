// Investor / seller-finance deck for the year-two farmhouse.
// Numbers come from recoery_homestead/08-decision/entity-and-financials.md
// (Pro-forma 2) and ceo-decision.md. Run: npm install && node build-deck.js

const path = require("path");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("./apply_theme.js");

const OUT = path.join(__dirname, "recovery-homestead-investor-deck.pptx");

// ---------- theme: the brief's soil-survey palette ----------
const THEME = {
  name: "Recovery Homestead",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1B211C", // ink
    lt1: "FFFFFF",
    dk2: "2F5D50", // verdigris — dominant
    lt2: "EDEFE8", // drafting linen — card tint only
    accent1: "2F5D50",
    accent2: "94441F", // oxide — risk only
    accent3: "7C8A7E", // muted green-grey
    accent4: "43663A",
    accent5: "B7BCB0",
    accent6: "E3EADD",
    hlink: "2F5D50",
    folHlink: "7C8A7E",
  },
};
const H = THEME.colors; // hex, for the few hex-only options

// ---------- icons: react-icons -> svg -> png (defensive) ----------
let iconPng = null;
try {
  const React = require("react");
  const ReactDOMServer = require("react-dom/server");
  const sharp = require("sharp");
  const Fi = require("react-icons/fi");
  const cache = {};
  iconPng = async (name, hex) => {
    const key = name + hex;
    if (cache[key]) return cache[key];
    const el = React.createElement(Fi[name], { color: "#" + hex, size: 512, strokeWidth: 1.75 });
    const svg = ReactDOMServer.renderToStaticMarkup(el);
    const buf = await sharp(Buffer.from(svg)).resize(512, 512).png().toBuffer();
    cache[key] = "image/png;base64," + buf.toString("base64");
    return cache[key];
  };
} catch (e) {
  console.warn("icon pipeline unavailable, falling back to glyph circles:", e.message);
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "Rob Nye";
  pres.company = "Nye Recovery LLC";
  pres.title = "Recovery Homestead";
  pres.subject = "Investor and seller-finance brief for the year-two farmhouse";
  const C = pres.SchemeColor;

  // ---------- layouts ----------
  pres.defineSlideMaster({
    title: "DARK",
    background: { color: C.text2 }, // dk2 verdigris
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.55, w: 8.8, h: 1.6,
        fontSize: 40, bold: true, color: C.background1, align: "left", valign: "bottom", margin: 0 } } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 3.3, w: 8.0, h: 1.2,
        fontSize: 18, color: C.accent6, align: "left", valign: "top", margin: 0 } } },
    ],
  });

  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: C.background1 },
    margin: [0.5, 0.5, 0.75, 0.5],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.5, y: 0.38, w: 9.0, h: 0.8,
        fontSize: 30, bold: true, color: C.text1, align: "left", valign: "middle", margin: 0 } } },
      { placeholder: { options: { name: "body", type: "body", x: 0.5, y: 1.35, w: 9.0, h: 3.7,
        fontSize: 15, color: C.text1, align: "left", valign: "top", margin: 0 } } },
      { text: { text: "Nye Recovery LLC   ·   Proposed terms, not an offer   ·   Confidential",
        options: { x: 0.5, y: 5.2, w: 7.5, h: 0.3, fontSize: 9, color: C.accent3, align: "left", margin: 0 } } },
      { slideNumber: { x: 9.0, y: 5.2, w: 0.5, h: 0.3, fontSize: 9, color: C.accent3, align: "right" } },
    ],
  });

  // ---------- helpers ----------
  const content = (sectionTitle, title) => {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle });
    s.addText(title, { placeholder: "title" });
    return s;
  };

  // Icon in a verdigris circle, with a bold header and a line of body beneath.
  async function iconRow(slide, { icon, glyph, x, y, w, head, body, headSize = 15, bodySize = 12.5 }) {
    const d = 0.46;
    slide.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: C.accent1 }, line: { color: C.accent1, width: 0 } });
    if (iconPng) {
      const data = await iconPng(icon, "FFFFFF");
      slide.addImage({ data, x: x + 0.11, y: y + 0.11, w: d - 0.22, h: d - 0.22 });
    } else {
      slide.addText(glyph, { x, y, w: d, h: d, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true });
    }
    slide.addText(head, { x: x + d + 0.18, y: y - 0.02, w: w - d - 0.18, h: 0.3, fontSize: headSize, bold: true, color: C.text1, margin: 0, isTextBox: true });
    slide.addText(body, { x: x + d + 0.18, y: y + 0.28, w: w - d - 0.18, h: 0.62, fontSize: bodySize, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
  }

  // Big number + small label, the stat callout.
  function stat(slide, { x, y, w, value, label, size = 40, color = C.text2 }) {
    slide.addText(value, { x, y, w, h: 0.7, fontSize: size, bold: true, color, margin: 0, isTextBox: true, valign: "bottom" });
    slide.addText(label, { x, y: y + 0.72, w, h: 0.45, fontSize: 11.5, color: C.accent3, margin: 0, isTextBox: true, valign: "top" });
  }

  // Tinted card (no edge stripes).
  function card(slide, { x, y, w, h }) {
    slide.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.background2 }, line: { color: C.background2, width: 0 } });
  }

  // =====================================================================
  pres.addSection({ title: "Open" });

  // 1 — Title
  {
    const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Open" });
    s.addText("Recovery Homestead", { placeholder: "title" });
    s.addText([
      { text: "A licensed recovery house becomes a working farm.", options: { breakLine: true } },
      { text: "Investor and seller-finance brief  ·  Rob Nye  ·  Nye Recovery LLC", options: { fontSize: 13, color: C.accent5 } },
    ], { placeholder: "body" });
    s.addText("RURAL PENNSYLVANIA  ·  2027", { x: 0.6, y: 0.6, w: 6, h: 0.3, fontSize: 10, color: C.accent5, charSpacing: 3, margin: 0, isTextBox: true });
    s.addNotes("Open on the one-line thesis. The house we run today proves the model; the farm is what the money buys. Keep this under 30 seconds.");
  }

  // 2 — The ask
  {
    const s = content("Open", "The ask");
    stat(s, { x: 0.5, y: 1.35, w: 4.2, value: "$120–160K", label: "Cash to acquire and open a 28–54 acre farm property", size: 44 });
    s.addText("Secured by the property. Two structures on slide 10. Proceeds buy the land, the closing, the rehab, and the beds — nothing else.",
      { x: 0.5, y: 2.75, w: 4.2, h: 1.0, fontSize: 13, color: C.text1, margin: 0, isTextBox: true });
    const x = 5.3, w = 4.2;
    await iconRow(s, { icon: "FiHome", glyph: "H", x, y: 1.4, w, head: "Buys a licensable farmhouse", body: "An 8-bedroom 1876 farmhouse licenses to 10–14 beds under 28 Pa. Code § 717.29 with no new construction." });
    await iconRow(s, { icon: "FiMap", glyph: "M", x, y: 2.55, w, head: "In an unzoned township", body: "Wyoming and Bradford counties: no county zoning, no variance, no hearing. The FHA stands behind it regardless." });
    await iconRow(s, { icon: "FiTrendingUp", glyph: "↑", x, y: 3.7, w, head: "Backed by a running house", body: "Not a plan. The leased six-to-eight bed house we operate today, with its license and its census, is the collateral's track record." });
    s.addNotes("Say the number once and do not apologize for it. Then point at the three rows. The deal is on slide 10; do not negotiate here.");
  }

  // =====================================================================
  pres.addSection({ title: "The problem and the model" });

  // 3 — The problem
  {
    const s = content("The problem and the model", "Detox discharges people to nowhere");
    stat(s, { x: 0.5, y: 1.4, w: 2.8, value: "~35", label: "overdose deaths per 100,000 — Fayette County, highest in PA" });
    stat(s, { x: 3.6, y: 1.4, w: 2.8, value: "~400", label: "DDAP-licensed recovery houses statewide. They are full." });
    stat(s, { x: 6.7, y: 1.4, w: 2.8, value: "6 mo", label: "what the evidence says recovery housing needs to hold. Most programs offer 28 days." });
    card(s, { x: 0.5, y: 3.0, w: 9.0, h: 1.4 });
    s.addText([
      { text: "The gap is not treatment. It is where people go after it.", options: { bold: true, breakLine: true, fontSize: 15 } },
      { text: "Pennsylvania has detox and 28-day beds. What it is short of is a structured place to live for the six months after — long enough for the acute period to pass and habits to form. Single County Authorities say it plainly: there is nowhere to send men who need six months. That is the bed we sell.", options: { fontSize: 13 } },
    ], { x: 0.8, y: 3.15, w: 8.4, h: 1.15, color: C.text1, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 6 });
    s.addNotes("Pull the current county figure for wherever the property is before the meeting. OverdoseFreePA has it by county. The 400-houses number is DDAP's own.");
  }

  // 4 — What we have built (track record — fill at month 6)
  {
    const s = content("The problem and the model", "What we run today");
    s.addText("Fill in at month six, before the first investor meeting. Every blank below is a number we will have.",
      { x: 0.5, y: 1.3, w: 9.0, h: 0.35, fontSize: 11, italic: true, color: C.accent2, margin: 0, isTextBox: true });
    const rows = [
      ["Opened", "——  2027"],
      ["Residents today / capacity", "——  of 8"],
      ["DDAP license", "No. ——  issued ——"],
      ["Months at or above breakeven (5 residents)", "——"],
      ["Collection rate", "——%"],
      ["SCA referral relationship", "——  county, since ——"],
      ["Incidents requiring emergency response", "——"],
      ["Live-in house manager", "——, ——  years in recovery"],
    ];
    s.addTable(rows.map(([k, v]) => [
      { text: k, options: { bold: true, color: C.text1, fontSize: 13 } },
      { text: v, options: { color: C.text2, fontSize: 13, align: "right" } },
    ]), { x: 0.5, y: 1.75, w: 9.0, colW: [5.6, 3.4], rowH: 0.36, border: { type: "solid", color: H.accent6, pt: 0.75 }, fill: { color: H.lt1 }, margin: [0.03, 0.08, 0.03, 0.08], fontFace: "+mn-lt" });
    s.addNotes("This slide is the whole deck. An investor is lending against these eight numbers, not against the farm story. If any blank is still blank, do not take the meeting.");
  }

  // 5 — The model
  {
    const s = content("The problem and the model", "The model we are copying never bought land");
    card(s, { x: 0.5, y: 1.35, w: 4.3, h: 3.3 });
    s.addText([
      { text: "Jacob's Ladder at Brookside Farm", options: { bold: true, fontSize: 16, breakLine: true } },
      { text: "Aurora, West Virginia — the program in the 2018 documentary Recovery Boys.", options: { fontSize: 12.5, breakLine: true } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "Six months residential, men. Daily farm work, mindfulness, 12-step, chores, structured community.", options: { fontSize: 12.5, breakLine: true } },
      { text: " ", options: { fontSize: 6, breakLine: true } },
      { text: "The farm is owned by the Utterback family. The program partners with them. It has never carried a mortgage.", options: { fontSize: 12.5, bold: true } },
    ], { x: 0.75, y: 1.5, w: 3.8, h: 3.0, color: C.text1, margin: 0, isTextBox: true, valign: "top" });
    const x = 5.3, w = 4.2;
    await iconRow(s, { icon: "FiKey", glyph: "1", x, y: 1.45, w, head: "Year one — lease", body: "Six to eight beds in a leased house. License it. Fill it. This is done before anyone is asked for money." });
    await iconRow(s, { icon: "FiHome", glyph: "2", x, y: 2.6, w, head: "Year two — own", body: "Buy the farmhouse with the ask on slide 2. Move the licensed house onto it. 10–14 beds." });
    await iconRow(s, { icon: "FiSun", glyph: "3", x, y: 3.75, w, head: "Year three — farm", body: "Cottages, greenhouses, livestock. Grants to a nonprofit arm, which by then has a two-year record." });
    s.addNotes("The point of the left card: the most famous program of this kind runs on someone else's land. We are not asking for money to copy a model; we are asking for money to own what that model rents.");
  }

  // =====================================================================
  pres.addSection({ title: "The property" });

  // 6 — Why rural PA, why unzoned
  {
    const s = content("The property", "Build where there is no hearing to survive");
    stat(s, { x: 0.5, y: 1.4, w: 2.8, value: "822", label: "Pennsylvania municipalities with no zoning ordinance at all" });
    stat(s, { x: 3.6, y: 1.4, w: 2.8, value: "34%", label: "of rural PA municipalities are zoned. Southeast PA: 99%." });
    stat(s, { x: 6.7, y: 1.4, w: 2.8, value: "0", label: "county zoning ordinances in Wyoming County. Meshoppen Twp is unzoned." });
    const w = 4.3;
    await iconRow(s, { icon: "FiCheckCircle", glyph: "✓", x: 0.5, y: 3.1, w, head: "No variance, no neighbor petition", body: "Unzoned means by-right. The state building code and DEP sewage rules still apply; the political fight does not exist." });
    await iconRow(s, { icon: "FiShield", glyph: "S", x: 5.2, y: 3.1, w, head: "The Fair Housing Act is the backstop", body: "People in recovery are a protected class. U.S. v. Township of Cheltenham; Janush v. Upper Southampton. A township that refuses pays." });
    s.addNotes("The 822 figure is DCED's. An investor who owns rural PA property will know what a zoning hearing costs in time. Lead with that.");
  }

  // 7 — The property
  {
    const s = content("The property", "Three live comparables, October 2026");
    const hdr = (t) => ({ text: t, options: { bold: true, color: H.lt1, fill: { color: H.accent1 }, fontSize: 11.5 } });
    const cell = (t, o = {}) => ({ text: t, options: { fontSize: 11.5, color: C.text1, ...o } });
    const rows = [
      [hdr("Property"), hdr("Acres"), hdr("Structures"), hdr("Asking"), hdr("Zoning"), hdr("Fit")],
      [cell("Meshoppen, Wyoming Co.", { bold: true }), cell("54"), cell("Farmhouse + barn, both need work"), cell("$275,000", { align: "right" }), cell("Township unzoned; no county zoning"), cell("Best price per acre. Rehab is the question.")],
      [cell("Granville Summit, Bradford Co.", { bold: true }), cell("28"), cell("1876 farmhouse, 8 bed / 2 bath, 3,431 sq ft, barn, silos"), cell("Not shown", { align: "right" }), cell("Verify township"), cell("8 bedrooms = 10–14 beds licensed on day one.")],
      [cell("Rome, Bradford Co.", { bold: true }), cell("30.5"), cell("Barn, corn cribs, stream. No house."), cell("$175,000", { align: "right" }), cell("Verify township"), cell("Cheapest acreage. Needs a house built.")],
    ];
    s.addTable(rows, { x: 0.5, y: 1.35, w: 9.0, colW: [1.9, 0.6, 2.4, 0.95, 1.55, 1.6], rowH: 0.62, border: { type: "solid", color: H.accent6, pt: 0.75 }, margin: [0.04, 0.07, 0.04, 0.07], valign: "middle", fontFace: "+mn-lt" });
    s.addText("Asking prices as listed; none has had a perc test, title search, or Clean & Green check. Every parcel runs the four kill tests in the land file before an offer. Listings go stale in days.",
      { x: 0.5, y: 4.15, w: 9.0, h: 0.6, fontSize: 10.5, italic: true, color: C.accent3, margin: 0, isTextBox: true });
    s.addNotes("These are the three in the repo land file. By the meeting, replace with whichever is under agreement. The Granville Summit house is the one to chase: eight bedrooms is the whole business case.");
  }

  // =====================================================================
  pres.addSection({ title: "The numbers" });

  // 8 — Use of funds (native chart)
  {
    const s = content("The numbers", "Where $139K goes");
    s.addChart(pres.ChartType.bar, [
      { name: "Use of funds", labels: ["Down payment (25%)", "Rehab to Ch. 717", "Closing", "Beds and furnishing"], values: [68750, 60000, 6000, 4000] },
    ], {
      x: 0.5, y: 1.35, w: 5.6, h: 3.6, barDir: "bar",
      chartColors: [H.accent1], showLegend: false,
      showTitle: false,
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$#,##0", dataLabelFontSize: 11, dataLabelColor: H.dk1, dataLabelFontFace: "+mn-lt",
      catAxisLabelFontSize: 11, catAxisLabelColor: H.dk1, catAxisLabelFontFace: "+mn-lt", catGridLine: { style: "none" },
      valAxisLabelFontSize: 9, valAxisLabelColor: H.accent3, valAxisLabelFontFace: "+mn-lt", valAxisLabelFormatCode: "$#,##0", valGridLine: { color: H.accent6, size: 0.5 },
      valAxisMinVal: 0, valAxisMaxVal: 80000,
    });
    stat(s, { x: 6.5, y: 1.4, w: 3.0, value: "$138,750", label: "midpoint of the $119–159K range. Rehab is the swing: $40–80K until a contractor walks the house.", size: 30 });
    s.addText([
      { text: "Based on the Meshoppen comparable at $275,000.", options: { breakLine: true } },
      { text: "Down payment assumes a 75% LTV first mortgage or seller carry on the balance.", options: { breakLine: true } },
      { text: "Rehab is to the § 717.29 standard — egress, 60 sq ft per resident, water under 120°F — not to a magazine.", options: {} },
    ], { x: 6.5, y: 3.0, w: 3.0, h: 1.9, fontSize: 11, color: C.text1, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 4 });
    s.addNotes("Rehab is the only line that moves. Get a contractor through the house before the meeting and replace $60,000 with the bid.");
  }

  // 9 — Unit economics (native chart)
  {
    const s = content("The numbers", "Ten beds carry the house");
    s.addChart(pres.ChartType.bar, [
      { name: "Net resident revenue", labels: ["Low case", "High case"], values: [5215, 6290] },
      { name: "Total monthly cost", labels: ["Low case", "High case"], values: [3890, 5240] },
    ], {
      x: 0.5, y: 1.35, w: 5.3, h: 3.6, barDir: "col", barGrouping: "clustered",
      chartColors: [H.accent1, H.accent5], showLegend: true, legendPos: "b", legendFontSize: 10, legendColor: H.dk1, legendFontFace: "+mn-lt",
      showTitle: false,
      showValue: true, dataLabelPosition: "outEnd", dataLabelFormatCode: "$#,##0", dataLabelFontSize: 10.5, dataLabelColor: H.dk1, dataLabelFontFace: "+mn-lt",
      catAxisLabelFontSize: 11, catAxisLabelColor: H.dk1, catAxisLabelFontFace: "+mn-lt", catGridLine: { style: "none" },
      valAxisLabelFontSize: 9, valAxisLabelColor: H.accent3, valAxisLabelFontFace: "+mn-lt", valAxisLabelFormatCode: "$#,##0", valGridLine: { color: H.accent6, size: 0.5 },
      valAxisMinVal: 0, valAxisMaxVal: 7000,
    });
    stat(s, { x: 6.2, y: 1.4, w: 3.3, value: "$1,050–1,325", label: "net per month at 10 beds, after the mortgage and before the investor is paid.", size: 28 });
    s.addText([
      { text: "Revenue: 10 beds at $145–$175/week, less a 17% collection haircut. Comps: Just4Today $145, Cifelli $140, R3 Lancaster $195.", options: { breakLine: true } },
      { text: "Cost includes the $206K mortgage at 7.5%/30 yr ($1,440), taxes, insurance, utilities, a live-in manager, and a maintenance reserve.", options: { breakLine: true } },
      { text: "Breakeven is 8–9 beds. Structure A's $1,043/mo interest leaves $7–282 at 10 beds; beds 11 and 12 add $520–630 each. The house we run today is the proof the fill rate holds.", options: { bold: true } },
    ], { x: 6.2, y: 2.9, w: 3.3, h: 2.15, fontSize: 10.5, color: C.text1, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 4 });
    s.addNotes("The cost bars already include the mortgage. Net after everything is $1,050 to $1,325 — and Structure A's interest-only payment is $1,043, so at ten beds the investor is covered with almost nothing to spare. Say that before they do. The eleventh and twelfth beds are the cushion: $520 to $630 a month each. Farm revenue, Harvest Hosts hosting, and grants to the nonprofit arm are upside, not in these bars.");
  }

  // 10 — Proposed terms
  {
    const s = content("The numbers", "Two ways to structure it");
    card(s, { x: 0.5, y: 1.35, w: 4.35, h: 3.3 });
    card(s, { x: 5.15, y: 1.35, w: 4.35, h: 3.3 });
    s.addText([
      { text: "A — Seller carries, investor opens", options: { bold: true, fontSize: 15, color: C.text2, breakLine: true } },
      { text: " ", options: { fontSize: 5, breakLine: true } },
      { text: "Seller finances $206K at 7.5% over 30 years.", options: { bullet: true, breakLine: true } },
      { text: "Investor lends $139K for down payment, closing, rehab, beds.", options: { bullet: true, breakLine: true } },
      { text: "Interest-only at 9% for 5 years — $1,043/mo — balloon at year 5. Covered at 10 beds; cushioned at 12.", options: { bullet: true, breakLine: true } },
      { text: "Second lien on the property plus personal guarantee.", options: { bullet: true, breakLine: true } },
      { text: "Exit: refinance into a USDA Community Facilities loan once the nonprofit arm has a two-year record, or sale.", options: { bullet: true } },
    ], { x: 0.75, y: 1.5, w: 3.85, h: 3.3, fontSize: 12, color: C.text1, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 5 });
    s.addText([
      { text: "B — Investor owns, we operate", options: { bold: true, fontSize: 15, color: C.text2, breakLine: true } },
      { text: " ", options: { fontSize: 5, breakLine: true } },
      { text: "Investor buys the property outright — the Brookside structure.", options: { bullet: true, breakLine: true } },
      { text: "Nye Recovery LLC leases it at a rate that covers the investor's debt service plus a margin.", options: { bullet: true, breakLine: true } },
      { text: "Option to purchase at year 5 at appraised value.", options: { bullet: true, breakLine: true } },
      { text: "Rehab funded from operations and settlement grants to the nonprofit arm.", options: { bullet: true, breakLine: true } },
      { text: "Investor holds title throughout. Lowest risk to them; slowest equity for us.", options: { bullet: true } },
    ], { x: 5.4, y: 1.5, w: 3.85, h: 3.3, fontSize: 12, color: C.text1, margin: 0, isTextBox: true, valign: "top", paraSpaceAfter: 5 });
    s.addNotes("Do not pick for them. Structure A is what a private lender wants; Structure B is what a seller who loves the farm wants. The 9% in A is a proposal — the market for private second-lien money is 9 to 12. Say so.");
  }

  // =====================================================================
  pres.addSection({ title: "Risk and timeline" });

  // 11 — Risks
  {
    const s = content("Risk and timeline", "What goes wrong, and what we do first");
    const w = 9.0;
    const risks = [
      ["FiUser", "1", "No credible house manager", "This business is the person living in it. Mitigation: the manager is hired and running the leased house for six months before this ask. Their name is on slide 4."],
      ["FiMapPin", "2", "The township pushes back", "Mitigation: buy unzoned. Where that fails, the FHA reasonable-accommodation letter goes to the township the day the lease is signed — before a complaint, not after."],
      ["FiUsers", "3", "The house sits under nine beds", "Mitigation: breakeven is eight to nine beds, not fourteen. The leased house's fill curve is the forecast. If month four is under four residents, we do not come to this meeting."],
    ];
    let y = 1.4;
    for (const [icon, glyph, head, body] of risks) {
      await iconRow(s, { icon, glyph, x: 0.5, y, w, head, body, headSize: 15, bodySize: 12 });
      y += 1.15;
    }
    s.addNotes("Investors trust the deck that names its own kill condition. Say the month-four number out loud.");
  }

  // 12 — Timeline
  {
    const s = content("Risk and timeline", "From the house we have to the farm we want");
    const steps = [
      ["Now", "Leased 6–8 bed house open, private-pay, DDAP application filed"],
      ["Month 6", "License issued. Six residents. SCA referring. This deck is current."],
      ["Month 9", "Property under agreement. Perc, title, Clean & Green cleared. Close with this raise."],
      ["Month 12", "Licensed house moves to the farm. 10 beds."],
      ["Month 18", "Nonprofit arm formed. First settlement grant. Farm producing."],
      ["Year 3", "Cottages. USDA refinance. Investor exit."],
    ];
    const n = steps.length, x0 = 0.5, total = 9.0, gap = 0.12, bw = (total - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * (bw + gap);
      const fill = i < 2 ? C.accent1 : C.background2;
      const txt = i < 2 ? C.background1 : C.text1;
      s.addShape(pres.ShapeType.roundRect, { x, y: 1.95, w: bw, h: 0.55, rectRadius: 0.06, fill: { color: fill }, line: { color: fill, width: 0 } });
      s.addText(steps[i][0], { x, y: 1.95, w: bw, h: 0.55, fontSize: 13, bold: true, color: txt, align: "center", valign: "middle", margin: 0, isTextBox: true });
      s.addText(steps[i][1], { x, y: 2.65, w: bw, h: 1.1, fontSize: 10.5, color: C.text1, align: "left", valign: "top", margin: 0, isTextBox: true });
    }
    s.addText("Dark markers are done or in motion today. Everything after month 6 waits on the house hitting its numbers.",
      { x: 0.5, y: 3.85, w: 9.0, h: 0.4, fontSize: 11, italic: true, color: C.accent3, margin: 0, isTextBox: true });
    s.addNotes("Walk it left to right. The first two markers are the only ones we control alone; the rest depend on the census.");
  }

  // 13 — Close
  {
    const s = pres.addSlide({ masterName: "DARK", sectionTitle: "Risk and timeline" });
    s.addText("The house proves it. The farm scales it.", { placeholder: "title" });
    s.addText([
      { text: "Rob Nye  ·  Nye Recovery LLC", options: { breakLine: true, bold: true } },
      { text: "nyeaisolutions@gmail.com  ·  (267) 406-5597", options: { breakLine: true, fontSize: 14, color: C.accent5 } },
      { text: "Full package: github.com/Kustom665/recoery_homestead", options: { fontSize: 12, color: C.accent5 } },
    ], { placeholder: "body" });
    s.addNotes("Close by asking for the site visit, not the money. An investor who has stood in the house we run will fund the farm.");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
