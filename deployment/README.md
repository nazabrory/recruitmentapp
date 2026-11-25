# Cloudflare Pages

Pages builds the React showcase from the repository root with `npm run build` and serves `dist`. The repository pins the Node.js version. The Git integration publishes `main` to the project hostname and creates preview deployments for the other branches, with preview links on pull requests.

## Connect the repository

In the team's Cloudflare account, open **Workers & Pages → Create application → Pages → Connect to Git**. Authorize the Cloudflare GitHub installation for `nazabrory/recruitmentapp`. Select that repository. Enter the settings in [pages-project.json](pages-project.json), keep the repository root, and select **Save and Deploy**. If the project already exists, open its build settings and check the repository, branch controls, command and output directory there. [Cloudflare Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/)

For a repository already authorized through the Cloudflare GitHub installation, the JSON file can also be submitted directly to the project creation API. Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in your shell using the team's secret manager. The token needs Pages Write for the selected account. Run this once from the repository root when creating the project. [Cloudflare Pages project API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/create/)

```sh
curl --fail-with-body --silent --show-error \
  --request POST \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN:?}" \
  --header 'Content-Type: application/json' \
  --data-binary @deployment/pages-project.json \
  "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID:?}/pages/projects" \
  | jq '{success, errors, subdomain: .result.subdomain}'
```

## Verify and record the deployment

1. From a clean checkout, run `npm ci` and `npm run build`. Confirm `dist/index.html` and the bundled samples exist.
2. In Pages **Deployments**, match the successful integration preview to the Git commit. Copy its unique HTTPS URL. Verify that URL against the same commit's browser tests with `SHOWCASE_URL="<preview URL>" npm test`.
3. After the integrated code reaches `main`, confirm the production deployment's commit in Pages. Run the same browser tests against the assigned project hostname. Record the actual preview and production URLs, commits and results on [deployment ticket #17](https://github.com/nazabrory/recruitmentapp/issues/17).
4. Use the verified deployment for the two human checks in [rehearsal ticket #24](https://github.com/nazabrory/recruitmentapp/issues/24). Record reviewer, language, duration for the walkthrough, and outcome.
