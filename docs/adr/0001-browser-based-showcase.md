# Run the recruitment showcase in each visitor’s browser

The showcase follows one synthetic Campaign through the Candidate, Assessor, and Coordinator roles. Each browser keeps its own resettable copy of the Campaign, including changes across role switches and page refreshes. Presenters on different devices can run independent walkthroughs.

Build one React and TypeScript app with Vite in the project repository. Keep Bahasa Indonesia and English translations together. Bundle sample documents, video clips, and precomputed AI outputs with the app, and simulate email and billing. Use Cloudflare Pages for pull request previews and publish the main branch at the project’s free HTTPS `pages.dev` address.

For a live pilot, keep the screens and Campaign rules. Evaluate Supabase first for shared PostgreSQL records, database-enforced Company and Campaign access, private Candidate files, and staff sign-in. Add real email and server-side AI processing. Before provisioning, check the combined cost of hosting, storage, email, and AI against the roughly US$30 monthly ceiling.

[Architecture decision](https://github.com/nazabrory/recruitmentapp/issues/15)
