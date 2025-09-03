# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

- Check Node version

```bash
node --version && npm --version
```

- Ensure latest version of node v.22 [install--update-script](https://github.com/nvm-sh/nvm/blob/master/README.md#install--update-script)
- use curl script at above link, example below

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Internationalization (i18n)

This project implements a modern, scalable multi-language support system using `@nuxtjs/i18n` with component-scoped translations. The application supports three languages with both global and component-specific translation files.

### Supported Languages

- **English (en-GB)** - Default language, left-to-right
- **Simplified Chinese (zh-CN)** - 简体中文, left-to-right
- **Arabic (ar-YE)** - العربية, right-to-left

### Configuration

The i18n configuration is set up in `nuxt.config.ts` with:

- Default locale set to English (`en-GB`)
- Browser language detection enabled
- Cookie-based locale persistence
- Automatic redirection on root path

### Translation File Structure

The project uses a modular translation system with two main sources:

#### 1. Global Translations (`i18n-source/locales/`)

```text
i18n-source/locales/
├── components/
│   └── footer/
│       ├── en-GB.json
│       ├── zh-CN.json
│       └── ar-YE.json
├── global/
│   ├── en-GB.json
│   ├── zh-CN.json
│   └── ar-YE.json
└── pages/
    ├── account/login/
    ├── index/
    └── settings/locale-switcher/
```

#### 2. Component-Scoped Translations (`app/components/*/locales/`)

```text
app/components/
└── header-navigation/
    └── locales/
        ├── en-GB.json
        ├── zh-CN.json
        └── ar-YE.json
```

#### 3. Generated Output (`i18n/locales/`)

The build system automatically merges all translation sources into TypeScript files:

```typescript
// i18n/locales/en-GB.ts
export default {
  components: {
    footer: {
      /* from i18n-source */
    },
    navigation: {
      /* from component */
    },
  },
  global: {
    /* from i18n-source */
  },
  pages: {
    /* from i18n-source */
  },
} as const
```

### Build System

#### Manual Build

```bash
npm run build:i18n
```

#### Development with Watch Mode

```bash
npm run dev  # Includes automatic i18n watching and rebuilding
```

The build system:

- ✅ Automatically discovers component locale directories
- ✅ Deep merges translations with proper namespacing
- ✅ Watches for changes in both global and component translations
- ✅ Regenerates TypeScript files with type safety
- ✅ Provides clear logging of discovered directories and changes

### Usage

#### In Templates

Use the `$t()` function with namespaced keys:

```vue
<!-- Global translations -->
<h1>{{ $t("pages.index.header") }}</h1>
<p>{{ $t("global.siteName") }}</p>

<!-- Component translations -->
<span>{{ $t("components.navigation.home") }}</span>
<button>{{ $t("components.footer.settings") }}</button>
```

#### Adding Component Translations

To add translations for a new component:

1. Create a `locales/` directory in your component folder
2. Add JSON files for each supported locale (`en-GB.json`, `zh-CN.json`, `ar-YE.json`)
3. Structure translations under a "components" namespace:

   ```json
   {
     "components": {
       "yourComponent": {
         "title": "Your Title",
         "description": "Your Description"
       }
     }
   }
   ```

4. Use in your component: `{{ $t("components.yourComponent.title") }}`
5. The build system will automatically detect and include your translations

#### Language Switching

The `LocaleSwitcher` component (located in `app/components/locale-switcher/`) provides buttons to switch between languages. It uses the `useI18n()` composable to:

- Get available locales
- Get current locale
- Switch to a different locale

The language switcher is integrated into the default layout header and automatically updates the page content when a new language is selected.
