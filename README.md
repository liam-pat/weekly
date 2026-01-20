# Weekly

> Mr.Pat's weekly reflections - A personal WEEKLY built with Astro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📝 Weekly posts
- 🎨 Dark mode support
- 📊 Reading progress bar
- 📈 Article statistics (word count & reading time)
- 🔍 Full-text search (Pagefind)
- 💬 Comments (Giscus)
- 📱 Responsive design
- 🚀 Performance optimized

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Pagefind](https://pagefind.app) - Search
- [Giscus](https://giscus.app) - Comments
- [Heti](https://github.com/sivan/heti) - Chinese typography

## Quick Start

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Project Structure

```
src/
├── components/     # UI components
├── layouts/        # Page layouts
├── pages/          # Routes & posts
│   └── posts/      # Weekly posts (*.md)
├── styles/         # Global styles
├── config.ts       # Site configuration
└── util.ts         # Utilities
```

## Publishing Posts

Create a new Markdown file in `src/pages/posts/`:

```
{number}-{title}.md
```

Example: `49-new-beginning.md`

## Configuration

Edit `src/config.ts`:

```typescript
export const SITE = {
  title: 'My Weekly',
  author: 'Alan',
  homePage: '',
  // ...
};
```

## Deploy to Vercel

### Manual Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Astro and configure build settings
5. Click "Deploy"

Build settings (auto-configured):
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`