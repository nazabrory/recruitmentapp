# Research: UU PDP obligations for candidate personal data and intro videos

**Ticket:** #2 · **Date:** 2026-11-04 · **Scope:** UU 27/2022 (UU PDP), PP 33/2026 (implementing regulation), PP 71/2019 + Permenkominfo 5/2020 (PSE/electronic systems), applied to a recruitment SaaS collecting CVs, certificates, NIK, photos, and ~1-minute selfie intro videos.

> ⚠️ Not legal advice. This is a developer-facing research summary from primary texts. Have counsel review before commercial launch.

## Sources (primary)

| Code | Document | Official source |
|---|---|---|
| UU PDP | UU No. 27/2022 tentang Pelindungan Data Pribadi (LN 2022/196) | https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022 · PDF: https://peraturan.bpk.go.id/Download/224884/UU%20Nomor%2027%20Tahun%202022.pdf |
| PP 33/2026 | PP No. 33/2026, Peraturan Pelaksanaan UU PDP (LN 2026/88, TLN 7190; 225 pasal; ditetapkan 16-07-2026, **berlaku efektif 16-01-2027**) | Metadata + full-text PDF via mirror of jdih.setneg.go.id: https://meridianhukum.com/peraturan/pp-no-33-tahun-2026 (check peraturan.bpk.go.id for the canonical listing) |
| PP 71/2019 | PP No. 71/2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE) | https://peraturan.bpk.go.id/Details/112816/pp-no-71-tahun-2019 · PDF: https://peraturan.bpk.go.id/Download/112816/PP%20Nomor%2071%20Tahun%202019.pdf |
| PMSE 5/2020 | Permenkominfo No. 5/2020 tentang PSE Lingkup Privat (BN 2020/1376), diubah oleh Permenkominfo 10/2021 | https://peraturan.bpk.go.id/Details/203049/permenkominfo-no-5-tahun-2020 · PDF: https://peraturan.bpk.go.id/Download/197017/Nomor%205%20Tahun%202020.pdf |
| MK decision | Putusan 151/PUU-XXII/2024 (conditional interpretation of Pasal 53 ayat (1) huruf b UU PDP) | linked from https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022 (Uji Materi section) |

Note on "PP MASTER": the ticket name referenced a rumored/planned implementing regulation. The one actually issued is **PP 33/2026** (effective 16 January 2027). Before that date the UU PDP itself (fully applicable since 17 Oct 2024 per Pasal 74's 2-year transition) plus PP 71/2019/PMSE 5/2020 govern; after it, PP 33/2026 adds detailed obligations. Komdigi acts as de-facto supervisor while the dedicated "Lembaga" ( UU PDP Pasal 58–60) is being stood up — PP 33/2026 repeatedly delegates details to "Peraturan Lembaga".

---

## 0. Are we a "Pengendali Data Pribadi"? Yes

UU PDP applies to any **data controller** (pengendali) that determines the purposes/means of processing personal data of data subjects located in Indonesia, whether inside or outside Indonesia (Pasal 2). The recruitment SaaS startup is the controller; hosting/cloud providers are **processors** (prosesor, Pasal 4(7)–(9), PP 33/2026 Pasal 125: controller must ensure processor keeps confidentiality; oversight of all parties under its control, PP 33/2026 Pasal 126).

## 1. Data classification of our inputs

- **General personal data** (Pasal 4(3) UU PDP): name, gender, religion, marital status, **and "data pribadi yang dikombinasikan untuk mengidentifikasi seseorang"** — CVs, certificates, contact details, a plain photo all fall here. (UU PDP PDF Pasal 4, hal. 5)
- **Specific/sensitive personal data** (Pasal 4(2)): health data, **biometric data**, genetic, criminal records, children's data, financial data. A selfie video is *not automatically* biometric — but if we ever run face matching/verification on it, it becomes **data biometrik** → specific data. NIK is general data by combination, but is a high-value identifier (see §9 — avoid collecting it in a demo).
- Processing specific data still needs a legal basis (§3) and triggers **mandatory DPIA** (PP 33/2026 Pasal 120(2)(b)).

## 2. Lawful basis & consent language (what the consent screen must say, Bahasa)

**Six lawful bases** (UU PDP Pasal 20(2); restated PP 33/2026 Pasal 30(3)):
a. **persetujuan yang sah secara eksplisit** (explicit valid consent); b. contract performance; c. legal obligation; d. vital interests; e. public interest/official authority; f. **legitimate interest** ("kepentingan yang sah lainnya", balancing test).

For recruitment: **consent** is the clean basis for candidate profiles and intro videos; **Pasal 20(2)(f) legitimate interest** plausibly covers processing submitted applications for the vacancy itself (the candidate initiated it). PP 33/2026 Pasal 30(4): the basis must match the actual purpose/need; Pasal 31: processing must be **non-discriminatory**.

**Consent must be** (PP 33/2026 Pasal 32(2)): given **secara bebas, sadar, spesifik, dan tidak ambigu** — free, informed, specific, unambiguous. The PP's elucidation explicitly calls out the anti-pattern we must avoid: *"pemberiaan persetujuan pemrosesan data pribadi digabungkan dengan pemberian persetujuan terhadap syarat dan ketentuan sehingga subjek … dianggap telah memberikan persetujuan hanya dengan membaca syarat dan ketentuan"* — **bundling consent into Terms & Conditions does NOT count**. (Pasal 32(2) elucidation, reported by https://chatnews.id/pemerintah-terbitkan-pp-33-2026-data-pribadi from the official PP text; verified in PP 33/2026 PDF Pasal 32.)

**Before consent, disclose** (UU PDP Pasal 21(1), PP 33/2026 Pasal 33): legality of processing; purposes; **types of data and their relevance**; **retention period of documents containing the data**; details of identity of the collecting/legal entities; processing period; **the data subject's rights**. PP 33/2026 Pasal 33(3): delivered **sebelum** consent, in a **ringkas, tepat** (concise, accurate) manner.

Other hard requirements:
- Provide a working consent mechanism, elektronik or nonelektronik, linked to the disclosure (PP 33/2026 Pasal 34).
- **No deceptive/misleading consent requests** — dark patterns banned (Pasal 35(3)).
- If a user **refuses**, you must still provide the service without quality reduction, *unless the service inherently requires the data* (Pasal 35(1) — for us: applying inherently requires the CV, so refusing = can't apply is acceptable; marketing/talent-pool retention is the part that must be optional and separable).
- **Keep proof of consent** (Pasal 36) — store a consent record: timestamp, version of disclosure text, scope.
- **Withdrawal must be possible anytime** through a provided mechanism (Pasal 37; UU PDP Pasal 40: processing must stop **within 3×24 hours** of a verified withdrawal, and you must tell the subject it was done — PP 33/2026 Pasal 92(4)).
- Children: if ever under-18 applicants, parental consent regime applies (PP 33/2026 Pasal 38) — keep demos adults-only.

**Practical Bahasa consent-screen content** (per Pasal 21 + Pasal 32–33): a dedicated screen/checkbox (NOT "I agree to ToS") stating: identitas pengendali (PT/app name + contact/email); jenis data (CV, sertifikat, foto, video perkenalan ±1 menit); tujuan (seleksi posisi X; penilaian video oleh pewawancara manusia); dasar hukum (persetujuan eksplisit); jangka waktu simpan (e.g. "180 hari, lalu dihapus otomatis"); hosting/transfer ke luar negeri (see §6); hak-hak subjek (akses, koreksi, hapus, cabut persetujuan, keberatan keputusan otomatis) + cara menggunakan (email/dashboard); separate optional checkbox for talent-pool/marketing retention.

## 3. "Prospect data" of job applicants — special treatment?

**No special carve-out** for applicant/prospect data exists in UU PDP or PP 33/2026 (searched both texts for pelamar/tenaga kerja/prospect; only generic rules). Applicants are ordinary data subjects. Two things *do* bite recruitment specifically:
1. **Automated rejection / scoring is expressly flagged**: PP 33/2026 Pasal 93 elucidation lists **"penolakan pekerjaan" (rejection of a job)** as an example of a decision with "dampak signifikan" — so any AI ranking/screening of candidates falls under the **right to object to wholly-automated decisions** (UU PDP Pasal 15, PP 33/2026 Pasal 93–94: controller must have a mechanism to respond to objections and explain the technology and consequences). Also automated scoring is a mandatory **DPIA trigger** (Pasal 120(2)(a) and (d): "kegiatan evaluasi, penskoran, atau pemantauan yang sistematis").
2. **Purpose-limitation for "maybe later" profiles**: keeping rejected applicants in a talent pool is a *further purpose* — needs its own consent or a documented legitimate-interest balancing test (Pasal 20(2)(f) with Pasal 30(4) proportionality); otherwise processing must end when the recruitment purpose is achieved (UU PDP Pasal 42(1)(a)-(b): end processing when retention period reached, purpose achieved, or on request).

## 4. Data-subject rights and response deadlines

| Right | Source | Deadline |
|---|---|---|
| Information on what is processed (pre-consent disclosure) | UU Pasal 21; PP33 Pasal 33 | before consent |
| Update/correct inaccurate data | UU Pasal 30(1) | **≤ 3×24 jam** after receiving request; result must be communicated (30(2)) |
| Access to processed data + processing history | UU Pasal 32; PP33 Pasal 77 | **≤ 3×24 jam** (access; timing for copies announced within 3×24 jam, PP33 Pasal 78) |
| End processing / delete / destroy own data | UU Pasal 16, 43–45; PP33 Pasal 79 | on request; erasure/destruction then **must be notified to the subject** (UU Pasal 45) |
| Withdraw consent → stop all processing | UU Pasal 40; PP33 Pasal 92 | **≤ 3×24 jam** after verified request |
| Restrict/suspend processing | UU Pasal 41; PP33 §§94+ | **≤ 3×24 jam**; refusals also communicated ≤3×24 jam with reasons (PP33) |
| Object to purely automated decisions | UU Pasal 15; PP33 Pasal 93–94 | mechanism + meaningful explanation required |
| Portability (get/move data to another controller) | PP33 Pasal 111 | only where basis = consent/contract and processing automated |
| Compensation for breaches | UU Pasal 13 | civil claim |

Requests may be verified proportionately (PP33 Pasal 25) and refused only per regulation; if the controller ignores requests, the subject **complains to the Lembaga** (PP33 Pasal 27).

## 5. Retention limits & deletion duties

- **No fixed statutory retention period for CVs** in UU PDP/PP33. Retention must be justified by purpose (UU Pasal 16(3): delete/destroy when purpose achieved or period ends, unless other law requires storage).
- **Mandatory written retention policy** (PP33 Pasal 75): the controller must set Masa Retensi in a policy document containing at minimum: definition & periods; archival-retention rules; subjects covered; data types/components; de-identification rules for statistics/research; **destruction methods (electronic & nonelectronic)**; processor rules; responsible person; documentation/notification; legal basis where retention is legally required. (Elucidation: retention covers how data is stored and managed; PP33 Pasal 84 elucidation: free-of-charge erasure where no legal retention duty.)
- Lifecycle duties (UU PDP): **pengakhiran** when retention ends/purpose achieved/requested (Pasal 42); **penghapusan** when no longer needed, consent withdrawn, requested, or unlawfully obtained (Pasal 43); **pemusnahan** when retention schedule says destroy or on request, provided not needed for legal proceedings (Pasal 44); notify the subject of deletion (Pasal 45).
- **Practical defaults for us:** applicant profile 180 days from submission; **selfie video deleted ≤30 days after a human decision** (it has the highest risk and shortest necessity); talent-pool retention only with separate opt-in consent, e.g. 12 months, with easy revoke → 3×24h stop.

## 6. Breach notification duties & timelines

- **3×24 hours, written, to BOTH data subjects and the Lembaga**, from the failure being "diketahui secara pasti, patut, dan wajar" (UU Pasal 46; PP33 Pasal 114). Content minimum (UU 46(2), PP33 114(3)-(4)): data disclosed; when & how disclosed; handling/recovery efforts; **plus PPDP/contact person info**.
- **Public notification** if the breach disrupts public services or seriously affects public interest (UU 46(3), PP33 Pasal 115).
- Incident **documentation** required and reportable to the Lembaga (PP33 Pasal 116); internal prevention/handling **policy/procedure** required (Pasal 117); further detail to be delegated to Peraturan Lembaga (Pasal 119).
- Secure-confidentiality obligation applies to processors/cloud too (PP33 Pasal 125).

## 7. Cross-border / hosting rules

- **No blanket data-localization for private-scope operators.** PP 71/2019 **Pasal 20**: only *PSE Lingkup Publik* must manage/process/store electronic systems and data **in Indonesia** (exception: storage technology unavailable domestically, assessed by an inter-ministry committee). **Pasal 21**: *PSE Lingkup Privat* **may store in Indonesia and/or abroad**, but if abroad must (a) ensure **effectiveness of supervisory access** by ministries/agencies and law enforcement, and (b) grant **access to the system and data** for oversight/enforcement (PP 71/2019 PDF Pasal 20–21; Komdigi's own explainer: https://www.komdigi.go.id/berita/berita-kominfo/detail/pp-no-71-tahun-2019-beri-kepastian-hukum-kepada-pelaku-usaha — localization duty applies to PSE publik).
- The PMSE 5/2020 registration form forces you to declare **where data is processed/stored** and to **guarantee access** (Pasal 3(4) huruf g–i). For supervisory requests, private PSEs must respond to ministry/agency access requests within **5 calendar days** (PMSE 5/2020 Pasal 29–31) and within 5 days for criminal-law-enforcement access (Pasal 39–41; as amended by PM 10/2021 — verify current consolidated text before relying on specific articles).
- **PDP-law layer (regardless of hosting):** storing a candidate's data on offshore cloud = "transfer ke luar wilayah hukum NKRI". Permitted under UU Pasal 56 + PP33 Pasal 160–165 under a **3-tier test**: (1) destination country has **equivalent or higher** protection → ok; else (2) **adequate, binding protections** (contractual/technical/organizational — PP33 Pasal 161: transfer mapping, minimisation, identification & effectiveness-assessment of the legal instrument, supplementary instruments, periodic re-evaluation; Pasal 162 legal-instrument assessment incl. storage location, onward-transfer risk, encryption/pseudonymisation formats; Pasal 163 risk assessment); else (3) **data-subject consent** — plus (Pasal 164) **inform the subject before the transfer** (purpose, protective instrument, how rights remain enforceable, risks & mitigations). Practical reading for us: a DPA with AWS/GCP + encryption at rest + documented transfer assessment satisfies tier (2); disclosing "servers located in X" in the consent screen covers Pasal 164. The Lembaga will accredit adequacy (Pasal 165(4)); while that machinery is new, tier-2 contractual protection is the workable route.

## 8. PSE registration (Komdigi) and the pre-launch demo risk profile

- **Who must register:** *every* PSE Lingkup Privat, **before the system is used by users** (PP 71/2019 Pasal 6(1)-(2); PMSE 5/2020 Pasal 2–3), filed **via OSS** (PP71 Pasal 6(3); PMSE Pasal 3(2)). It applies **extraterritorially**: the elucidation covers PSEs whose systems are "dipergunakan di wilayah Indonesia, dan/atau ditawarkan di wilayah Indonesia" (PP 71/2019, Penjelasan Pasal 2). Foreign-hosted ≠ exempt; foreign PSEs available to Indonesian users must register and guarantee supervisory access (PMSE 5/2020; PP71 Pasal 21).
- **Registration data** (PMSE 5/2020 Pasal 3(3)-(4)): general operation description (name, sector, URL, domain/IP, business model, functions), **personal data processed**, **storage location**, access-guarantee statement. Non-OSS channel requires legal-entity details incl. NPWP, deed, and controller's NIK+phone (Pasal 3(5)) — i.e. you need a real PT/CV entity to register.
- **Enforcement:** unregistered PSEs face administrative sanctions up to **pemblokiran** (access denial) by Komdigi (PMSE 5/2020 sanctions chapter; cf. Telegram 2016 and game/App blocks historically). For a **private, closed demo with a handful of testers pre-launch**, practical risk is very low: registration is enforced at scale against services publicly operating in Indonesia; no known enforcement against closed pilots. But the moment you offer the app to Indonesian companies/candidates commercially, registration is a cheap (free, via OSS) and clearly expected step — do it before launch, not after a complaint.

## 9. Penalties summary

**Administrative** (UU Pasal 57; PP33 Pasal 183–184+): written warning; temporary suspension of processing; forced deletion/destruction; **fine up to 2% of annual income/revenue** on the violation variable. PP33 (Pasal 183(6), 184) adds proportionality factors — including **skala usaha** (business scale) — and allows fines set down to **Rp0 / 0%** with considerations; multiple sanctions may stack; further procedure per Peraturan Lembaga. (Eligible violations include: no lawful basis, consent-disclosure failures, correction/access/response-deadline failures, deletion failures, breach-notice failures, security failures, cross-border failures.)
**Criminal** (UU Pasal 67–70): unlawfully collecting personal data not your own for gain causing harm — **5 yrs / Rp5 B**; unlawful disclosure — **4 yrs / Rp4 B**; unlawful use — **5 yrs / Rp5 B**; falsifying data — **6 yrs / Rp6 B**; additional penalties (forfeiture of profits, compensation). **Corporations**: fine up to **10× the maxima**, plus business suspension/prohibition/company closure (Pasal 70). Note MK 151/PUU-XXII/2024 conditioned the constitutionality of the wording of Pasal 53(1)(b) (false-data crime element read as "dan/atau").
**Civil:** damages to data subjects (UU Pasal 13; tort under KUHP/1365 KUHPerdata).

## 10. MVP-safe vs must-have-for-commercial

**Demo/MVP (real users, minimal legal exposure) can safely:**
- use **fake/synthetic data** for anything shown publicly — then no personal data, no obligations at all;
- with a small real pilot: single-purpose consent screen meeting §2 (separate from ToS), adults-only, no NIK, no biometric matching, no automated rejection, human review of videos, 180-day/30-day auto-deletion defaults, one delete/opt-out email answered within 3×24h, HTTPS + encrypted-at-rest storage, documented incident contact, disclosure that data is stored on [cloud, region].

**Must be in the commercial product (before/at launch):**
- PSE registration via OSS (§8) incl. declared data items & storage location;
- consent **records** kept as proof (PP33 Pasal 36), versioned disclosure texts, withdrawal pipeline ≤3×24h;
- **retention policy document** (PP33 Pasal 75) + automated penghapusan/pemusnahan with subject notification;
- rights-handling SLA endpoints (akses/salinan ≤3×24h, koreksi, batasi, hapus, portabilitas) with request-verification;
- **DPIA** — mandatory here: specific/biometric data, large-scale, and systematic scoring all trigger it (PP33 Pasal 120);
- breach runbook: 3×24h notices to subjects + Lembaga, documentation (Pasal 114–117);
- cross-border transfer assessment + DPA with cloud/processors (Pasal 160–165, 125);
- human-in-the-loop for any candidate scoring + objection mechanism + explanation of automated logic (Pasal 93–94);
- consider appointing PPDP — *not mandatory* for a small operator unless public-service processing, large-scale regular monitoring, or large-scale specific-data core business (UU Pasal 53, PP33 Pasal 142; details await Peraturan Lembaga).

## Practical checklist for our demo

- [ ] **Consent screen in Bahasa, standalone checkbox** (not tied to ToS). Must state: who we are + contact; what data (CV, sertifikat, foto, video perkenalan ±1 menit); purpose (seleksi posisi — human review); basis (persetujuan eksplisit); retention ("profil 180 hari, video dihapus ≤30 hari setelah seleksi, tanpa perpanjangan otomatis"); where hosted (cloud provider + region) + transfer notice; candidate rights + how to exercise (email/dashboard); **separate optional toggle** "simpan profil saya di talent pool maks. 12 bulan". (UU Psl. 21; PP33 Psl. 32–35)
- [ ] **Log consent** (timestamp, text version, scope) — Pasal 36 PP33.
- [ ] **NIK: don't collect.** Not needed for a demo, high breach-value, and regulators scrutinize it. Add only at commercial stage with explicit necessity (identity check after offer), encrypted, purpose-bound.
- [ ] Photos/videos = **no face-matching / no AI scoring** in demo (keeps it out of biometric/specific-data territory and avoids the Pasal 93 automated-rejection problem; decisions stay human).
- [ ] **Retention defaults:** auto-purge profiles at 180 days; auto-delete intro videos ≤30 days after decision; hard-delete on request ≤3×24h and confirm to the person. Write the 1-page retention policy now (PP33 Pasal 75 items a–j).
- [ ] One **rights+incident contact email**, monitored; answer any request within 3×24h (build the 3×24h muscle early).
- [ ] Basic security: TLS, encrypted at rest, least-privilege admin access, access logging; a 1-page incident response note (what data, when/how, recovery — Pasal 46/114 content).
- [ ] Prefer **Indonesia-region cloud** anyway (cheap to do, moots most transfer questions); foreign region is legally OK for private-scope but document the Pasal 160–165 basis.
- [ ] Real data only from consenting pilot users; everything shown in marketing/screenshots = synthetic.
- [ ] **Before commercial launch: register PSE via OSS** (needs your legal entity), then DPIA, processor DPAs, full rights endpoints, breach flow to Lembaga.
- [ ] Watch dates: PP 33/2026 becomes effective **16 Jan 2027**; UU PDP has been fully binding since 17 Oct 2024; Lembaga details ("Peraturan Lembaga") will follow — re-check this file after those are issued.
