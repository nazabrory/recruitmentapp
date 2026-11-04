# Research: QRIS payment rails for campaign subscriptions (Xendit vs Midtrans)

- **Ticket:** [#3](https://github.com/nazabrory/recruitmentapp/issues/3) · **Date:** 2026-11-04 · **Status:** done
- **Question:** What do Xendit, Midtrans, and one credible cheaper alternative offer for a SaaS selling one-off per-campaign subscriptions (IDR-priced) to Indonesian SMEs — self-serve QRIS checkout, invoicing-friendly payment for larger buyers?

**Method.** All claims below cite a primary source (provider docs/pricing pages) fetched on 2026-11-04. Caveats: `xendit.co` marketing/pricing pages returned HTTP 403 (bot-blocked) from this network, so Xendit Indonesia pricing is quoted from the official Wayback snapshot of that same page ([2024-09-17 capture](http://web.archive.org/web/20240917073413/https://www.xendit.co/en-id/pricing/), fee-schedule changes are infrequent but re-verify before contracting). `bi.go.id` regulation pages (QRIS MDR tiers, per-transaction cap) were not reachable from this network after site redesign; the BI-set MDR figure is quoted via Midtrans's own doc which states it as Bank Indonesia policy. A handful of Midtrans/Xendit tables disagree on QRIS max amount and settlement days; both values are given with sources.

Context assumption: monetization = one-off **Campaign Subscription** with candidate cap + paid overage, per the [map](https://github.com/nazabrory/recruitmentapp/issues/1).

---

## TL;DR recommendation

| Stage | Rail |
|---|---|
| **Demo / pre-entity (now)** | Midtrans **sandbox** (free, instant, has a QRIS simulator) or Xendit **Test Mode** (instant, `/simulate` endpoint). Wire the webhook schema; treat payment as fully stubbed behind a "mark paid" flag. |
| **Solo founder, has KTP + NPWP, no PT/CV yet** | **Midtrans** — individuals ("Perorangan") can register with just KTP + NPWP, no monthly minimum, QRIS 0.7%. Xendit is closed to you as a main account (individuals only via XenPlatform sub-accounts) and has a USD 50/month minimum fee. |
| **After incorporating PT/CV (or raising volume)** | Keep Midtrans or add **Xendit** for its richer Payments API v3 (payment requests, reusable QR, subscriptions product, multi-country) — but expect the USD 50/month invoice floor. Cheapest per-transaction VA: Duitku. |

## 1. QRIS basics: static vs dynamic, fees, settlement (Bank Indonesia layer)

- **QRIS** is the national QR standard developed by Bank Indonesia + the payment-system industry; a merchant needs an account with any **BI-licensed QRIS provider (PJSP)** — after that one QR works with all bank/e-wallet apps (Midtrans doc: [Introduction to Static QRIS](https://docs.midtrans.com/docs/introduction-to-static-qris), linking BI's licensed-PJSP list at bi.go.id).
- **Static vs dynamic** (Midtrans doc, [What is the difference between static QRIS and dynamic QRIS](https://docs.midtrans.com/docs/introduction-to-static-qris)):

  | | Static QRIS | Dynamic QRIS |
  |---|---|---|
  | Code | same QR for all transactions | unique QR per transaction |
  | Amount | entered by customer after scan | fixed by merchant, customer cannot change |
  | Order ID | system-generated (`QRIS-xxx`) | merchant-defined |
  | Transaction record | created **after** payment | created **before** payment |
  | Refund | **not available** | available via dashboard/API |

  For a subscription SaaS, **dynamic QRIS is the right fit** (exact amount + order ID + refundability + webhook before fulfilment). Static QR is only a fallback (e.g., manual top-up via chat).
- **Fee (MDR).** "MDR or fee set by Bank Indonesia for regular-type merchants is **0.7% per successful transaction**" — Midtrans doc: [What is the applicable transaction fee for QRIS](https://docs.midtrans.com/docs/what-is-the-applicable-transaction-fee-for-qris). BI also defines lower tiers (e.g., 0.07% for usaha mikro) by merchant category; the regulatory text was not reachable from this network (see Method) — confirm your category tier with the acquirer during onboarding, since as a PT/CV SaaS you'll almost certainly be "regular" 0.7%.
- **Per-transaction cap.** Midtrans transaction limits table lists QRIS min Rp 1 / max **Rp 10,000,000** ([source](https://docs.midtrans.com/docs/is-there-a-minimum-and-maximum-transaction-value-that-i-can-charge-with-midtrans)). Xendit's QRIS guide also lists max Rp 10,000,000 ([source](https://docs.xendit.co/docs/qris)), while its channel-features table lists Rp 20,000,000 ([source](https://docs.xendit.co/docs/available-payment-methods)) — likely reflecting a raised BI cap; verify at onboarding. Our campaign prices (≲ Rp 2–3 jt) are far under both caps.
- **Settlement** is per-acquirer, not per-BI: see per-provider tables below.

## 2. Xendit ([docs.xendit.co](https://docs.xendit.co/llms.txt))

**QRIS product** ([QRIS guide](https://docs.xendit.co/docs/qris), [Available payment methods](https://docs.xendit.co/docs/available-payment-methods)):

| Attribute | Value | Source |
|---|---|---|
| QRIS fee | **0.7%, inclusive of VAT** (published ID pricing) | [pricing, archived 2024-09](http://web.archive.org/web/20240917073413/https://www.xendit.co/en-id/pricing/) |
| Min / max | Rp 1 / Rp 10 jt (guide) or Rp 20 jt (channel table) | [qris](https://docs.xendit.co/docs/qris), [available-payment-methods](https://docs.xendit.co/docs/available-payment-methods) |
| Settlement | **T+1 business days** (guide) / T+2 (channel table) — both published | same |
| Expiry | settable; payment request expires 48 h | [qris](https://docs.xendit.co/docs/qris) |
| Reusable QR | ✓ (`REUSABLE_PAYMENT_CODE` flow — one QR, many payments) | [qris](https://docs.xendit.co/docs/qris), [reusable payment codes](https://docs.xendit.co/docs/reusable-payment-codes) |
| Refund | full/partial, per-issuer support matrix (DANA/ShopeePay/BCA ✓ …) | [qris](https://docs.xendit.co/docs/qris) |

**Sandbox / going live.** Signing up instantly grants **Test Mode** ("explore features, integrate APIs, test transactions with virtual funds"); Live Mode requires business verification, reviewed **within 14 working days** ([Create account](https://docs.xendit.co/docs/create-account)). Test mode even has a `POST /v3/payment_requests/{id}/simulate` endpoint to fake payment completion ([API docs](https://docs.xendit.co/apidocs/simulate-payment-test-mode)).

**Legal entity — key constraint.** Indonesia onboarding doc: "**Individual applications are only allowed if they are XP sub-accounts**" (i.e., XenPlatform, you'd need Xendit approval as a platform) — [Indonesia business documents](https://docs.xendit.co/docs/indonesia-business-documents). So **a solo founder without PT/CV cannot open a normal Xendit account**. Verification requires business legality docs (registration/shareholders/licenses), identity docs of stakeholders, and proof of business (website/social) + an authorized representative ([Verifying your account](https://docs.xendit.co/docs/verifying-your-account), [Create account](https://docs.xendit.co/docs/create-account)). Exact doc lists for Indonesia sit in an embedded Airtable (not machine-readable here).

**Fees & floors (ID)** ([archived pricing](http://web.archive.org/web/20240917073413/https://www.xendit.co/en-id/pricing/), [current pricing page](https://www.xendit.co/en/pricing/), [Transaction fees doc](https://docs.xendit.co/docs/transaction-fees)): QRIS 0.7% (incl. VAT); **VA (bank transfer) Rp 4,000** flat aggregator (Rp 2,000 + bank fee in switcher mode); **cards 2.90% + Rp 2,000** (local & international; global page lists international cards 4.0% + $0.30, "requires local entity"); Checkout/invoice hosted pages **free**; **Subscriptions product Rp 2,500/active plan/month** (global page: $0.30). **Minimum monthly fee USD 50** (≈ Rp 800 k) on every invoice after your first month, plus a "Xendit Processing Fee" on every API/Link payment attempt ([Transaction fees](https://docs.xendit.co/docs/transaction-fees)) — brutal at pre-revenue stage.

**Hosted checkout / no-code.** Dashboard **Payment Links** = no-code hosted checkout sessions with expiry, tracking, event timeline ([Creating payment links](https://docs.xendit.co/docs/creating-payment-links)); API-level hosted/embedded UI = **Payment Sessions** ([overview](https://docs.xendit.co/docs/payment-sessions-overview)).

**VA / B2B.** VA per-bank channels (BCA/BNI/BRI/Mandiri/Permata/BSI, incl. custom & reusable VA numbers) ([VA guides](https://docs.xendit.co/docs/bca-virtual-account), [Available payment methods](https://docs.xendit.co/docs/available-payment-methods)); monthly provider invoice with billing report & auto-deduction from balance ([Transaction fees](https://docs.xendit.co/docs/transaction-fees)). No productized "send invoice with payment page + reminders" — closest is Payment Links (legacy Invoice is deprecated → migrate to Payment Session, [migration doc](https://docs.xendit.co/docs/migrate-to-payment-session)).

**Webhooks ("what paid looks like").** Payments API v3: events `payment_request.expiry`, `payment.capture` (funds captured & confirmed — treat as paid), `payment.failure`, `payment_token.*`, `refund.*` ([Payments API webhooks](https://docs.xendit.co/docs/payments-api-webhooks)); webhook payload carries payment `status` `AUTHORIZED/SUCCEEDED/FAILED` ([webhook API ref](https://docs.xendit.co/apidocs/payment-webhook-notification)). Dashboard/reports use paired `transaction_status` + `settlement_status` (`SUCCESS`+`PENDING` → `SUCCESS`+`SETTLED`) ([Transaction and settlement statuses](https://docs.xendit.co/docs/transaction-status)).

**Money out.** Balance page manual withdrawals or **Auto-Withdrawal** (Indonesia: daily Mon–Fri or weekly at 9:00; **monthly not available in Indonesia**; optional balance-maturity period 0/3/7 days and minimum-balance threshold) ([Auto-Withdrawal](https://docs.xendit.co/docs/auto-withdrawal), [Withdraw balance](https://docs.xendit.co/docs/withdrawal)). No published minimum payout amount.

## 3. Midtrans ([docs.midtrans.com](https://docs.midtrans.com/llms.txt))

**QRIS.** Dynamic QRIS enabled with activation; existing GoPay merchants accept QRIS automatically ([QRIS payment method in Midtrans](https://docs.midtrans.com/docs/qris-payment-method-in-midtrans)). Fee = BI MDR **0.7%** ([FAQ](https://docs.midtrans.com/docs/what-is-the-applicable-transaction-fee-for-qris)). Static QRIS issued to merchants (dashboard-managed; no refunds on static) ([Static QRIS intro](https://docs.midtrans.com/docs/introduction-to-static-qris)). Min/max Rp 1–10 jt ([FAQ](https://docs.midtrans.com/docs/is-there-a-minimum-and-maximum-transaction-value-that-i-can-charge-with-midtrans)).

**Fees.** Per-successful-transaction only; **"no implementation or maintenance fee"**; VA **Rp 4,000** (example in doc); card MDR **2.9%**; VAT 11% on fees; fees deducted at withdrawal ([FAQ](https://docs.midtrans.com/docs/how-much-does-midtrans-charge-for-its-payment-service)).

**Settlement & payout.** Funds withdrawable **≥ 3 business days** after successful transaction; payout requestable every business day; **auto-withdrawal daily/weekly/monthly**, minimum balance **Rp 50,000**, **no withdrawal fee**; first withdrawal requires bank details + complete documents + ≥ 1 settled transaction ([Payout FAQ](https://docs.midtrans.com/docs/how-can-i-have-my-money-in-my-account-payout), [When can I withdraw](https://docs.midtrans.com/docs/when-can-i-withdraw-my-transaction-funds-from-midtrans)).

**Legal entity — individuals OK.** Merchant account types: **Perorangan (individual): KTP + NPWP**; PT/CV/PMA: deed + Kemenkumham decree + NIB/SIUP/TDP + director KTP/NPWP + company NPWP ([Legal documents FAQ](https://docs.midtrans.com/docs/what-are-the-legal-documents-required-for-midtrans-account-registration)). Individuals vs badan usaha differ in *which* payment methods can be activated (details in a linked Google Sheet; entity table is image-only) ([FAQ](https://docs.midtrans.com/docs/differences-in-available-payment-methods-between-individuals-and-business-entities)) — **verify QRIS dynamic + VA are activatable for Perorangan before relying on it**. A publicly accessible website/social presence with visible products+prices is required for activation ([Registration FAQ](https://docs.midtrans.com/docs/how-to-register-as-midtrans-merchant)).

**Sandbox.** Created automatically at signup, free; web-based simulators for every method incl. a dedicated **QRIS simulator** (`simulator.sandbox.midtrans.com/v2/qris/index`) ([Testing payment on sandbox](https://docs.midtrans.com/docs/testing-payment-on-sandbox)); go-live = switch to production env + upload documents ("Switching to Production Mode" guide) ([guide](https://docs.midtrans.com/docs/switching-to-production-mode)).

**Hosted checkout / no-code.** **Payment Link**: generated link to Midtrans-hosted payment page, "no technical integration required" ([Payment Link](https://docs.midtrans.com/docs/introduction-to-payment-link), [API variant](https://docs.midtrans.com/docs/payment-link-via-api)); Snap redirect/embedded for real checkout.

**VA / invoicing (strong suit).** VA across BCA/BNI/BRI/Mandiri/Permata/BSI/CIMB/Danamon (+ custom VA numbers), closed/static & dynamic ([Bank transfer integration](https://docs.midtrans.com/reference/bca-virtual-account) et al.). **Midtrans Invoicing (production, no activation needed): branded PDF quotes → invoices, generates payment link/VA per invoice, automatic payment reminders, programmatic reconciliation via Invoicing API** ([Invoicing guide](https://docs.midtrans.com/docs/invoicing)) — this directly answers the "invoicing-friendly payment for larger companies / PO flow" need.

**Webhooks ("paid").** HTTP(S) POST to your configured URL on status change ([Webhooks](https://docs.midtrans.com/docs/https-notification-webhooks)); non-card transactions: `pending` → **`transaction_status: "settlement"` = paid** (cards: `capture`/`settlement`); rare post-settlement reversal to `deny` (Permata/Mandiri bill/Indomaret) must be handled ([Transaction status cycle](https://docs.midtrans.com/docs/transaction-status-cycle)). Verify `signaturever`/SHA512 with your server key (api-docs.midtrans.com).

**International cards.** Card rails Visa/Mastercard/JCB/Amex with 3DS ([Card processing intro](https://docs.midtrans.com/docs/introduction-to-card-payment-processing)); foreign-issuing-bank payments accepted incl. VA from abroad ([FAQ](https://docs.midtrans.com/docs/can-i-receive-payments-from-a-foreign-issuing-bank)).

## 4. Cheaper alternative: Duitku (duitku.com) — plus what we checked and dropped

**Duitku** (Indonesian payment gateway; public per-transaction price list, no setup fee mentioned):

- **QRIS 0.7%** per transaction (same BI MDR), **VA Rp 1,500–5,000** per bank (Artha Graha/Sahabat Sampoerna Rp 1,500; other Rp 3,000; Mandiri Rp 4,000; BCA Rp 5,000), **cards 2.9% + Rp 2,500**, e-wallets 1.67–2% ([official price list](https://www.duitku.com/harga/), fetched 2026-11-04).
- Hosted payment page or custom payment page ("Duitku V2 vs POP" — POP = provider-hosted method picker), API + CMS plugins, disbursement product, docs incl. account activation & API keys ([docs.duitku.com](https://docs.duitku.com/), [API browser guide](https://docs.duitku.com/payment-gateway/api-browser/), [Withdraw feature](https://docs.duitku.com/dashboard-feature/withdraw/)).
- Withdrawals to registered bank account **free**, with per-channel settlement times (docs page is JS-rendered; exact schedule not machine-extractable here — check in dashboard).
- No monthly minimum published (contrast Xendit's USD 50). **Not verified:** individual-merchant eligibility and QRIS static/dynamic support in their docs (login-gated sections).

**Checked and dropped:** **Flip** — no payment-gateway/QRIS merchant product retrievable (business.flip.co.id didn't resolve); Flip is transfers, not acquiring. **KoinWorks/KoinPayment** — enterprise BaaS, no public QRIS self-serve pricing. **Ferdos** — no verifiable product found. **QRIS Interactive (qris.id → qris.interactive.co.id)** — an SME QRIS aggregator offering static+dynamic QRIS, free POS app, "pencairan ke semua bank"; fee schedule behind JS pages, license status unverified ([site](https://www.qris.id/)); not recommended as primary rail until vetted.

## 5. Comparison table

| | **Midtrans** | **Xendit** | **Duitku** (alt) |
|---|---|---|---|
| QRIS fee (published) | 0.7% (BI MDR) | 0.7%, VAT-inclusive (2024 archived pricing) | 0.7% |
| QRIS static | ✓ (no refund) | ~ (reusable payment code ≈ static, API) | ✓ (offered; details not scraped) |
| QRIS dynamic | ✓ (GoPay merchants auto) | ✓ (Payments API / sessions) | ✓ |
| QRIS max/txn | Rp 10 jt | Rp 10 jt (guide) / 20 jt (channel table) | n/a here |
| Settlement→cash | 3 business days to balance; auto-withdraw daily/weekly/monthly, min Rp 50 k, free | T+1/T+2 business days; auto-withdraw daily/weekly only (ID), maturity 0/3/7 d | per channel; free withdrawal |
| Monthly floor | **none** ("no implementation or maintenance fee") | **USD 50/month minimum** (+ processing fee per attempt) | none published |
| VA fee | Rp 4,000 | Rp 4,000 (aggregator) / Rp 2,000+bank (switcher) | Rp 1,500–5,000 |
| Cards | 2.9% (local+intl, 3DS) | 2.9%+Rp 2 k (ID) / intl 4%+$0.30 (global, needs local entity) | 2.9%+Rp 2,500 |
| Individual (perorangan) account | **✓ KTP + NPWP** | ✗ (XP sub-accounts only) | unverified |
| Sandbox | ✓ auto-created; QRIS simulator | ✓ instant Test Mode; `/simulate` endpoint | docs mention test credentials (not scraped) |
| Hosted checkout no-code | Payment Link; Snap redirect | Payment Links; Payment Session hosted page | POP hosted page |
| B2B invoicing | **Invoicing product** (quote→invoice, reminders, Invoicing API) | Payment Links + monthly billing; legacy Invoices deprecated | — |
| Webhook "paid" | `settlement` + signature verify, reversal-to-`deny` caveat | `payment.capture` / status `SUCCEEDED`; transaction+settlement status pair | transaction-status callback |
| Entity needed live | PT/CV: deed+SK+Kemenkumham+NIB+NPWP set; perorangan: KTP+NPWP | business docs + authorized rep; review ≤ 14 working days | KTP/NPWP-based |

## 6. Recommendation for our stage

1. **Now (solo founder, pre-entity, demo/investor track):** build the checkout against **Midtrans sandbox Snap + dynamic QRIS** (sandbox is free & instant, QRIS simulator makes a live demo real) — it's also the only rail where the same integration path (Payment Link → Snap → Invoicing) works once you're live as **perorangan (KTP+NPWP)**. Xendit is the better API stack but currently inaccessible to individuals and the USD 50/month floor doesn't pay off below ~Rp 70 jt/month of fees.
2. **After PT/CV (or before first paying customer):** activate Midtrans production (deed, SK Kemenkumham, NIB from OSS, company+director NPWP & KTP; expect email/WhatsApp follow-up within 3 working days; public website with visible pricing required) — or evaluate Xendit then if you want one API across ID+export markets or their Subscriptions product. Either way QRIS stays 0.7%; nothing to arbitrage there — differences are in fixed fees, floors, and tooling.
3. **Large-company buyers:** use **Midtrans Invoicing** (branded PDF invoice + per-invoice VA/payment link + automatic reminders + reconciliation API) so procurement gets an invoice and a BCA/Mandiri VA — the PO-friendly path; card (2.9%) as fallback for overseas entities.

## 7. Practical path for the demo

**Stub behind the curtain (don't integrate yet):** settlement math (net = gross − 0.7% — just show gross), payout reports, refunds/disputes, VAT on fees, reconciliation of post-`settlement` reversals, multi-entity (PT) KYC.
**Fake but realistic (sandbox, ~free):** QRIS dynamic code generation + expiry; webhook → mark Campaign Subscription `PAID` (Midtrans `settlement` / Xendit `payment.capture`); payment link for the "invoice" buyer path. Both sandboxes let you show a genuine phone-scan-then-paid flow: Midtrans QRIS simulator, or Xendit test-mode `POST /v3/payment_requests/{id}/simulate`.
**Sign up first:** (1) Midtrans account → instant sandbox, run the whole checkout against it behind a feature flag; (2) Xendit Test Mode in parallel for 30 min to compare DX (its docs are nicer). Pay for nothing yet. Once the first real SME wants to pay: register the perorangan account (needs your **NPWP personal** — start that if you don't have one) or fast-track the PT/CV + NIB, which unblocks all rails including Xendit.

## Sources (all fetched 2026-11-04)

- Midtrans: [docs index/llms.txt](https://docs.midtrans.com/llms.txt); QRIS fee · static-vs-dynamic · limits · sandbox · production switch · payout · legal docs · individuals-vs-entity · invoicing · webhooks · status cycle · cards · foreign banks — URLs inline above (`docs.midtrans.com/docs/...`).
- Xendit: [docs index/llms.txt](https://docs.xendit.co/llms.txt); QRIS · available payment methods · create account · verification · Indonesia business documents · activate payment methods · payment links · payment sessions · Payments API webhooks · webhook API ref · simulate endpoint · transaction fees · transaction/settlement statuses · settlement · withdrawal · auto-withdrawal · cards(ID) · reusable payment codes — URLs inline above.
- Xendit pricing: [live page (bot-blocked here, 403)](https://www.xendit.co/en-id/pricing/) quoted via [Wayback 2024-09-17 capture](http://web.archive.org/web/20240917073413/https://www.xendit.co/en-id/pricing/); global pricing via [Wayback 2026-02-03 capture](http://web.archive.org/web/20260203085511/https://www.xendit.co/en/pricing/).
- Duitku: [official price list](https://www.duitku.com/harga/), [docs](https://docs.duitku.com/).
- Bank Indonesia: QRIS PJSP list + MDR tiers referenced via Midtrans/Xendit docs (bi.go.id pages unreachable from research network; regulatory text to be verified directly before contracting).
