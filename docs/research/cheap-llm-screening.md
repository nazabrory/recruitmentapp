# Research: Cheap-LLM feasibility and cost for the AI screening pipeline

Ticket: [#5](https://github.com/nazabrory/recruitmentapp/issues/5) · Researched: 2026-11-04 · Status: complete

Locked principle (from #10): **AI only READS and SUGGESTS; humans decide.** Everything below is
evaluated against that — every "AI job" here produces a draft artifact a recruiter reviews, never a
score that is applied automatically.

## TL;DR verdict

- **Feasible and almost free.** Full pipeline across all four AI jobs costs **≈ $0.005–0.01 per
  candidate** on budget models (DeepSeek Flash / Qwen Flash tiers) — **≈ $2–5 for a 300-candidate
  campaign**, even under $10 with generous retry overhead. Cost is a non-issue; *quality control* is
  where the real work is.
- The models named in the ticket ("DeepSeek V3/R1") are **deprecated** as of mid-2026. Current cheap
  tier: `deepseek-flash` (V4.1-Flash), `qwen3.7-flash` / `qwen3.8-flash`, `GLM-5.3-Flash`, plus cheap
  vision models (`GLM-4.6V`, `qwen3-vl-plus`, `qwen-vl-ocr`, GLM-OCR).
- **CV parsing from extracted text: solved problem** for these models with JSON-mode/schema output.
  The hard part is the **PDF layer**: born-digital PDFs extract cleanly with `pdftotext`/`pdfplumber`;
  scanned ones need VLM OCR — which is now cheap enough ($0.03–0.07 per 1M tokens).
- **Handwritten answers via photos: doable but lowest-confidence job.** Current cheap VLMs explicitly
  advertise handwriting OCR, multilingual text incl. Indonesian, and robustness to blur/tilt/low
  light, but handwritten grading must stay human-reviewed with the original photo alongside.
- **OpenCode Go** ($10/mo flat) exposes exactly the cheap models we need (DeepSeek V4.1 Flash,
  Qwen3.8 Flash, GLM-5.3-Flash) with monthly allowances ($100/$30/$60 of token value) that dwarf a
  demo campaign — but its terms are aimed at *coding-agent traffic*, so treat it as a **demo
  convenience, not a production architecture**.
- Red flags are about **data, not cost**: candidate CVs/photos are personal data under UU PDP
  (#2, `uu-pdp-candidate-data.md`), so provider selection must be driven by training-use/retention
  terms (0-day retention, no-training endpoints), consent language, and a documented processor list.

---

## 1. The current cheap-model landscape and list prices

All prices are official provider pages, checked 2026-11-04, USD per **1M tokens** unless noted.

### DeepSeek (api.deepseek.com)

Source: <https://api-docs.deepseek.com/quick_start/pricing>

| Model | Input (cache miss) | Input (cache hit) | Output | Notes |
|---|---|---|---|---|
| `deepseek-flash` (V4.1-Flash-1017) | $0.15 off-peak / $0.30 peak | $0.003 / $0.006 | $0.60 / $1.20 | **Vision-capable**, JSON mode, tool calls, 1M context |
| `deepseek-v4-pro` | $0.66 / $1.32 | $0.022 / $0.044 | $1.98 / $3.96 | Stronger; **no vision** |

Key facts:

- The legacy names `deepseek-chat` / `deepseek-reasoner` (V3/R1) were upgraded to V3.2 and then
  **deprecated on 2026-07-24**; requests now route to the current Flash model (per the same pricing
  page, footnote 1, and provider migration notes). Any ticket text assuming V3/R1 should be read as
  "today's flash tier."
- **Peak hours** are 01:00–04:00 and 06:00–10:00 UTC Mon–Fri; everything else (incl. weekends) is
  off-peak at half price — relevant because Indonesian business hours (UTC+7) overlap *partly* with
  peak, so nightly batch runs are cheaper.
- **Context caching is automatic prefix caching** — a cache hit is 50× cheaper than a miss
  ($0.003 vs $0.15). Guide: <https://api-docs.deepseek.com/guides/kv_cache>.
- **Vision** (`deepseek-flash` only): JPEG/PNG/GIF/WebP, base64/URL/Files-API input, images capped at
  **1024 tokens each** regardless of resolution (resized to ~1300×1300 pixels equivalent), `detail:
  "low"` downscales to 512×512 for cheaper passes. Guide: <https://api-docs.deepseek.com/guides/vision>.
- JSON output mode: <https://api-docs.deepseek.com/guides/json_mode>.

### Qwen / Alibaba Cloud Model Studio (international, Singapore region)

Source: <https://www.alibabacloud.com/help/en/model-studio/billing-for-model-studio> (Nov 2, 2026 revision)

| Model | Input | Output | Notes |
|---|---|---|---|
| `qwen3.7-flash` | $0.03 (≤32K tier) → $0.20 (≤1M) | $0.13 → $0.80 | **50% batch-inference discount**; cheapest text option |
| `qwen3.8-flash` | $0.15 | $0.47 | current recommended flash |
| `qwen3.7-plus` | $0.40 (≤256K) | $1.60 | mid tier |
| `qwen3-vl-plus` (vision) | $0.20 (≤32K) | $1.60 | thinking + non-thinking modes |
| `qwen-vl-ocr` | $0.07 | $0.16 | dedicated OCR/document model |

- **Batch calls**: for models marked batch-capable, input *and* output are **50% of real-time price**
  (stated on the same pricing page; batch API:
  <https://www.alibabacloud.com/help/en/model-studio/batch-interfaces-compatible-openai>).
- **Context cache**: cache-hit input billed ~10% of standard (explicit-cache creation at 125%); rules
  at <https://www.alibabacloud.com/help/en/model-studio/context-cache>.
- Qwen-OCR product doc (extraction of text *and structured data* from scans/receipts/tables; supported
  languages incl. Arabic/Japanese/etc.): <https://www.alibabacloud.com/help/en/model-studio/qwen-vl-ocr>.
- Indonesian language support on the text side: Qwen3 lists Indonesian (plus Malay, Javanese,
  Sundanese, Balinese) among trained languages — <https://qwenlm.github.io/blog/qwen3>.

### GLM / Z.ai

Source: <https://docs.z.ai/guides/overview/pricing>

| Model | Input | Cached input | Output | Notes |
|---|---|---|---|---|
| `GLM-5.3-Flash` | $0.15 | $0.03 | $0.50 | cheap text flagship-flash |
| `GLM-4.7-Flash` / `GLM-4.6V-Flash` | Free | Free | Free | free-tier models (open weights too) |
| `GLM-4.6` / `GLM-4.7` | $0.60 | $0.11 | $2.20 | mid tier |
| `GLM-4.6V` (vision, 106B) | $0.30 | $0.05 | $0.90 | document/OCR/grounding specialist |
| `GLM-4.6V-FlashX` (vision) | $0.04 | $0.004 | $0.40 | dirt-cheap vision |
| `GLM-OCR` | $0.03 | — | $0.03 | dedicated OCR endpoint |

- GLM-4.6V product doc claims **native multimodal document processing** (images, tables, curves)
  without a separate OCR pipeline: <https://docs.z.ai/guides/vlm/glm-4.6v>.
- GLM-V technical report (OCR, grounding, document/chart understanding as core evaluated abilities;
  4.6V is the successor in the same family): <https://arxiv.org/abs/2507.01006> and
  <https://github.com/zai-org/GLM-V> (grounding + complex-document parsing listed as using cases).

### OpenCode Go subscription ("what OpenCode Go-style plans expose")

Source: <https://opencode.ai/v2/docs/console/go>

- **$10/month** (Go), $40 (Go Plus), $20/member (Teams). One API key, OpenAI/Anthropic/Responses
  compatible endpoints.
- Roster relevant to us, with per-model **monthly token-value allowances** on the $10 plan:
  DeepSeek V4.1 Flash **$100** (4× promo noted), Qwen3.8 Flash **$30**, GLM-5.3-Flash **$60**,
  Qwen3.7 Plus $60, plus GPT-6 Luna / Claude Haiku 5.5 at $15 each.
- **Privacy table (matters for us):** for nearly every model — incl. DeepSeek V4.1 Flash, Qwen, GLM —
  request data is **not used for training** with **0-day retention** (some at 30 days, e.g. Haiku/Luna).
  Workspace privacy settings block endpoints that train on request data by default.
- Caveats: Go is *designed for coding agents* (session-header requirements, abuse monitoring), and
  DeepSeek models need the **Global region** enabled in workspace privacy settings. Treat as demo
  plumbing, not production billing.

### Subscription comparison for scale reference

At list prices, our full per-candidate pipeline (section 5) is $0.005–0.01 → a 300-candidate campaign
is **$2–5**, i.e. **it fits inside a single $10/month Go plan** even before its $100 DeepSeek
allowance. There is no scenario where model spend threatens the unit economics described in #13.

---

## 2. Job 1 — CV/certificate parsing into structured data

**Task:** extracted text (or image) → JSON: experience months, software skills, education,
certifications. This is *information extraction*, the best-understood LLM job there is.

**Capability.** Today's flash-tier models natively support JSON output (DeepSeek JSON mode,
<https://api-docs.deepseek.com/guides/json_mode>; GLM structured outputs via response_format per
<https://docs.z.ai/guides/vlm/glm-4.6v> family docs; Qwen via OpenAI-compatible structured output in
Model Studio docs). Resumes are short (~600–1,500 tokens), far below every context limit, and the
format is highly stereotyped — this is close to the easiest rung of document AI. Dedicated cheap OCR
models (Qwen-OCR, GLM-OCR) exist precisely for "image → structured data from scanned documents,
tables, receipts" (Qwen-OCR doc, link in §1).

**Where cheap models fail (observed classes of error, and our mitigations):**
1. *Date arithmetic* — "Jan 2022 – Mar 2024" → months is exactly computed work an LLM does
   sometimes-wrong. **Mitigation: never let the model compute totals.** Have it emit raw spans
   (`{"start":"2022-01","end":"2024-03","quote":"..."}`) and compute months in our own code.
2. *Silent omissions* — dropping a minor certificate. **Mitigation: two-pass check** — second call
   asks "list every certificate/employer mentioned in the text; report any missing from the JSON."
   Cheap enough (~$0.0005) to always run.
3. *Normalization drift* (skill names, degree titles). **Mitigation: enum-constrained schema fields
   where the rubric needs canonical values; free text otherwise.**

**PDF text-extraction layer (before any LLM call):**

| Layer | Tool | Use when | Source |
|---|---|---|---|
| Born-digital PDFs | `pdftotext` (Poppler; `-layout` preserves visual layout) | text layer exists — the common case for exported CVs | <https://poppler.freedesktop.org/> , <https://manpages.debian.org/bookworm/poppler-utils/pdftotext.1.en.html> |
| Layout/word-box aware | `pdfplumber` (Python; gives x/y coordinates per word/char, table extraction) | two-column CVs, need page numbers for quoting | <https://github.com/datapythonista/pdfplumber> |
| Scanned/image PDFs | OCR: `tesseract` (CLI/engine, PDF support via ghostscript) or **VLM OCR** (Qwen-OCR/GLM-OCR/deepseek-flash vision) | no text layer (detect: `pdftotext` output ≈ empty) | <https://github.com/tesseract-ocr/tesseract> , <https://github.com/ocrmypdf/OCRmyPDF> |
| Hybrid | `ocrmypdf` (adds an OCR text layer to scanned PDFs, keeps originals) | batch normalizing uploads | <https://github.com/ocrmypdf/OCRmyPDF> |

**Recommended pipeline:** try pdftotext/pdfplumber → if < ~50 chars/page, treat as scanned → render
pages and send to VLM OCR (qwen-vl-ocr or deepseek-flash vision). Keep **page + bounding-ish
reference** from the extractor so every downstream fact can carry a citation. Feed the LLM *text with
page markers*, not raw PDFs.

**Cost** (assumes ~6K input incl. 1.5K cached schema/system prompt, 1.5K JSON output per candidate):
DeepSeek flash **$0.0016**, GLM-5.3-Flash $0.0015, Qwen3.7-flash **$0.0004**. Two scanned pages via
qwen-vl-ocr adds **$0.0005**. → **≤ $0.0025 per candidate.**

## 3. Job 2 — Writing the one-screen "Screening Brief"

**Task:** parsed facts + evidence quotes → brief with *facts / evidence / gaps / flags*, one screen,
for the recruiter to read in 30 seconds.

**Capability.** Summarization over ~6–10K tokens is trivially within flash-tier context (all are
≥128K; DeepSeek/Qwen flagship tiers 1M+). Writing quality of DeepSeek Flash / GLM-5.3-Flash in
structured business prose (incl. non-English) is adequate for a *draft*; briefs are short so output
review cost is low.

**Hallucination risk — the central concern for this job.** LLM summarization can invent or distort
facts absent from the source; this is a documented, systematic failure mode of current models (survey:
Huang et al., *A Survey on Hallucination in Large Language Models*, <https://arxiv.org/abs/2311.05232>).
In a screening context a fabricated "5 years SAP experience" is an unfair-hire/defamation-adjacent
risk, not just a bug. Long contexts make it worse: models attend unevenly across long inputs ("lost in
the middle", Liu et al., <https://arxiv.org/abs/2307.03172>) — mitigated here by short inputs.

**Mitigations (design, not vibes):**
1. **Extract-then-summarize**: the brief is written *from the validated JSON of Job 1*, never from raw
   CV text — facts are already field-typed, and the brief must only re-narrate them.
2. **Quote-with-reference grounding**: every fact line must carry `(CV p.2: "…verbatim quote…")`;
   instruction + schema force it. Cheap **programmatic verifier** then string-matches each quote
   against the extracted page text and marks any brief line UNVERIFIED. Cost of verification ≈ $0.
3. **Gaps/flags must name their source field or be dropped** ("no education dates on p.1" is a gap;
   "seems junior" is a vibe we don't want).
4. **Low temperature + non-thinking mode** for determinism; thinking mode reserved for the rubric job.
5. UI never shows a brief without the linked source documents a click away — the human decides,
   so the human must always be able to audit.

**Cost:** ~8K in / 0.9K out → DeepSeek flash **$0.0014**, Qwen flash $0.0004. Re-runs are nearly free
via prefix cache when only the brief template changes.

## 4. Job 3 — Drafting the scoring Rubric from plain-language Job Requirements

**Task:** recruiter writes "must have 2 yrs AutoCAD, S1 Teknik, teliti" → AI drafts criteria + weights
+ 1–5 anchor descriptions + hard thresholds; recruiter iterates until happy. Rubric then gates Job-2
briefs and (human) scoring.

**Capability.** This is instruction-following + domain translation, not retrieval — the strongest
showing for mid-tier models, and reasoning-mode variants help (DeepSeek thinking mode:
<https://api-docs.deepseek.com/guides/thinking_mode>; Qwen3-VL/Plus thinking modes on the Model Studio
pricing page). Flash tier is *fine*, but this job runs **once per job posting**, not per candidate, so
use the *better* model (DeepSeek V4 Pro $0.66/$1.98 or GLM-4.7 $0.60/$2.20) — pennies either way.

**Risks.** Inventing criteria not grounded in the requirements (rubric creep), and silently encoding a
proxy-discriminatory criterion. Mitigations: require each criterion to quote the requirement phrase it
comes from (same verifier trick as Job 2); cap criteria count; recruiter must edit/accept before the
rubric locks; keep full version history of every iteration (this is also the audit trail #10 wants).

**Cost:** 4 iterations × (5K in/1.2K out) ≈ **$0.005–0.02 per job posting** (flash) — i.e. under
$0.0001/candidate amortized over 300 applicants; even at V4-Pro prices < $0.02/posting.

## 5. Job 4 — Reading photographed handwritten answers (vision)

**Task:** candidates photograph handwritten test answers on paper; AI transcribes and (suggests, per
#10) pre-scores against the rubric.

**What cheap vision models actually handle today (evidence, each from vendor/technical docs):**

- **Handwriting + multilingual OCR is an advertised feature**, not a stretch:
  - Qwen3-VL: OCR expanded **10 → 32 languages** (39 tested, >70% accuracy in 32 of them), explicitly
    improved "under challenging real-world conditions like poor lighting, blur, or tilted text" —
    <https://github.com/QwenLM/Qwen3-VL> and Qwen3-VL tech report (aiskyeye mirror of the vendor PDF,
    Fig. 2: <https://aiskyeye.com/wp-content/uploads/2026-05-0402%20qwen3-vl.pdf>).
  - Qwen blog: 32-language OCR incl. rare characters and long-document structure —
    <https://qwen.ai/blog?id=99f0335c4ad9ff6153e517418d48535ab6d8afef>.
  - GLM-4.6V: document/OCR/grounding core competencies, native table extraction to HTML
    (<https://arxiv.org/abs/2507.01006>; <https://docs.z.ai/guides/vlm/glm-4.6v>). GLM-OCR is a $0.03/M
    dedicated OCR endpoint (Z.ai pricing page).
- **Indonesian:** Qwen text models list Indonesian/Sundanese/Javanese among trained languages
  (<https://qwenlm.github.io/blog/qwen3>); Indonesian is Latin-script, so OCR itself is low-risk; the
  language-modeling side of reading informal Bahasa Indonesia answers is where flash models are solid
  rather than excellent.
- **Diagrams/sketches:** "curve/table/figure" understanding is claimed by GLM-4.6V docs and the GLM-V
  paper's chart-understanding benchmarks; treat *freehand engineering sketches* as unsupported for
  scoring — transcribe what's legible, flag the rest.
- **Image tokenization/limits:** DeepSeek vision caps each image at 1024 tokens (~1300×1300), which is
  ~fine for whole-page handwriting but will lose small dense script; `detail:"low"` (512×512) is
  *wrong* for handwriting. DeepSeek vision guide: <https://api-docs.deepseek.com/guides/vision>.

**Honest capability statement for our app:** clean handwritten paragraphs on a well-lit page →
high transcription accuracy expected; messy/blurry/pencil/crossed-out pages → error rates are
non-trivial, and *any* scoring suggestion derived from a misread word is unfair. **Design consequence:
the scorer UI shows the photo next to the transcript, and the transcript carries a per-line
confidence flag; recruiters score from the photo, AI's suggested score is a shortcut only when the
transcript is verified.** This matches the locked AI-reads-humans-decide principle.

**Cost** (4 photos ≈ 6.1K in incl. image tokens, 2K out transcript+suggestions): deepseek-flash
vision **$0.0019**, GLM-4.6V $0.0036, qwen3-vl-plus $0.0044, GLM-4.6V-FlashX $0.0011 (+free flash tier).

## 6. Full cost math per candidate / per 300-candidate campaign

Assumed tokens per candidate (documented above; cache hits noted):

| Job | Input | Output | DeepSeek flash (off-peak) | Qwen flash mix | GLM mix |
|---|---|---|---|---|---|
| 1 CV+certs parse (3 docs, text) | 6,000 (1.5K cached) | 1,500 | $0.0016 | $0.0004 | $0.0015 |
| 1b scanned fallback (2 pages OCR) | 4,000 | 1,600 | $0.0005 (flash vision) | $0.0005 (qwen-vl-ocr) | $0.0002 (GLM-OCR) |
| 2 Screening Brief | 8,000 (2K cached) | 900 | $0.0014 | $0.0004 | $0.0014 |
| 3 Rubric (amortized /300) | — | — | <$0.0001 | <$0.0001 | <$0.0001 |
| 4 Handwritten answers (4 photos) | 6,100 (1.5K cached) | 2,000 | $0.0019 | — | $0.0036 (GLM-4.6V) |
| **Per candidate** | | | **≈ $0.0054** | **≈ $0.0013–0.003** | **≈ $0.007** |
| **Per 300-candidate campaign** | | | **≈ $1.6** | **≈ $0.4–0.9** | **≈ $2** |

Sanity bounds: 3× retry budget and using the premium text tier (GLM-4.7/V4-Pro class) for jobs 1–3
instead of flash still lands at **≈ $7–10 per 300 candidates** (< $0.035/candidate). Compare: at
GPT-5-class prices the same workload would be ~$25–60/candidate — 20–50× more, per provider list
pages linked above. **Conclusion: model spend is negligible against the subscription price anchors in
#13; a full campaign's tokens cost less than one lunch.**

**Cost tricks worth taking (all cited in §1):**
1. **Prompt-cache-friendly ordering**: identical system prompt + rubric + schema *prefix*, per-candidate
   text appended last → 10%–0.3% input price on the cached prefix (DeepSeek $0.003 vs $0.15).
2. **Batch inference**: Alibaba Model Studio 50% off input+output for queued parsing jobs; overnight
   batch also sidesteps DeepSeek peak pricing (half price off-peak).
3. **Model cascade**: flash tier first; only route low-confidence outputs (failed JSON validation,
   UNVERIFIED brief lines, blur-flagged handwriting) to the premium model. Expect 10–20% escalation →
   < 2× cost increase.
4. **Flat-rate option**: OpenCode Go $10/mo covers a whole demo campaign within one model's monthly
   allowance ($100 DeepSeek-Flash value on the $10 plan).

## 7. Recommendation — model per job, and what to fake for the demo

| Job | Production recommendation | Demo-time |
|---|---|---|
| 1 Parse CV/certs | `qwen3.7-flash` (or `deepseek-flash`) with JSON mode + computed-not-inferred date math | live API — it's reliable and near-free |
| 1b Scanned PDFs/images | `qwen-vl-ocr` / GLM-OCR first pass; escalate to `GLM-4.6V` for tables/diagrams | live API, but pre-screen 2–3 scanned samples |
| 2 Screening Brief | `deepseek-flash` non-thinking, low temp, quote-grounded + string-match verifier | **hybrid: live for 3–5 showcase candidates; precomputed, human-edited briefs for the rest of the mock set** |
| 3 Rubric draft | `deepseek-v4-pro` or `glm-4.7` (reasoning mode) — once per posting | live; highest-wow, lowest-volume |
| 4 Handwritten | `GLM-4.6V` (quality-first) or `deepseek-flash` vision (cost-first); human-scores-with-photo UX | **fake it honestly: 5–8 canned photo→transcript pairs chosen to work**, plus one *deliberately bad* handwriting sample shown being flagged low-confidence — sells the safety story better than cherry-picks |
| Plumbing | OpenAI-compatible endpoints everywhere; provider behind a config switch | OpenCode Go key is fine for the demo |

Demo budget reality: the entire one-month demo (parsing + briefs for 30 mock candidates ×3 jobs +
rubric iterations) is **single-digit dollars**; nothing needs to be faked for cost reasons — only for
*reliability optics* on handwriting.

## 8. Red flags

1. **UU PDP (see #2; file `docs/research/uu-pdp-candidate-data.md` being written concurrently —
   cross-reference once merged).** Sending CVs, contact details, and *photos of handwriting* (plus
   intro videos, far more sensitive) to third-party APIs = **processing by a processor + cross-border
   transfer** of personal data. Consequences for this research: (a) provider choice must be pinned to
   **no-training + 0-day retention** contracts, not just price; (b) consent text at intake (#9) must
   name AI processing and the processor category; (c) DPA/transfer safeguards per Law 27/2022 arts. 55–56
   need review before any *real* candidate data touches a foreign API — demo must use fabricated
   candidates only.
2. **Provider terms of use vs. OpenCode Go.** Go is marketed and rate-limited for *coding-agent
   traffic*; using its key for a production SaaS pipeline likely violates intended-use, and abuse
   monitoring exists. Fine for the demo; buy direct API credits for anything real.
3. **Training-data models hidden in cheap rosters.** Free/cheap tiers sometimes trade data for price
   (OpenCode Go explicitly blocks "endpoints that train on request data" by default — its Privacy
   table; e.g. Muse Spark/Iceman are not zero-data-retention). Whitelist models per §1 tables; re-check
   the table whenever the roster changes.
4. **Model churn.** V3/R1 → V3.2 → V4.1 within ~18 months; deprecations arrive with weeks of notice.
   Pin dated model versions, keep an eval set (20 CVs, 5 answer sheets) to re-run on every version
   bump, and abstract the provider behind our own interface.
5. **Hallucination is a fairness problem here, not a cosmetic one** — a fabricated fact in a brief
   could wrongly reject a person. Quote-verification + human-decides UI (§3) is the minimum bar;
   never let a brief with UNVERIFIED lines reach the shortlist screen unflagged.
6. **Handwriting confidence must be surfaced, never hidden.** Misread answers → wrong suggested
   scores → unfair outcomes; the UX (photo + transcript side-by-side, low-confidence flags) is part of
   the answer, not a nice-to-have.
7. **Don't let the LLM do arithmetic** (months of experience, percentages) — deterministic code owns
   all computed fields (see §2).

---

## Sources

- DeepSeek pricing/models: <https://api-docs.deepseek.com/quick_start/pricing>
- DeepSeek vision guide: <https://api-docs.deepseek.com/guides/vision> · JSON mode: <https://api-docs.deepseek.com/guides/json_mode> · KV cache: <https://api-docs.deepseek.com/guides/kv_cache> · Thinking mode: <https://api-docs.deepseek.com/guides/thinking_mode>
- Alibaba Model Studio pricing (Qwen, incl. batch 50% & cache rules): <https://www.alibabacloud.com/help/en/model-studio/billing-for-model-studio> · Qwen-OCR: <https://www.alibabacloud.com/help/en/model-studio/qwen-vl-ocr> · Context cache: <https://www.alibabacloud.com/help/en/model-studio/context-cache>
- Z.ai GLM pricing (incl. GLM-4.6V, GLM-OCR, free Flash): <https://docs.z.ai/guides/overview/pricing> · GLM-4.6V doc: <https://docs.z.ai/guides/vlm/glm-4.6v> · GLM-V paper: <https://arxiv.org/abs/2507.01006> · GLM-V repo: <https://github.com/zai-org/GLM-V>
- OpenCode Go plans, allowances, privacy table: <https://opencode.ai/v2/docs/console/go> · <https://opencode.ai/go>
- Qwen3-VL OCR 32 languages / robustness: <https://github.com/QwenLM/Qwen3-VL> · <https://qwen.ai/blog?id=99f0335c4ad9ff6153e517418d48535ab6d8afef> · Qwen3 languages (Indonesian et al.): <https://qwenlm.github.io/blog/qwen3>
- PDF layer: pdftotext/Poppler <https://poppler.freedesktop.org/> · pdfplumber <https://github.com/datapythonista/pdfplumber> · Tesseract <https://github.com/tesseract-ocr/tesseract> · OCRmyPDF <https://github.com/ocrmypdf/OCRmyPDF>
- Hallucination survey: Huang et al. <https://arxiv.org/abs/2311.05232> · Long-context "lost in the middle": Liu et al. <https://arxiv.org/abs/2307.03172>
