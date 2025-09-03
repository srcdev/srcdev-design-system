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

- `npm run build:i18n` - Regenerate locale files from JSON sources
- `npm run dev` - Start development (may need to run build:i18n first)
- `npm run build` - Build for production (includes i18n build)

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
