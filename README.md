# Zara Frontend Challenge — Mobile Phone Catalogue

A mobile phone catalogue single-page application with product listing, real-time search, detail view, and a persistent shopping cart. Built with React 18, TypeScript, and TanStack Query.

## Live demo

**Live demo:** https://frontend-zara-woad.vercel.app

## Tech stack

| Layer               | Technology                           | Why                                                                                                                                                                                            |
| ------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bundler             | Vite 5                               | Industry standard for React, fast HMR, built-in dev/prod modes                                                                                                                                 |
| Framework           | React 18                             | Required. Concurrent features, stable ecosystem                                                                                                                                                |
| Language            | TypeScript (strict)                  | Type safety across the full data flow from API types to component props                                                                                                                        |
| Routing             | React Router v7                      | Declarative, supports lazy loading, most widely adopted                                                                                                                                        |
| Server state        | TanStack Query v5                    | Correct separation of server vs client state. Handles caching, deduplication, loading and error states automatically. A `staleTime` of 5 minutes replaces a manual cache with zero custom code |
| Global client state | React Context + reducer              | The cart is client state — it does not come from the server. Context + reducer is the correct, lightweight solution for a single shared concern                                                |
| Styling             | SCSS Modules + CSS custom properties | Scoped styles, nesting support, design tokens via variables — no runtime cost                                                                                                                  |
| Testing             | Vitest + React Testing Library + MSW | Fast, Jest-compatible API. MSW intercepts at the network level — tests exercise the real fetch path                                                                                            |
| Linting             | ESLint + Prettier                    | Required by the challenge. Enforced on every commit via Husky + lint-staged                                                                                                                    |
| Node version        | 20                                   | The challenge references Node 18, which reached end of life in April 2025. Vitest 4.x requires Node 20+ (`node:util.styleText`, introduced in 20.1.0)                                          |

## Architecture decisions

**Why the controller pattern — and why not on CartPage**

`ProductDetailPage` and `ProductListPage` have real orchestration logic: a query hook, local state for the selected colour and storage option, derived values, side effects, and navigation handlers. Extracting this into a `useProductDetailController` / `useProductListController` hook makes each piece independently testable and keeps the page component a pure rendering concern. `CartPage` does not have the same problem: it reads two values from context, calls `removeItem`, and navigates. That fits cleanly in the component itself. A controller there would be structural symmetry for its own sake, not a separation of responsibilities.

**Why TanStack Query instead of useEffect + fetch**

Server state and client state are different problems. TanStack Query handles caching, request deduplication, stale-while-revalidate, and loading and error states declaratively. The `staleTime` of 5 minutes means navigating back to the product list from a detail page is instant — no spinner, no second request. Implementing this manually with `useEffect + useState + useRef` produces fragile code that is hard to test correctly, and any homegrown cache would re-solve a solved problem.

**Why structure by type and not by feature**

This is a three-page application. A feature-folder structure (`features/phones`, `features/cart`) would add directory overhead with no proportional benefit at this scale. Each folder in the current structure maps to a single responsibility: `pages/` owns route-level components, `components/` owns reusable UI, `hooks/` owns standalone logic, `lib/api.ts` owns transport. If the application grew to ten domains, the answer would be different.

## Project structure

```
src/
  pages/          Route-level components and their controllers
  components/     Reusable UI components, each with its own SCSS module
  hooks/          Standalone hooks: useDebounce, useSearch, useCart, usePageTitle
  lib/            Pure fetch functions — no React, no state
  context/        CartContext with reducer and localStorage persistence
  mocks/          MSW handlers, server setup, and test fixtures
  types/          All TypeScript interfaces in one place
  constants/      All magic values and environment variable access
  styles/         Global CSS reset and design token variables
  utils/          Pure utility functions (url.ts — toHttps)
```

## Getting started

**Prerequisites:** Node 20 (see `.nvmrc`).

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and fill in VITE_API_BASE_URL and VITE_API_KEY

# Start development server
npm run dev

# Run tests
npm run test:run

# Production build
npm run build && npm run preview
```

## Environment variables

| Variable            | Description                                 | Required |
| ------------------- | ------------------------------------------- | -------- |
| `VITE_API_BASE_URL` | Base URL for the smartphones API            | Yes      |
| `VITE_API_KEY`      | Sent as `x-api-key` header on every request | Yes      |

## Testing strategy

Tests follow a risk-first approach rather than a line-coverage target. The cart reducer is pure logic with the highest density of edge cases — adding, removing, and deduplicating items — so it is tested exhaustively. The debounce and search hooks are tested for timing behaviour. Integration tests for each page exercise the complete fetch path: MSW intercepts at the network level, so the real `fetch` call, the query hook, and the rendered output are all part of the assertion. Simple presentational components are tested for what they render, not for implementation details.

| Layer                 | Coverage |
| --------------------- | -------- |
| `lib/api.ts`          | 100%     |
| `context/CartContext` | 97%      |
| `hooks/`              | 100%     |
| `components/`         | 100%     |
| `pages/`              | 97%      |
| Overall               | 97%      |

## CI/CD

The pipeline runs on every push and pull request to `main` via GitHub Actions (`.github/workflows/ci.yml`).

**Steps, in order:**

1. Check out the repository and set up Node using the version in `.nvmrc`
2. `npm ci` — clean install from the lock file
3. `npm run lint` — ESLint with `--max-warnings 0`
4. `npm run format:check` — Prettier in check mode
5. `npm run test:run` — full test suite via Vitest
6. `npm run build` — production build via Vite

Lint and format run before tests deliberately: a formatting issue should fail fast without spending time on a full test run.

The pipeline has no deploy step. Deployment is handled by Vercel, which triggers automatically on push to `main` via its GitHub integration.

**Required repository secrets** (Settings → Secrets and variables → Actions):

| Secret              | Used in                |
| ------------------- | ---------------------- |
| `VITE_API_BASE_URL` | `test:run` and `build` |
| `VITE_API_KEY`      | `test:run` and `build` |

Both are needed at test time because MSW matches handlers against the URL constructed from `VITE_API_BASE_URL`. Without the variable, the fetch goes to `undefined/products` and no handler intercepts it.

## Accessibility

The application uses semantic HTML throughout: `<header>`, `<main>`, `<article>`, `<dl>`, and `<fieldset>` for the colour and storage selectors. Every interactive element has an `aria-label`. Colour swatches use `aria-pressed` to communicate selection state. The application meets WCAG 2.1 AA contrast ratios and is fully keyboard-navigable. `prefers-reduced-motion` is respected globally in `globals.css`, disabling non-essential animations for users who opt out.

## Requirements checklist

- [x] Phone list view with search and result count
- [x] Phone detail view with colour and storage selectors
- [x] Cart view with localStorage persistence
- [x] Responsive design (mobile, tablet, desktop)
- [x] Accessibility (WCAG 2.1 AA)
- [x] Testing
- [x] ESLint + Prettier
- [x] Clean browser console (no errors or warnings)
- [x] Development mode (unminified assets)
- [x] Production mode (minified and bundled)
- [x] CSS custom properties (optional — implemented)
- [x] Deployment (optional — see live demo)
