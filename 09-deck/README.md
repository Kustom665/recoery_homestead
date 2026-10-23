# 09 — Investor and Seller-Finance Deck

Thirteen slides. The ask is **$120–160K** to buy and open the year-two
farmhouse, secured by the property. Every number comes from Pro-forma 2 in
`../08-decision/entity-and-financials.md` and the comparables in
`../08-decision/land-candidates.md`.

**Do not show this deck yet.** It is written for spring 2027 at the earliest,
after the leased house has six months of numbers. Slide 4 is a table of blanks
for that reason: an investor is lending against those eight numbers, not
against the farm story.

## Files

| File | What it is |
| --- | --- |
| `recovery-homestead-investor-deck.pptx` | The deck. Open in PowerPoint, Keynote, or Google Slides. Speaker notes on every slide. |
| `recovery-homestead-investor-deck.pdf` | A render of the same deck for emailing. Rebuild it from the .pptx after any edit. |
| `build-deck.js` | Generates the .pptx. Edit the numbers here, not in PowerPoint, so the deck and the docs stay in step. |
| `apply_theme.js` | Writes the palette into the file's theme after the build. Required by `build-deck.js`. |
| `package.json` | The four Node packages the build needs. |

## The slides

1. **Title** — one line: a licensed recovery house becomes a working farm.
2. **The ask** — $120–160K, three reasons it is safe.
3. **Detox discharges people to nowhere** — the gap, in three numbers.
4. **What we run today** — eight blanks. Fill at month six.
5. **The model we are copying never bought land** — Jacob's Ladder, and the three-year plan.
6. **Build where there is no hearing to survive** — 822 unzoned municipalities, the FHA backstop.
7. **Three live comparables** — Meshoppen, Granville Summit, Rome. Replace with whatever is under agreement.
8. **Where $139K goes** — use of funds, bar chart.
9. **Ten beds carry the house** — revenue vs cost, low and high case, with the investor coverage spelled out.
10. **Two ways to structure it** — A: seller carries, investor funds the opening. B: investor owns, the LLC leases.
11. **What goes wrong, and what we do first** — three risks, three mitigations, the month-four kill condition.
12. **From the house we have to the farm we want** — timeline, now to year three.
13. **Close** — ask for the site visit, not the money.

## The one number to pressure-test

At ten beds the house nets **$1,050–1,325/mo** after the mortgage. Structure
A's proposed note — $139K interest-only at 9% — costs **$1,043/mo**. That
leaves **$7–282/mo**. Slide 9 says this out loud rather than hiding it, because
an investor will do the division in the room.

Three ways to widen it, any of which is a one-line change in `build-deck.js`:

- **Plan for twelve beds, not ten.** Beds 11 and 12 add $520–630/mo each; at
  twelve the cushion is $1,265–1,325/mo. The 8-bedroom comparable licenses to
  10–14.
- **Lower the rate.** 7% is $811/mo; 6% is $695/mo.
- **Lead with Structure B.** The investor owns the property and the LLC pays
  rent. No note to service.

## Before any meeting

- [ ] Fill every blank on slide 4 from the leased house's books.
- [ ] Replace slide 7 with the parcel under agreement, with the perc, title,
      and Clean & Green results.
- [ ] Replace the $60,000 rehab line on slide 8 with a contractor's bid.
- [ ] Pull the current county overdose rate for slide 3 (OverdoseFreePA).
- [ ] Confirm the entity name. "Nye Recovery LLC" is a placeholder until the
      LLC is filed.
- [ ] Decide the coverage question above.
- [ ] Rebuild, open the .pptx, and read every slide once more.

## Rebuilding

Needs Node 18 or newer.

```bash
cd 09-deck
npm install
node build-deck.js
```

Writes `recovery-homestead-investor-deck.pptx` in the same folder. To refresh
the PDF, export from PowerPoint, or with LibreOffice installed:

```bash
soffice --headless --convert-to pdf recovery-homestead-investor-deck.pptx
```

The icon pipeline (react-icons, sharp) is optional. If `sharp` fails to
install on your machine, the script prints a warning and draws lettered
circles in place of the icons; the deck still builds.
