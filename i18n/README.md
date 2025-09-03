# i18n Structure Documentation

## Overview

This project uses a modern, maintainable approach to internationalization (i18n) with `@nuxtjs/i18n`. Instead of having large monolithic locale files, translations are organized in a modular structure and automatically merged at build time.

## Structure

````text
i18n/
├── locales/                 # Source JSON files (organized by feature)
│   ├── components/          # Component-specific translations
│   │   └── navigation/
│   │       ├── en-GB.json
│   │       ├── zh-CN.json
│   │       └── ar-YE.json
│   ├── global/              # Global/site-wide translations
│   │   ├── en-GB.json
│   │   ├── zh-CN.json
│   │   └── ar-YE.json
│   └── pages/               # Page-specific translations
│       ├── index/
│       ├── account/
│       └── settings/
├── i18n/
│   └── locales/             # Auto-generated merged files (working location)
│       ├── en-GB.ts
│       ├── zh-CN.ts
│       └── ar-YE.ts
└── README.md               # This documentation
```## How It Works

1. **Modular JSON Files**: Translations are organized in small, focused JSON files by feature/component/page in `i18n/locales/`
2. **Auto-merge**: TypeScript files are automatically generated in `i18n/i18n/locales/` that merge all JSON files for each locale
3. **Deep Merging**: Nested objects are properly merged to create a single translation object
4. **Type Safety**: Generated files include proper TypeScript types

## Usage

### Adding New Translations

1. Create or edit JSON files in the `i18n/locales/` directory structure
2. Follow the existing naming pattern: `{locale}.json` (e.g., `en-GB.json`)
3. Use nested objects to organize translations logically
4. Run `npm run build:i18n` to regenerate the merged files

### Example JSON Structure

```json
{
  "navigation": {
    "home": "Home",
    "settings": "Settings",
    "childLinksTitle": {
      "uiComponents": "UI Components"
    }
  }
}
````

### Build Process

- **Development**: Files are pre-built using the build script for optimal compatibility
- **Production**: Run `npm run build:i18n` before building to ensure latest translations
- **Automatic**: The build script is integrated into `npm run build` and `npm run generate`

## Commands

- `npm run build:i18n` - Regenerate locale files from JSON sources (one-time)
- `npm run build:i18n:watch` - Watch JSON files and regenerate locale files on changes
- `npm run dev` - Start development with automatic i18n file watching
- `npm run dev:nuxt-only` - Start development without i18n watching (if needed)
- `npm run build` - Build for production (includes i18n build)

## Development Experience

### Automatic File Watching 🎉

When you run `npm run dev`, the development server now automatically:

1. **Generates i18n files on startup** - Ensures all translations are up to date
2. **Watches for JSON changes** - Any modification to `.json` files in `i18n/locales/` triggers regeneration
3. **Hot reloads translations** - Changes appear immediately in your browser
4. **Runs in parallel** - Both i18n watcher and Nuxt dev server run simultaneously with clear, colored output

### Workflow

1. Start development: `npm run dev`
2. Edit any JSON translation file in `i18n/locales/`
3. Save the file - watch will automatically regenerate merged files
4. Your browser hot reloads with the new translations ✨

### Manual Control

If you need to build i18n files manually:

- `npm run build:i18n` - One-time build
- `npm run build:i18n:watch` - Watch mode only (without Nuxt dev server)

## Benefits

1. **Maintainability**: Small, focused translation files organized by feature
2. **Organization**: Logical grouping by component, page, or global scope
3. **Performance**: Pre-built static files for optimal loading
4. **Type Safety**: Full TypeScript support with proper typing
5. **Developer Experience**: Clear build process and file organization
6. **Hot Reload**: Changes to JSON files require running the build script, then trigger hot reload

## Migration from Legacy Approach

This replaces the older approach of using `meta.import.glob()` in runtime. The new approach:

- Uses a build-time compilation step for better compatibility
- Provides better TypeScript integration
- Includes automatic build tooling
- Maintains the same runtime behavior
- Improves developer experience

## Supported Locales

- `en-GB` (English)
- `zh-CN` (Simplified Chinese)
- `ar-YE` (Arabic - Yemen)

To add new locales, update the `locales` array in `scripts/build-i18n.mjs` and add the corresponding entry in `nuxt.config.ts`.
