# YAH Website

SvelteKit 2 + Svelte 5 + Storyblok CMS site for Youth Alliance for Housing.

## Tech Stack

- SvelteKit 2, Svelte 5
- Storyblok (headless CMS)
- Tailwind CSS v4
- TypeScript

## Setup

```bash
npm install
cp .env.example .env
# Add your Storyblok token to .env
npm run dev
```

Visit http://localhost:5173

## Environment Variables

```bash
VITE_STORYBLOK_TOKEN=your_token_here
VITE_STORYBLOK_IS_PREVIEW=true  # true for dev/preview, false for production
```

**Tokens:**
- Dev/preview: Use Preview token from Storyblok
- Production: Use Public token

## Deployment

Two branches:
- `main` - production (www.y4h.org)
- `preview` - preview environment

Set env vars in Vercel for each environment.

## Storyblok Setup

See [STORYBLOK_SETUP_GUIDE.md](./STORYBLOK_SETUP_GUIDE.md) for component setup.

## Languages

Site supports English (`/en`) and Spanish (`/es`). Default is English at `/`.

## Maintenance

Dependabot runs weekly for minor updates. GitHub Actions creates maintenance reminder issues quarterly and yearly with automated version checking.

## Guides

- [STORYBLOK_SETUP_GUIDE.md](./STORYBLOK_SETUP_GUIDE.md) - Storyblok component setup
- [SVELTEKIT_GUIDE.md](./SVELTEKIT_GUIDE.md) - SvelteKit patterns
- [SVELTE_RUNES_GUIDE.md](./SVELTE_RUNES_GUIDE.md) - Svelte 5 runes

## Type Check

```bash
npm run check
```
