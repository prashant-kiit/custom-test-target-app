# custom-test-target-app

A static, frontend-only React app built as a practice target for Playwright (or any
browser automation) end-to-end testing. All data is mocked client-side — there is no
backend. Every interactive element carries a stable `data-testid` attribute.

## Sections

- **Forms** — text/email/password/number/date/range/file inputs, radios, checkboxes,
  a native select, client-side validation, and a simulated async submit.
- **Buttons** — click counters, disabled state, async/loading button, toggle button,
  double-click handler, exclusive button group, right-click context menu.
- **Modals** — confirm dialog, form modal, nested modals, non-dismissible alert.
- **Dropdowns** — native single/multi select, custom listbox, searchable autocomplete,
  multi-select with removable chips.
- **Table** — sortable/filterable/paginated table over 47 mock users, row selection
  with a bulk-action bar.
- **Dynamic Content** — on-demand loading with skeletons, a polling clock, toast
  notifications, debounced search, "load more" pagination, a progress bar, an
  element that appears after a delay, and a flaky action that fails every other click.
- **Navigation** — tabs (no URL change), nested routes with URL params + breadcrumbs,
  programmatic navigation, and an external link.

## Local development

```bash
npm install
npm run dev      # start dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Deployment

Pushes to `master` are built and deployed to Vercel production automatically via
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). Because it deploys
straight to the Vercel **production** environment/domain, the app's URL stays
constant across every redeploy — no need to update your Playwright suite's base URL.

### One-time setup

1. Install the Vercel CLI locally and link the project (creates `.vercel/project.json`,
   which is gitignored, and a Vercel project under your account):

   ```bash
   npm install -g vercel
   vercel login
   vercel link      # follow the prompts to create/select a project
   ```

2. Grab the IDs `vercel link` wrote to `.vercel/project.json`, and create a token at
   https://vercel.com/account/tokens.

3. Add three repo secrets (Settings → Secrets and variables → Actions):

   ```bash
   gh secret set VERCEL_TOKEN      # paste the token from step 2
   gh secret set VERCEL_ORG_ID     # "orgId" from .vercel/project.json
   gh secret set VERCEL_PROJECT_ID # "projectId" from .vercel/project.json
   ```

4. Push to `master` — the workflow builds with `vercel build --prod` and deploys with
   `vercel deploy --prebuilt --prod`, so the production domain is updated every time.

You can also trigger the workflow manually from the Actions tab (`workflow_dispatch`).
