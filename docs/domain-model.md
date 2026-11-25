# Recruitment domain model

See the [glossary](../GLOSSARY.md) for terms and the [Campaign lifecycle decision](https://github.com/nazabrory/recruitmentapp/issues/8) for context.

## Campaigns and Applications

- A Company owns its Campaigns. Each Campaign hires for one role and can fill multiple openings for that role. For example, two junior geologist openings share a Campaign, while an HR officer opening has its own.
- Each Campaign has its own application link, Job Requirements, Rubric, and Pipeline. The Job Requirements are the basis for the AI-drafted, human-approved Rubric.
- A Candidate can apply to multiple Campaigns at the same Company or at different Companies. Each Application has its own materials, Screening Brief, Suggested Score, and decisions. Staff see materials through the Campaigns they can access.
- A Candidate has one Application per Campaign. A repeat visit resumes the existing Application.

## Company onboarding and staff access

- For the first pilots, we create the Company workspace and invite its first Coordinator. The Coordinator can then create Campaigns and invite Assessors. Self-serve Company signup is deferred until we have observed how pilot Companies get started.
- Coordinators manage Campaigns, staff assignments, exports, and billing within their own Company. Assessors can access only their assigned Campaigns, where they review Candidate materials and record their own Ballots and test assessments. Each Company grants staff access separately.
- An Assessor receives an invitation and signs in using a link sent to the invited email address. The Assessor’s identity within the Company ties them to one Ballot per Campaign.
- The showcase uses a seeded Company and a role switcher. See the [Company roles and onboarding decision](https://github.com/nazabrory/recruitmentapp/issues/12).

## Candidate intake

- Candidates can apply without an account. Progress is saved in the current browser. An emailed link resumes the same Application on another device or after cookies are cleared. Optional Candidate accounts are deferred.
- Name, email, and CV form the standard Application. The Coordinator can add a small set of role-specific questions and require supporting documents when the role calls for them.
- Candidates can upload, preview, replace, or skip their optional Intro Video before submitting. Give them a short prompt. Revisit built-in recording if the pilot needs it.
- Submission shows immediate confirmation. Candidates can return via an emailed link to a status page showing milestones the Coordinator has shared, such as Application received, Interview invited, or Decision sent. Ballots, Suggested Scores, and staff notes remain internal.
- The interactive showcase uses sample inputs and video clips with simulated email. See the [Candidate intake decision](https://github.com/nazabrory/recruitmentapp/issues/9).

## Campaign lifecycle

| State | What happens |
| --- | --- |
| Draft | The Coordinator prepares the Campaign before it accepts Applications. |
| Accepting applications | The application link accepts submissions. Staff can screen Applications as they arrive. |
| Reviewing | The link stops accepting submissions. Staff can finish screening, Technical Tests, interviews, and offers. |
| Closed | Active hiring ends. The Campaign record remains available for review and export. |

The Campaign moves from Draft to Accepting applications, then Reviewing and Closed. Every Application moves through the Campaign’s Pipeline on its own timeline. A Campaign Subscription unlocks one Campaign for its Company. Payment and unlock details belong to the [payment mechanics decision](https://github.com/nazabrory/recruitmentapp/issues/14).

## Evaluation

Each Assessor submits Accept, Hold, or Reject recommendations independently on their Campaign Ballot. The Coordinator opens Deliberation so assigned Assessors can compare submitted recommendations and test assessments. Private Ballot notes stay private. Teams can use the same Deliberation view together in person or on an external call.

The Coordinator records the final Candidate Decision. Only the Coordinator’s final Accept advances an Application past screening. Ballot tallies, Screening Briefs, and Suggested Scores inform that decision.

### AI screening

- Process submitted Applications in the background. Use a low-cost text model for the CV, Application answers, and legible supporting documents, with document recognition when scans need it. The Screening Brief cites a source for each material claim and flags missing or unreadable evidence. Assessors watch Intro Videos themselves.
- AI drafts Rubric criteria and weights from the Job Requirements. The Coordinator edits and approves the Rubric before scoring. Changes after scoring starts create a new version. Recalculate Suggested Scores across the Campaign before comparing them.
- The Suggested Score shows evidence and an explanation by criterion. The app computes the weighted total. Criteria with insufficient evidence are marked Needs review, and the total is withheld until a human resolves them.
- Show the Screening Brief and score breakdown alongside original materials in the swipe view. If AI processing fails or produces an incorrect Brief, staff can use the originals and continue screening.
- The interactive showcase uses precomputed AI outputs tied to sample documents. See the [AI screening decision](https://github.com/nazabrory/recruitmentapp/issues/10).

### Tests and interviews

- The Coordinator chooses one Technical Test format per Campaign or skips the test and proceeds directly to interviews. The Coordinator writes the questions and grading criteria for either format. The In-app Exam accepts typed answers within a time limit. Handwritten submissions accept photos, including diagrams, before a deadline. The product does not proctor tests.
- Assessors grade test responses against the Coordinator’s criteria. If AI transcribes a handwritten response, the Assessor checks the transcript against the original photo before using it. A Candidate’s response and test assessments belong to their Application.
- Test assessments are visible alongside each Assessor’s screening Ballot during Deliberation. The Coordinator records whether the Candidate advances. Test scores inform that decision.
- An Interview Session holds scheduling details and the external meeting link for one or more Candidates. An FGD is a group Interview Session that can follow screening or a Technical Test. Interview assessments belong to the relevant Applications.
- The interactive showcase demonstrates one synthetic handwritten submission with a diagram. It shows the photo and an uncertain transcription and lets an Assessor grade it. See the [Technical Test formats decision](https://github.com/nazabrory/recruitmentapp/issues/11).
