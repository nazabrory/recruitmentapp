# Recruitment SaaS (working name TBD)

End-to-end recruitment backbone for Indonesian small-to-medium companies: candidates apply through a shared link, companies run screening, tests, and interviews on one pipeline, and each hiring campaign is bought as a one-off subscription. Vocabulary is inherited from the offline prototype (`Reference/`) where the concepts carried over.

## Language

**Company**:
An organization that buys the product and owns its campaigns; one isolated workspace per company.
_Avoid_: Tenant, customer account, client

**Campaign**:
A Company’s hiring drive for one role, with one or more openings and a shared application link, Rubric, and Pipeline.
_Avoid_: Job, posting, project, requisition

**Coordinator**:
The Company-wide role that manages Campaigns, staff assignments, exports, and billing and records final screening decisions.
_Avoid_: Admin, recruiter, owner, HR user

**Assessor**:
A technical or HR evaluator who reviews Applications, submits Ballots, and grades Technical Tests in assigned Campaigns.
_Avoid_: Reviewer, judge, grader, interviewer

**Candidate**:
A person applying to one or more Campaigns. Each Campaign has its own Application for that person.
_Avoid_: Applicant, user, jobseeker

**Application**:
A Candidate’s record of applying to one Campaign, from draft through hiring. It contains their form answers, uploaded documents, and optional Intro Video.
_Avoid_: Submission, profile, resume drop

**Intro Video**:
An optional short video in which a Candidate introduces themselves and shares their motivation for the role.
_Avoid_: Video CV, showreel

**Job Requirements**:
The plain-language description of what a role needs, entered by the Coordinator; the raw material the AI uses to draft a Rubric.
_Avoid_: Job ad, vacancy text, spec

**Rubric**:
The Campaign’s scoring criteria, weights, and thresholds. The Coordinator approves each version before it is used to score Applications.
_Avoid_: Scoring model, matrix, criteria set

**Screening Brief**:
An AI-produced summary of one Application’s materials that cites evidence for material claims and identifies gaps for human screening.
_Avoid_: AI score, summary, verdict

**Suggested Score**:
An advisory assessment of an Application against an approved Rubric version, with evidence and rationale for each criterion and a weighted total when all criteria are resolved.
_Avoid_: AI rating, auto-score, ranking decision

**Candidate Decision**:
The final screening outcome the Coordinator records for an Application: `Accept` (advance), `Hold` (reserve), or `Reject` (dismissed).
_Avoid_: Status, swipe result, vote

**Ballot**:
One Assessor’s record of screening recommendations, bookmarks, and private notes for Applications in a Campaign.
_Avoid_: Feedback form, review sheet, vote sheet

**Deliberation**:
The alignment step where split decisions across Assessor Ballots are reviewed to reach the agreed shortlist.
_Avoid_: Calibration meeting, sync-up, grading session

**Technical Test**:
An optional Campaign stage in which Candidates complete an In-app Exam or submit photos of handwritten work.
_Avoid_: Exam (unless specifically the in-app format), assessment

**In-app Exam**:
A Technical Test format taken inside the product: timed questions authored by the Company with per-question rubrics, answered and graded on-screen.
_Avoid_: Online test, quiz

**FGD**:
Focus Group Discussion: a group Interview Session that can follow screening or a Technical Test.
_Avoid_: Group interview (acceptable synonym), panel

**Pipeline**:
The sequence of hiring stages an Application can move through within its Campaign: Applied → Screened → Test → Interview → Offer → Hired. Stages can be skipped and the Technical Test is optional.
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
