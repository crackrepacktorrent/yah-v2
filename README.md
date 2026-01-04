# Youth Alliance for Housing - Website

A modern, headless CMS-powered website built with SvelteKit 2, Svelte 5, and Storyblok. This project provides a fully flexible content management system where content editors can build pages using a component-based approach without writing code.

## Technology Stack

- **Framework**: SvelteKit 2 (SSR-enabled)
- **UI Library**: Svelte 5 (with runes)
- **CMS**: Storyblok (Headless CMS)
- **Styling**: Tailwind CSS v4
- **Typography**: Rubik Variable Font
- **Language**: TypeScript
- **Components**: Custom component library + bits-ui
- **PDF Viewer**: PDF.js
- **Carousel**: Embla Carousel

## Features

### Content Management
- Fully headless CMS with Storyblok
- Real-time visual editing with Storyblok Bridge (in preview mode)
- Component-based page building
- Multi-language support (English, Spanish)
- Rich text editing with custom styling

### Components Library
The project includes a comprehensive component library that content editors can use to build pages:
- **Layout Components**: Page, Section, Grid
- **Content Components**: Text Section, Image, Video, PDF, Carousel
- **Interactive Components**: Card Grid (with search/sort), Card, Button (with dropdown)
- **Navigation**: Header with dropdown menus, Footer with social links
- **Utilities**: Separator (space/line)

### Styling Features
- Responsive typography (scales from 13px to 19px based on viewport)
- Custom CSS support at component and global levels
- CSS variables for theming
- CSS layers for proper specificity management
- Mobile-first responsive design

### Developer Features
- Type-safe load functions with SvelteKit
- Server-Side Rendering (SSR) for performance and SEO
- Environment-based configuration (preview vs. production)
- Custom parameter matchers for i18n routing
- Proper fetch handling for SSR compatibility

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn
- A Storyblok account with a configured space

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yah-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Storyblok token:
   ```bash
   # Get your token from Storyblok Settings > Access Tokens
   VITE_STORYBLOK_TOKEN=your_preview_token_here

   # Enable preview mode for local development (optional, defaults to preview in dev)
   VITE_STORYBLOK_IS_PREVIEW=true
   ```

   **Important**:
   - For local development, use your **Preview** token (allows draft content and Bridge editing)
   - For production deployment, use your **Public** token and set `VITE_STORYBLOK_IS_PREVIEW=false`

4. **Configure Storyblok**

   Follow the complete setup guide in [STORYBLOK_SETUP_GUIDE.md](./STORYBLOK_SETUP_GUIDE.md) to:
   - Create all required components
   - Set up languages
   - Create config and home stories
   - Configure the visual editor

### Development

Start the development server:

```bash
npm run dev

# Or start and open in browser
npm run dev -- --open
```

The site will be available at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Configuration

### Environment Variables

The project uses the following environment variables:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_STORYBLOK_TOKEN` | Storyblok API token (Preview or Public) | Yes | - |
| `VITE_STORYBLOK_IS_PREVIEW` | Enable preview/draft mode and Bridge | No | `false` (production) |

### Preview vs. Production Mode

**Preview Mode** (`VITE_STORYBLOK_IS_PREVIEW=true`):
- Fetches draft content versions
- Enables Storyblok Bridge for real-time editing in Visual Editor
- Required for content editing workflow
- Use Preview token from Storyblok
- Recommended for: Local development, staging/preview deployments

**Production Mode** (`VITE_STORYBLOK_IS_PREVIEW=false` or unset):
- Fetches only published content
- Disables Bridge (better performance)
- Use Public token from Storyblok
- Recommended for: Production deployments

### Deployment Setup

For a typical deployment workflow with preview and production environments:

1. **Preview Branch Deployment** (e.g., Vercel preview):
   ```bash
   VITE_STORYBLOK_TOKEN=your_preview_token
   VITE_STORYBLOK_IS_PREVIEW=true
   ```

2. **Production Deployment**:
   ```bash
   VITE_STORYBLOK_TOKEN=your_public_token
   VITE_STORYBLOK_IS_PREVIEW=false
   ```

## Project Structure

```
yah-v2/
├── src/
│   ├── lib/
│   │   ├── components/        # Storyblok components
│   │   │   ├── Page.svelte
│   │   │   ├── Section.svelte
│   │   │   ├── Grid.svelte
│   │   │   ├── TextSection.svelte
│   │   │   ├── Card.svelte
│   │   │   ├── CardGrid.svelte
│   │   │   ├── Button.svelte
│   │   │   ├── Image.svelte
│   │   │   ├── Video.svelte
│   │   │   ├── PDF.svelte
│   │   │   ├── Carousel.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── Separator.svelte
│   │   ├── components/ui/     # Base UI components (bits-ui)
│   │   ├── utils/             # Utility functions
│   │   │   └── storyblok-helpers.ts
│   │   └── lang.ts            # Language utilities
│   ├── routes/
│   │   └── [[lang=lang]]/     # Optional language parameter
│   │       ├── +layout.ts     # Layout load (config, header, footer)
│   │       ├── +layout.svelte # Layout component
│   │       └── [...slug]/     # Catch-all route for pages
│   │           ├── +page.ts   # Page load (story content)
│   │           └── +page.svelte
│   ├── params/
│   │   └── lang.ts            # Language parameter matcher
│   ├── app.css                # Global styles and theme
│   └── app.html               # HTML template
├── static/                    # Static assets
├── .env.example               # Environment variables template
├── README.md                  # This file
├── STORYBLOK_SETUP_GUIDE.md  # Storyblok configuration guide
├── SVELTEKIT_GUIDE.md         # SvelteKit concepts guide
├── SVELTE_RUNES_GUIDE.md      # Svelte 5 runes guide
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Key Concepts

### Routing

The project uses SvelteKit's file-based routing with:
- **Optional language parameter**: `[[lang=lang]]` - supports `/`, `/en`, `/es`
- **Catch-all route**: `[...slug]` - handles all page paths
- **Default fallback**: If no slug provided, loads "home" story

Examples:
- `/` → home page (default language)
- `/en` → home page (English)
- `/es` → home page (Spanish)
- `/en/about` → about page (English)
- `/es/recursos` → recursos page (Spanish)

### Data Loading

The application uses SvelteKit's load functions for data fetching:

1. **Layout Load** (`+layout.ts`): Fetches global configuration (header, footer, custom CSS)
2. **Page Load** (`+page.ts`): Fetches specific page content from Storyblok

All data fetching uses SvelteKit's enhanced `fetch` for:
- Server-Side Rendering support
- Automatic request deduplication
- Cookie/credential forwarding

### Component Registration

Components are registered in `+layout.ts` and mapped to Storyblok component names:

```typescript
storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  components: {
    page: Page,
    text_section: TextSection,
    card_grid: CardGrid,
    // ... more components
  }
});
```

### Responsive Typography

The project uses clamp-based responsive typography:
- Base font size scales from 13px (mobile) to 19px (desktop)
- All typography sizes use `rem` units to scale proportionally
- Defined in `/src/app.css` under the `@layer base` section

### Custom Styling

Three levels of custom styling:
1. **Global CSS**: Set in Storyblok config story (`custom_global_css` field)
2. **Component CSS**: Each component has a `custom_styles` field
3. **Image/Video CSS**: Separate fields for container and element styling

## Learning Resources

### Documentation
- [STORYBLOK_SETUP_GUIDE.md](./STORYBLOK_SETUP_GUIDE.md) - Complete Storyblok setup
- [SVELTEKIT_GUIDE.md](./SVELTEKIT_GUIDE.md) - SvelteKit concepts and patterns
- [SVELTE_RUNES_GUIDE.md](./SVELTE_RUNES_GUIDE.md) - Svelte 5 runes explained

### External Resources
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/what-are-runes)
- [Storyblok Documentation](https://www.storyblok.com/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

## Troubleshooting

### Common Issues

**Issue**: Storyblok Bridge not working in Visual Editor
- **Solution**: Ensure `VITE_STORYBLOK_IS_PREVIEW=true` is set
- Verify you're using a Preview token, not a Public token
- Check browser console for errors

**Issue**: Content not updating after publish
- **Solution**: Storyblok has caching. You may need to:
  - Clear cache in Storyblok settings
  - Wait a few minutes for CDN cache to expire
  - Hard refresh the browser (Ctrl+Shift+R)

**Issue**: SSR errors with "window is not defined"
- **Solution**: This usually means code is trying to access browser APIs during SSR
- Use `onMount()` for browser-only code
- Check that all API calls use SvelteKit's `fetch` from load functions

**Issue**: Styles not applying correctly
- **Solution**: Check CSS layer specificity
- Custom global CSS overrides base layer
- Component custom_styles override everything else

## Type Checking

Run type checking:

```bash
npm run check

# Or with watch mode
npm run check:watch
```

## Contributing

When contributing to this project:
1. Follow the existing component patterns
2. Ensure TypeScript types are correct
3. Test in both preview and production modes
4. Update documentation if adding new features
5. Use Svelte 5 runes correctly (see SVELTE_RUNES_GUIDE.md)

## License

[Add your license information here]

## Support

For questions or issues:
- Check the documentation guides in this repository
- Review Storyblok setup guide for CMS-related issues
- Consult SvelteKit and Svelte documentation for framework questions
