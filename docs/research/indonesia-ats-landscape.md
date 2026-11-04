# Indonesian SME Recruitment / ATS Landscape & Price Anchors

Research for [issue #6](https://github.com/nazabrory/recruitmentapp/issues/6). Compiled 2026-11-04.
Currency conversion used throughout: **Rp 18,140 / USD** (open.er-api.com spot rate, 4 Nov 2026).

**Method.** Vendor pricing/product pages fetched directly where possible (see Sources). Several Indonesian vendor pages render prices client-side only (Next.js/JS shells); where exact numbers could not be read from the page source, that is stated rather than filled in from memory. A search-engine quota cut short a few name verifications; unresolved ticket names are flagged as unconfirmed rather than guessed.

---

## 1. Name verification (ticket asks us to check)

| Ticket name | Verdict | Evidence |
|---|---|---|
| Glints | ✅ Real; Indonesia flagship platform | glints.com, LinkedIn "No.1 recruitment platform in Indonesia" |
| Kalibrr | ✅ Real; PH-founded, active in ID via kalibrr.id | kalibrr.com, kalibrr.id |
| Dealls | ✅ Real, **at dealls.com** (`dealls.id` is a parked domain for sale) | dealls.com/pasang-loker-gratis; YC W22 company page |
| Ekrut | ✅ Real (EKRUT, tech-talent marketplace) | ekrut.com/employers |
| Gadjian / Mekari Tandem | ✅ Gadjian was merged into **Mekari Talenta** (flagship ID HRIS); no live standalone "Tandem recruitment" product found | talenta.co/harga; Gadjian-branded apps under PT Fatiha Sakti (iTunes lookup) |
| LINOS | ⚠️ HRIS vendor exists in memory but `linos.co.id` / `linos.id` did not resolve from the research network; pricing never public → treated as peripheral, unverified | curl result 000 |
| Humanic | ⚠️ Not confirmed (closest found: "Humanica SAB" app, unrelated-looking). No evidence of an SME recruitment product | iTunes search |
| Naker / E-HI | ⚠️ `naker.go.id` unreachable from research network (.go.id sites often IP-restrict foreign traffic). No evidence any Kemnaker system sells recruitment software to SMEs; treat as free government channel at most, not a competitor | curl result 000 |
| Emerge, Q360, Empane, Glints Flip, Sribu | ❌ Not verifiable as Indonesian recruitment products. `empane.com`, `glintsflip.com`, `q360.id` dead; Sribu is a design-contest marketplace, not recruitment | curl checks |
| "Erecruit" | ⚠️ `erecruit.co` is **graylink Neptune**, a South-African enterprise ATS (clients: PwC ZA, Nando's, Exxaro) — not an Indonesian SME player. Do not use as competitor. Notably, its FAQ admits enterprise ATS deployment takes "a couple of days to a couple of months" | graylink.biz (fetched) |
| JobStreet / TalentBank | ✅ JobStreet Indonesia is now **SEEK Employer Indonesia** (id.employer.seek.com); "TalentBank" branding not seen on the ID employer site | id.employer.seek.com (fetched) |
| Workable, BambooHR, Zoho Recruit | ✅ Global tools sold into Indonesia (USD pricing, no IDR rails) | vendor pricing pages (fetched) |

Additional real players found that the ticket did *not* list: **KitaLulus** (mass entry-level hiring), **Cake** (VN platform with public USD ATS packages for ID), **Klob** (recruitment + online assessment), **Talentics** (ATS + assessment), **Mekari Talenta** ATS module, graylink/Neptune-style enterprise ATS (South African, present in ID enterprise deals).

## 2. Landscape: who serves Indonesian SMEs

### Local platforms (job board + ATS hybrids)

- **Glints** (glints.com / employers.glints.com) — free basic posting, "unlimited job postings & applicants, AI-powered matching, built-in ATS; publish in minutes" (own homepage). Monetization via paid boosts ("Job Boost", "Glints VIP", CV Finder — help.glints.com articles) and annual **Subscription Recruitment** packages. Managed recruitment + EOR upmarket: TalentHub EOR flat **S$399/month** (talenthub.glints.com).
- **JobStreet by SEEK** (id.employer.seek.com) — Indonesia's highest-reach board. Now **free job postings** ("Mulai rekrutmen… pasang iklan loker gratis, jangkau 20 juta+ kandidat") with paid sponsorship/boost, "Ad Budget" discount contracts, Talent Search (Basic tier free), and AI "Assist" (pre-screening, reference checks) + Personalised Targeting sold alongside. Product list fetched from the employer Product Hub; **no published IDR rate card** — quotes via sales.
- **Dealls** (dealls.com, YC W22) — job portal + ATS, startup/digital & early-career focus; free posting incl. unlimited LinkedIn syndication, "screen CV menggunakan AI" (own site). Employer monetization = two tabs on their pricing page: **"Job Credit — Bayar per job posting"** and **"Subscription — Bayar per bulan, unlimited job post"**; the actual numbers are gated ("Ask for Pricing Now!"). Their demo-promo copy values **2 ATS credits ≈ Rp 699K** (≈ Rp 350K/credit implied) — seen in the pricing page source. Sister product: KantorKu HRIS (kantorku.id).
- **Kalibrr** (kalibrr.com / kalibrr.id) — board + ATS + employer branding + EOR. Pricing page model: "Choose your number of **job slots** and subscription length. Lower your cost per job as you hire more" (numbers render client-side; not captured). Free tier exists ("Kalibrr Free" hiring workspace, kalibrr.id blog). EOR marketing site advertises Recruitment (ATS) "starts at $99/employee per month" (kalibrr-eor.com).
- **KitaLulus** (id.kitalulus.com) — the mass/entry-level board: **100% free job posting**, no admin fee or tokens (employer FAQ), "5 minutes to post", claims 11 juta candidate reach and 3M+ applications/month (own pages / Play listing). Positioning = fresh-grad, SMA/SMK, retail/F&M/ops roles.
- **EKRUT** (ekrut.com/employers) — tech-talent marketplace ("top 5% tech talents"), "Subscribe now and enjoy **unlimited hires at low cost**" — subscription, quote-gated, engineering/product roles only.
- **Cake** (cake.me/pricing/ats?locale=id) — VN-origin, active ID storefront with **public USD prices**: Job Posting **US$150**, Talent Search **US$180/mo** (annual discount US$540/yr) — search snippet from the live page (page itself renders via JS).
- **Karir.com** — legacy domestic board; employer page currently returns "Halaman Tidak Tersedia" (fetched) — active but opaque; treat as quote-only.

### HRIS-bundled recruitment (sold on per-employee subscriptions)

- **Mekari Talenta** (talenta.co, formerly Gadjian; "35,000+ businesses") — payroll/BPJS/PPh21-first HRIS. Recruitment (ATS) is a feature of the HCM stack: **Essential & Plus plans get only 5 active jobs; unlimited ATS + Manpower Planning only in the top "Talenta 360" plan; CV Parsing and AI Candidate Scoring are paid add-ons** (own pricing/feature-comparison page, fetched). A **modular "Recruitment" solution** can be bought without the full HCM ("without subscribing to Mekari Talenta HCM") — but all numbers are WhatsApp-sales-gated. → HRIS-bundled, per-employee/month, recruitment is the upsell.
- **LINOS / Humanica / Naker-E-HI** — unverified (see §1); no public recruitment price anchors found.

### Global tools commonly used by Indonesian startups/SMEs

- **Workable** (workable.com/pricing, fetched): Standard **US$299/mo** (1–20 employees, annual list $3,588/yr; −20% on annual), Premier $599/mo, Enterprise $719/mo. Per-post is unlimited-jobs by headcount tier, not per-job. Add-ons priced separately: Texting +$89, Video interviews +$109, Assessments +$59/mo. AI: 3,000 credits included, then **$0.12/credit — 1 credit per candidate screened**, 2 per sourced profile. UI in 9 languages (Bahasa Indonesia not among the localized employer languages marketed).
- **BambooHR** (bamboohr.com/pricing, fetched): per-employee/month ($10–25) with a **flat floor for ≤25 employees: US$250/mo Core, $425 Pro, $650 Elite**; hiring included as an HRIS module (5/25/50 job openings by tier). Payroll add-on is explicitly **US-employees-only** → in Indonesia it's HR/ATS-lite only, USD-billed, quote-gated.
- **Zoho Recruit** (zoho.com/recruit/pricing.html, fetched in ID locale): **forever-free plan (1 active job)** for solo recruiters, then Standard/Professional/Enterprise **billed per user per month** (add-ons "/lisensi/bulan"; AI matching & background checks in Professional; "high-volume hiring" in Enterprise). Exact figures render client-side; Zoho bills in USD/INR-style per-license tiers, with a 15-day trial and 45-day refund — the low-cost global fallback.

## 3. How each charges (model map)

| Vendor | Model | Public numbers? | Anchor if known |
|---|---|---|---|
| JobStreet/SEEK ID | Free post + paid boosts/ad-budgets, sales quotes | ❌ | — |
| Glints | Free post + credits (Job Boost/VIP) + **annual subscription by job-slot count** | brochure | 2024 ID brochure: Standard free (5 listings), **Growth Rp 14,400,000 (10), Scale Rp 24,000,000 (20 job posts/12 mo), Unlimited Rp 52,800,000** ⇒ ≈ Rp 1.2–1.44 jt per job post; promo math in brochure shows Rp 3.6 jt ÷ 20 posts = **Rp 180K/post at promo** (scribd.com/document/725770251) |
| Dealls | **Per-job-post "credits"** + monthly unlimited subscription (ATS sales-gated) | partial | 2 credits ≈ Rp 699K implied per their own demo promo copy |
| Kalibrr | Job-slot × subscription-length; free workspace tier | ❌ (JS) | "cost per job" decreasing w/ volume |
| KitaLulus | Free (monetized elsewhere) | n/a | Rp 0 |
| Ekrut | Subscription "unlimited hires" | ❌ | — |
| Cake | Per-product packages (posting vs ATS vs search) | ✅ USD | US$150–180/mo |
| Mekari Talenta | Per-employee/month HRIS; ATS gated to top plan; CV-parse/AI-score add-ons; modular Recruitment SKU | ❌ | quote-only |
| Workable | Per-headcount/month bundle + add-on modules + **AI credits $0.12 (1/screen)** | ✅ USD | US$299–719/mo |
| BambooHR | Per-employee/month, flat floor ≤25 staff | ✅ USD | US$250–650/mo flat |
| Zoho Recruit | Per-user/month tiers; free 1-job plan | page JS | low-cost global |

## 4. What SMEs actually complain about (evidence-based)

Direct review-mining was partly blocked from the research network (Trustpilot and Play Store return bot pages; app-store *aggregate* ratings were captured via the iTunes API instead). Defensible findings:

1. **Pricing is sales-gated in every local player.** Dealls "Ask for Pricing Now!", JobStreet via sales, Kalibrr via form, Mekari via WhatsApp, Klob/Talentics demo-first. Self-serve IDR checkout with a visible price is essentially absent — Glints' brochure and Cake's USD cards are the exceptions. (All fetched.)
2. **Per-employee licensing makes recruitment a headcount tax.** Mekari Talenta gates ATS to plans priced per employee and sells AI scoring as an add-on; a competitor comparison states bluntly that with Talenta "hiring functionality requires per-employee licences across your entire company headcount," and that companies run a separate ATS next to it (noticescale.com/vs/talenta — vendor-compare page, treat as directed criticism but structurally corroborated by Mekari's own feature table).
3. **Global tools bill in USD and ignore Indonesian payroll/Bahasa.** Workable/BambooHR/Cake/Zoho show only USD (no IDR price, no QRIS/bank invoice). BambooHR payroll = "US employees only". Workable lists 9 UI languages — not ID-first. At Rp 18,140/USD, Workable Standard = **≈ Rp 5.4 jt/month ≈ Rp 65 jt/year** before add-ons.
4. **Job boards solve sourcing, not evaluation.** Free/cheap posting (SEEK, KitaLulus, Glints) ends at the applicant pile; evaluation runs on the employer's own tools. The "candidate quality / messy funnel" complaint shows up even in neutral rankings: aggregators get "variable applicant quality" (KitaLulus/JobStreet cons), newer platforms' weakness lists cite admin tooling being "less modern than newer entrants" (mixwork.co 2026 rankings).
5. **Manager-side apps rate visibly worse than candidate-side apps.** App Store aggregates: consumer job apps — JobStreet 4.90 (143,881), Glints 4.87 (98,927), KitaLulus 4.85 (32,892), Kalibrr 4.65 (7,995); the HRIS/admin app **Mekari Talenta: 3.90 (5,695)** and Hadirr (attendance) 3.33 (309). (iTunes lookup API, 4 Nov 2026; one-directional signal of admin-tool friction, not proof of cause.)
6. **Setup time is an enterprise problem.** The one enterprise ATS in scope (graylink Neptune) openly says full deployment "can take from a couple of days to a couple of months" including business analysis and configuration (fetched FAQ).

## 5. Who serves "recruitment campaign" buyers today

- **Mass blue-collar / field / retail & F&B expansion:** KitaLulus (free posting, SMA/SMK & fresh-grad positioning, 3M+ applications/month), JobStreet free-post + boost, Glints TapLoker (100K+ active listings). Screening/shortlisting itself = manual or WhatsApp/Excel — no self-serve product found that packages a *campaign* (multi-location, multi-assessor) at SME prices. Enterprise mass-hire tooling (graylink/Neptune-style chatbot ATS) targets large employers with months-long deployments.
- **Graduate / fresh-grad programs:** Kalibrr (Top-50 employer programs), Glints (internship/early-career inventory + managed recruitment), Ekrut (tech grads); assessment centers are consultant-led and quote-based. Agency benchmark: success fees 15–25% of first-year salary; cost per junior hire from ~US$1,500 (~Rp 27 jt) (mixwork.co 2026; usemultiplier.com Indonesia cost-of-employment).
- **Per-campaign paid products that exist:** sponsored listings / "Job Boost" credits on the boards (Glints, SEEK) — i.e., **per-campaign spend exists as advertising**, roughly **US$150–500 per campaign** on localized boards in 2026 (mixwork.co, corroborates Cake's US$150 card) — but nobody sells a per-campaign *workflow* product (screening + tests + ballots + consolidation).

## 6. White space

No product found that combines, as a **flat-fee, one-off, per-campaign purchase with self-serve IDR payment**:

1. public application link + candidate-side Bahasa-first flow (Glints/Dealls free ATS are employer-login workspaces, not campaign storefronts);
2. **multi-assessor structured scoring** (ballots/deliberation — absent from every local board's free ATS; Mekari sells "AI candidate scoring" as an HRIS add-on, not ballot consolidation);
3. **AI screening briefs that stay human-decides** (SEEK Assist pre-screens inside the board funnel only; Workable AI credits price screening per candidate but bundle a full ATS at US$299/mo);
4. tests/FGD/interview scorecards in one funnel.

Closest adjacents: Dealls (AI CV screen, but subscription/credit-gated and sales-led), Mekari modular Recruitment (per-employee HRIS gravity), Workable (AI credits exist at $0.12/screen but USD subscription), boards' boost credits (reach without evaluation). The per-campaign workflow product appears **open**.

## 7. Pricing-anchor implications for our Campaign Subscription

Candidate anchors, with sources:

| Anchor | Number | Source |
|---|---|---|
| Local board per-campaign paid push | **US$150–500 (~Rp 2.7–9.1 jt)** per campaign | mixwork.co 2026 pricing table; Cake US$150 job-posting card |
| Glints effective price per job post | **Rp 180K–1.44 jt** (promo→regular, 2024 ID brochure) | scribd.com/document/725770251 |
| Workable entry ATS | **US$299/mo ≈ Rp 5.4 jt/mo ≈ Rp 65 jt/yr** (1–20 employees) | workable.com/pricing |
| BambooHR floor (≤25 staff) | **US$250/mo ≈ Rp 4.5 jt/mo** | bamboohr.com/pricing |
| Agency cost per junior hire | **~US$1,500 ≈ Rp 27 jt** | usemultiplier.com Indonesia |

**Defensible shape.** SMEs already pay ~Rp 2.7–9 jt to *get applicants* (board boosts) and Rp 4.5–5.4 jt *per month* for Western ATS subscriptions they must run annually. A **one-off campaign at Rp 1.5–5 jt (≈ US$80–275), with candidate caps of ~150–300 and paid overage of ~Rp 10–25K/candidate** sits: (a) under a typical board-campaign spend while including the evaluation workflow boards don't; (b) at 1–6% of the annual Workable/BambooHR entry cost for companies that hire intermittently; (c) far under the ~Rp 27 jt agency cost-per-junior-hire. The low end (Rp 500K–1 jt) fits pilot pricing since even Glints' promo per-post was ~Rp 180K — a campaign product bundling multiple posts + screening should clear that, not match it. Watch-out: **KitaLulus's 100%-free posting** means pure "reach" can't be our chargeable core — the campaign workflow, multi-assessor consolidation, and AI briefs must carry the price.

---

### Sources (fetched 4 Nov 2026 unless noted)

- workable.com/pricing · bamboohr.com/pricing · zoho.com/recruit/pricing.html
- glints.com (homepage) · help.glints.com articles 22675871261209, 26392704834457, 34305741921689, 30175248443033 · talenthub.glints.com · scribd.com/document/725770251 (Glints ID subscription brochure, 2024)
- dealls.com/pasang-loker-gratis & /pricing (page source incl. "Bayar per job posting" / "unlimited job post" / Rp699K≈2 credits promo copy)
- kalibrr.com/employers/pricing (nav & FAQ; figures client-rendered) · kalibrr.id blog "Kalibrr Free" · kalibrr-eor.com (search snippet)
- id.employer.seek.com/id (free posting) · id.employer.seek.com/id/products (Assist, Targeting, Basic Talent Search, reference checks)
- id.kitalulus.com/pasang-loker & /en/faq-employer-kitalulus (100% free)
- ekrut.com/employers ("unlimited hires at low cost") · cake.me/pricing/ats?locale=id (US$150/180 cards)
- talenta.co/en/pricing-subscription (ATS gating: 5 jobs Essential/Plus, unlimited Talenta 360; CV parsing & AI scoring add-ons; modular Recruitment; no public figures) · noticescale.com/vs/talenta (third-party comparison — directed criticism)
- employers.klob.id · talentics.id/product/ats (positions verified, pricing demo-gated)
- graylink.biz (erecruit.co → Neptune: enterprise ZA ATS; deployment "days to months")
- mixwork.co/blog/best-job-boards-indonesia (2026 third-party rankings: US$150–500/campaign, agency 15–25%, weaknesses list) · usemultiplier.com/indonesia/cost-of-employment (cost per hire $1,500+)
- iTunes Search API aggregates (JobStreet 4.90/143,881 · Glints 4.87/98,927 · KitaLulus 4.85/32,892 · Kalibrr 4.65/7,995 · Talenta 3.90/5,695) · open.er-api.com USD→IDR 18,140.25 (4 Nov 2026)
- Dead/unverified: dealls.id (parked, $3,500 ask) · empane.com · glintsflip.com · q360.id · linos(.co.)id · humanica.co.id · naker.go.id (network-blocked, inconclusive) · Sribu = design contests, not recruitment
