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

This project implements multi-language support using the `@nuxtjs/i18n` module. The application supports three languages:

### Supported Languages

- **English (en-GB)** - Default language, left-to-right
- **Simplified Chinese (zh-CN)** - 简体中文, left-to-right
- **Arabic (ar-YE)** - العربية, right-to-left

### Configuration

The i18n configuration is set up in `nuxt.config.ts` with:

- Default locale set to English (`en`)
- Browser language detection enabled
- Cookie-based locale persistence
- Automatic redirection on root path

### Translation Files

Translation files are located in `i18n/locales/`:

- `en-GB.json` - English translations
- `zh-CN.json` - Chinese translations
- `ar-YE.json` - Arabic translations

### Usage

#### In Templates

Use the `$t()` function to access translations:

```vue
<h1>{{ $t("pages.index.header") }}</h1>
<p>{{ $t("pages.index.description") }}</p>
```

#### Language Switching

The `LocaleSwitcher` component (located in `app/components/locale-switcher/`) provides buttons to switch between languages. It uses the `useI18n()` composable to:

- Get available locales
- Get current locale
- Switch to a different locale

The language switcher is integrated into the default layout header and automatically updates the page content when a new language is selected.
