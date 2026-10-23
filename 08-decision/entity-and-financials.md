# Entity Structure and the Financials Under Each

You asked about S-corp and LLC. The honest answer is that the entity question
is not a tax question yet. It is a **"do you want to own it, or do you want the
government's money"** question, and the two are mostly exclusive. Pick the
ownership answer first; the tax election follows.

---

## The four structures

### 1. Single-member LLC (plain, taxed as disregarded entity)

- **What it is:** a PA LLC, you are the only member, profit flows to your
  Schedule C. $125 to file. Liability shield between the house and your
  personal assets, provided you keep books and a separate account.
- **Unlocks:** nothing from government. Resident fees, private pay, Harvest
  Hosts host revenue, farm sales.
- **Locks out:** opioid settlement grants, DDAP grants, USDA CF, PHARE, SAMHSA,
  CDBG, HUD, tax-deductible donations. All of `06-money` Tier 1 and Tier 2.
- **You own:** everything. You can sell it.
- **Right for:** Path C in `ceo-decision.md`. Day one.

### 2. LLC with S-corp election

- **What it is:** the same LLC, with IRS Form 2553 filed so it is taxed as an
  S corporation. You pay yourself a "reasonable salary" through payroll and
  take the rest as distributions, which skip self-employment tax.
- **The math:** SE tax is 15.3% on the first ~$168k of Schedule C profit. If
  the house nets $40,000 and a reasonable salary for running it is $25,000, the
  S-election saves roughly 15.3% × $15,000 ≈ **$2,300/yr**. Against that: payroll
  service ($50–$100/mo), a separate 1120-S return ($800–$1,500/yr), and
  quarterly filings.
- **When it pays:** net profit above roughly **$40,000–$60,000/yr**. Below
  that the overhead eats the savings.
- **Right for:** year two, once the house clears $40k net. Not day one. A
  start-up with no profit gains nothing from the election and takes on payroll
  obligations.
- **Unlocks / locks out:** identical to #1. The S-election changes tax, not
  eligibility.

### 3. 501(c)(3) nonprofit corporation

- **What it is:** a PA nonprofit corporation with an IRS determination letter.
  A board of directors controls it. You can be a paid employee (executive
  director) at a reasonable salary.
- **Unlocks:** every government source in `06-money`, foundation grants,
  tax-deductible donations, DDAP's grant rounds, USDA CF (eventually), PHARE.
- **Locks out:** ownership. You cannot sell it, take distributions, or
  transfer its assets to yourself. If it winds down, assets go to another
  charity.
- **Timeline:** 3–6 months to determination letter (Form 1023-EZ if under the
  $50k/yr revenue projection threshold — which Path C is in year one).
- **Right for:** the compound in `04-architecture`, which only pencils with
  grants. Year two or three.

### 4. The hybrid — your LLC owns the land, a nonprofit runs the program

- **What it is:** two entities. Your LLC buys the farmhouse and acreage. A
  501(c)(3) leases it at fair-market rent and operates the recovery program,
  takes the grants, and holds the DDAP license.
- **Why people do it:** you build equity in real estate that the grants are
  paying rent on. The nonprofit gets the funding stack.
- **The trap:** if you control the nonprofit's board and set the rent, the IRS
  calls that **private inurement** and can pull the exemption. The rent has to
  be demonstrably arm's-length (an appraisal), the board has to be independent
  of you (you can sit on it, you cannot control it), and the lease has to be
  one a stranger would sign. **This is attorney-designed or it is not done.**
- **The other trap:** grants to the nonprofit **cannot buy land for your LLC**.
  The LLC still needs its own capital to acquire. The hybrid solves the
  operating-money problem, not the down-payment problem.
- **Right for:** Path B, once there is a track record and a down payment.

---

## The recommendation on structure

**Day one: single-member LLC, nothing else.** $125. It is the vehicle for
Path C and it is reversible — an LLC can later elect S-corp, and a nonprofit
can be formed alongside it at any time.

**Month 6, if the house is at six residents:** form the 501(c)(3) in parallel.
Two reasons. First, the DDAP grant rounds (F4 in `ceo-decision.md`) fund
existing operators, and by then you are one. Second, the Pennycuick bill, if it
passes, puts every house under DDAP, and DDAP's money flows to nonprofits.

**Year two, if net clears $40k:** S-election on the LLC.

**Do not form the nonprofit first.** It costs you ownership, takes 3–6 months,
and its only advantage — grants — is unavailable to an organization with no
operating history (F4, F5).

---

## Three pro-formas

All figures are modeled ranges from the comparables in `ceo-decision.md`
section 2. Replace with quotes before relying on any line.

### Pro-forma 1 — Path C, LLC, leased house, 6–8 beds

**Monthly, steady state (month 5+)**

| Line | Low | High |
| --- | --- | --- |
| Resident fees, gross | 6 × $628 = $3,770 | 8 × $758 = $6,064 |
| Collection haircut (−17%) | −$641 | −$1,031 |
| **Net revenue** | **$3,129** | **$5,033** |
| Rent | $1,200 | $2,000 |
| Utilities (heat, electric, water, internet) | $350 | $550 |
| Insurance (GL, amortized) | $200 | $500 |
| House manager stipend (plus free room) | $500 | $1,000 |
| Supplies, detectors, naloxone restock | $100 | $150 |
| Vehicle | $200 | $400 |
| Bookkeeping, Square fees | $100 | $200 |
| **Total cost** | **$2,650** | **$4,800** |
| **Net** | **$479** | **$233** |

Read that bottom line honestly: at the low end of revenue and low end of cost,
or the high end of both, **the house clears a few hundred dollars a month.** The
spread opens up when you hold cost at the low end and revenue at the high end
— **$5,033 − $2,650 = $2,383/mo** — which is what a well-run house in a cheap
county does. The business is in the cost discipline, not the price.

**Breakeven: 5 residents at $145/wk** against low-end costs. **4 residents**
does not cover rent and manager.

**Year one cash:** −$8–16k startup, +$0–3k net by month 6, roughly **−$5k to
+$8k** by month 12 depending on fill speed. This is not a year-one income. It
is a year-one proof.

### Pro-forma 2 — Path B, LLC owns the farmhouse

**Acquisition** — using the Meshoppen comparable ($275k, 54 ac, fixer)

| Line | Amount |
| --- | --- |
| Purchase | $275,000 |
| Down payment (25%) | $68,750 |
| Closing | $6,000 |
| Rehab to Ch. 717 + habitable | $40,000–$80,000 |
| Beds and furnishing (12) | $4,000 |
| **Cash to open** | **$119,000–$159,000** |

**Monthly, steady state, 10 beds**

| Line | Low | High |
| --- | --- | --- |
| Net resident fees (10 beds, −17%) | $5,215 | $6,290 |
| Mortgage, $206k at 7.5%/30yr | $1,440 | $1,440 |
| Property tax + insurance | $450 | $700 |
| Utilities | $500 | $800 |
| House manager | $800 | $1,200 |
| Maintenance reserve | $300 | $500 |
| Supplies, vehicle, books | $400 | $600 |
| **Net** | **$1,325** | **$1,050** |

Plus a farm that can host Harvest Hosts guests (claimed $13–15k/yr, unverified
for a recovery property) and sell at a stand — both of which trigger the FLSA
review in `00-START-HERE.md` if residents do the work.

**The problem is the first line of the acquisition table.** $119–159k cash.
That is why this is year two, and why the pitch deck exists.

### Pro-forma 3 — Path A, 501(c)(3), the compound

This is `06-money/budget-model.md`: $1.29–2.90M capital, $299–507k/yr
operating at 16 residents, funded by grants. Two corrections from this round:

- Delete "USDA Community Facilities loan" from Phase 0. It is a year-two-plus
  source for an organization with revenue history and a feasibility study.
- Delete "SCA contract / per-diem as the backbone." It is unverified. The
  operating backbone is **grants + resident fees**, which makes the operating
  budget a fundraising budget, not a business.

Nothing else in that model is wrong. It is the right budget for the wrong year.

---

## What the pitch deck is for, under each structure

- **LLC (Paths B, C):** an **investor or seller-finance** deck. Audience: a
  private individual with $100–150k who wants a secured return on rural real
  estate with a social story, or a farmhouse seller who would carry paper.
  Ask: $120–160k for the down payment and rehab, secured by the property.
- **501(c)(3) (Path A):** a **funder** deck. Audience: county opioid settlement
  committee, DDAP, PHARE reviewers, foundations. Ask: $250–500k capital grant
  against a track record.
- **Hybrid:** both decks, sequenced — investor deck funds the LLC's purchase,
  funder deck funds the nonprofit's operations.

These are different documents with different numbers on every slide. The
structure decision comes first.
