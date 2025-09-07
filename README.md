# SrcDev Design System

A modern, comprehensive design system built with Nuxt 4, featuring Storybook integration, internationalization support, and modular component architecture.

## 🚀 Features

- **🎨 Component Design System**: Built with Vue 3 and Nuxt 4
- **📚 Storybook Integration**: Interactive component documentation and testing
- **🌍 Multi-language Support**: Full i18n with 3 languages (English, Chinese, Arabic)
- **🎯 TypeScript**: Full type safety throughout the project
- **🧪 Testing Suite**: Comprehensive testing with Vitest and Playwright
- **🔧 Developer Experience**: Hot reload, ESLint, and modern tooling

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

### Prerequisites

- Check Node version (requires Node.js v22+)

```bash
node --version && npm --version
```

- Ensure latest version of Node v22+ using [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md#install--update-script)

```bash
# Install/update nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Install and use Node 22
nvm install 22
nvm use 22
```

### Installation

```bash
# Install dependencies
npm install
```

## Development

### Start Development Server

Start the Nuxt development server on `http://localhost:3000`:

```bash
npm run dev
```

This command automatically:

- Builds and watches i18n translations
- Starts the Nuxt development server
- Enables hot reload for all file changes

### Storybook Development

Launch Storybook for component development and documentation:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006/` and includes:

- Interactive component playground
- Automatic documentation generation
- Accessibility testing tools
- Visual regression testing capabilities

### Available Scripts

```bash
# Development
npm run dev              # Start Nuxt with i18n watching
npm run dev:nuxt-only   # Start Nuxt without i18n watching
npm run storybook       # Start Storybook server

# Building
npm run build           # Build for production
npm run build:i18n      # Build i18n translations only
npm run build-storybook # Build Storybook for deployment

# Internationalization
npm run build:i18n:watch      # Watch and rebuild i18n
npm run build:i18n-json:watch # Watch and rebuild i18n JSON

# Utilities
npm run cleanup         # Remove node_modules, .nuxt, dist
npm run preview         # Preview production build
```

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

## 📚 Storybook Configuration

This project includes a fully configured Storybook setup for component development and documentation.

### Current Setup

- **Framework**: `@storybook-vue/nuxt` (via `@nuxtjs/storybook`)
- **Version**: Storybook 9.1.5 with Nuxt 4.1.1 compatibility
- **Addons**:
  - `@storybook/addon-docs` - Automatic documentation
  - `@storybook/addon-a11y` - Accessibility testing
  - `@storybook/addon-vitest` - Testing integration
  - `@chromatic-com/storybook` - Visual testing

### Stories Location

Stories are located alongside components:

```text
app/components/
├── test-storybook/
│   ├── TestStorybook.vue
│   └── stories/
│       ├── TestStorybook.stories.ts
│       └── TestStorybook.mdx
└── components/
    └── MyNuxtWelcome.stories.ts
```

### Story Pattern

Stories follow the modern Storybook 7+ pattern:

```typescript
import type { Meta, StoryObj } from "@storybook/vue3"
import MyComponent from "./MyComponent.vue"

const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  argTypes: {
    // Control definitions
  },
  args: {
    // Default args
  },
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Story-specific args
  },
}
```

## 🛠️ Troubleshooting

### Storybook Issues

If you encounter Storybook configuration errors:

1. **"Could not evaluate @storybook-vue/nuxt" Error**:

   ```bash
   # Clean install dependencies
   npm run cleanup
   npm install
   ```

2. **Version Compatibility Warnings**:

   - The project uses package overrides to ensure compatibility between Storybook 9.1.5 and Nuxt 4.1.1
   - Warnings are expected but don't affect functionality

3. **Missing Types**: Ensure both `@nuxtjs/storybook` and `@storybook-vue/nuxt` are installed:

   ```bash
   npm install --save-dev @nuxtjs/storybook @storybook-vue/nuxt
   ```

### Development Issues

- **i18n Build Errors**: Run `npm run build:i18n` manually if translations aren't updating
- **Port Conflicts**: Nuxt uses port 3000, Storybook uses port 6006
- **Node Version**: Ensure you're using Node.js v22+ for best compatibility

## 📁 Project Structure

```text
srcdev-design-system/
├── .storybook/                 # Storybook configuration
├── app/                        # Nuxt application
│   ├── components/            # Vue components with stories
│   ├── composables/           # Vue composables
│   ├── layouts/               # Nuxt layouts
│   ├── middleware/            # Route middleware
│   ├── pages/                 # Application pages
│   └── stores/                # Pinia stores
├── components/                # Legacy components (to be migrated)
├── i18n/                      # Generated i18n files
├── i18n-source/               # Source i18n translations
├── public/                    # Static assets
├── scripts/                   # Build scripts
├── server/                    # Server-side code
└── types/                     # TypeScript definitions
```

## 🤝 Contributing

1. **Component Development**: Add new components in `app/components/` with corresponding stories
2. **Internationalization**: Add translations in component `locales/` directories
3. **Testing**: Write tests for all new components and functionality
4. **Documentation**: Update Storybook stories and README when adding features

## 📝 Deployment

Build the application for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

Built with ❤️ using Nuxt 4, Vue 3, and Storybook
