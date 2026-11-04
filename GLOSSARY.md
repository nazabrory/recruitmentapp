# Recruitment SaaS (working name TBD)

End-to-end recruitment backbone for Indonesian small-to-medium companies: candidates apply through a shared link, companies run screening, tests, and interviews on one pipeline, and each hiring campaign is bought as a one-off subscription. Vocabulary is inherited from the offline prototype (`Reference/`) where the concepts carried over.

## Language

**Company**:
An organization that buys the product and owns its campaigns; one isolated workspace per company.
_Avoid_: Tenant, customer account, client

**Campaign**:
A single hiring drive run by a Company (one or more open positions, one applicant pool, one funnel); the unit that is sold, paid for, and demoed.
_Avoid_: Job, posting, project, requisition

**Coordinator**:
The Company-side role that configures a Campaign, owns consolidation, exports, and billing.
_Avoid_: Admin, recruiter, owner, HR user

**Assessor**:
A designated evaluator (technical or HR) assigned to review candidates and record evaluation decisions; sees candidates and casts ballots only.
_Avoid_: Reviewer, judge, grader, interviewer

**Candidate**:
A person applying to a Campaign through a shareable link; holds no account by default, with an optional lightweight account for status checking and saving progress.
_Avoid_: Applicant, user, jobseeker

**Application**:
A Candidate's submission to one Campaign: form answers, uploaded documents, and an optional Intro Video; persists via the browser session without an account.
_Avoid_: Submission, profile, resume drop

**Intro Video**:
A roughly one-minute selfie video a Candidate records in the browser, showcasing motivation and communication; shown in the swipe screening flow.
_Avoid_: Video CV, showreel

**Job Requirements**:
The plain-language description of what a role needs, entered by the Coordinator; the raw material the AI uses to draft a Rubric.
_Avoid_: Job ad, vacancy text, spec

**Rubric**:
The per-Campaign scoring model: criteria, weights, and thresholds. AI drafts it from the Job Requirements; only a human edits or approves it.
_Avoid_: Scoring model, matrix, criteria set

**Screening Brief**:
An AI-produced one-screen reading of a Candidate's materials (CV, certificates, video): facts, evidence, gaps, and flags. Input to a decision, never a decision.
_Avoid_: AI score, summary, verdict

**Suggested Score**:
A number and rationale the AI proposes against the Rubric, visibly advisory; a human assigns the real Candidate Decision.
_Avoid_: AI rating, auto-score, ranking decision

**Candidate Decision**:
The categorical screening state assigned to a Candidate by a human: `Accept` (advance), `Hold` (reserve), or `Reject` (dismissed). AI may suggest it; never assign it.
_Avoid_: Status, swipe result, vote

**Ballot**:
One Assessor's structured record of Candidate Decisions, bookmarks, and private notes for a Campaign.
_Avoid_: Feedback form, review sheet, vote sheet

**Deliberation**:
The alignment step where split decisions across Assessor Ballots are reviewed to reach the agreed shortlist.
_Avoid_: Calibration meeting, sync-up, grading session

**Technical Test**:
An optional Campaign stage with a Coordinator-chosen format: in-app exam, handwritten work photographed and uploaded, FGD invitation, or skipped entirely.
_Avoid_: Exam (unless specifically the in-app format), assessment

**In-app Exam**:
A Technical Test format taken inside the product: timed questions authored by the Company with per-question rubrics, answered and graded on-screen.
_Avoid_: Online test, quiz

**FGD**:
Focus Group Discussion: a grouped interview-discussion stage companies invite Candidates to instead of, or alongside, a Technical Test.
_Avoid_: Group interview (acceptable synonym), panel

**Pipeline**:
The ordered stages a Candidate moves through within a Campaign: Applied → Screened → Test → Interview → Offer → Hired (Test optional; stages skippable).
_Avoid_: Funnel, workflow, Kanban

**Interview Session**:
A scheduled human interview hosted on an external tool (Zoom, Google Meet, Teams); the product owns scheduling records, links, and scorecards, not the call itself.
_Avoid_: Video call, meeting

**Campaign Subscription**:
The one-off payment that unlocks a Campaign for one Company: flat scope up to a Candidate cap, with paid overage slots and an invoice path for larger buyers.
_Avoid_: Plan, license, seat pricing

**Overage**:
Additional candidate slots purchased when a Campaign nears its Candidate cap; the Campaign is never cut off mid-flow without notice.
_Avoid_: Upsell, extra quota

**Backbone Principle**:
Standing product rule: the app centralizes the recruitment record but integrates with third-party tools (calls, payments, email) rather than rebuilding them.

**Human-Decides Principle**:
Standing product rule: AI reads, summarizes, suggests and drafts; every judgment affecting a Candidate's fate is made by a named human.
