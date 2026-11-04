# Issue tracker

- Provider: GitHub
- Repo: nazabrory/recruitmentapp
- CLI: `gh` (GitHub CLI)
- Issues URL: https://github.com/nazabrory/recruitmentapp/issues
- PRs as request surface: false

Notes:
- Create issues with `gh issue create`
- Skills read/write via GitHub API/CLI as configured

## Wayfinding operations

- **Map:** the single issue labelled `wayfinder:map`. Its body is the low-res view (Destination / Notes / Decisions so far / Not yet specified / Out of scope). Load the map, not every ticket.
- **Tickets:** child issues of the map, labelled `wayfinder:<type>` (`research` | `prototype` | `grilling` | `task`). Body format: `## Question` (+ optional context). Parent linkage uses GitHub **sub-issues** (`gh api .../sub_issues`).
- **Claim:** assign the ticket to the dev driving the map (`gh issue edit --add-assignee`) **before any work**. Open + unassigned = unclaimed.
- **Blocking:** GitHub **issue dependencies** where the API allows; otherwise a `Blocked by: #<n>` line at the top of the ticket body, checked manually. A ticket is unblocked when all blockers are closed.
- **Frontier query:** open children of the map, unassigned, no open blockers:
  `gh issue list --label wayfinder:grilling,wayfinder:research,wayfinder:prototype,wayfinder:task --state open --assignee none` then filter blockers.
- **Resolution:** post the answer as a comment (`gh issue comment`), close the issue (`gh issue close`), append one line (gist + markdown link by name) to the map's *Decisions so far* (`gh issue edit --body-file`, re-fetch body immediately before editing).
- **Assets** (research files, prototypes) live in the repo (`docs/research/`, `docs/prototype/`) and are linked from the ticket, never pasted in.

