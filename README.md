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
- **Version**: Storybook 9.1.7 with Nuxt 4.1.2 compatibility
- **Addons**:
  - `@storybook/addon-docs` 9.1.7 - Automatic documentation
  - `@storybook/addon-a11y` 9.1.7 - Accessibility testing
  - `@storybook/addon-vitest` 9.1.7 - Testing integration
  - `@chromatic-com/storybook` 4.1.1 - Visual testing and chromatic integration

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

Stories follow the modern Storybook 8+ pattern (compatible with 9.1.7):

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

   - The project uses package overrides to ensure compatibility between Storybook 9.1.7 and Nuxt 4.1.2
   - Warnings are expected but don't affect functionality

3. **Missing Types**: Ensure both `@nuxtjs/storybook` and `@storybook-vue/nuxt` are installed:

   ```bash
   npm install --save-dev @nuxtjs/storybook @storybook-vue/nuxt
   ```

### Development Issues

- **i18n Build Errors**: Run `npm run build:i18n` manually if translations aren't updating
- **Port Conflicts**: Nuxt uses port 3000, Storybook uses port 6006
- **Node Version**: Ensure you're using Node.js v22+ for best compatibility

### Font Provider Errors

If you encounter this error when running `npm run dev`:

```text
ERROR  Could not initialize provider bunny. unifont will not be able to process fonts provided by this provider. Unexpected token '<', "<html><hea"... is not valid JSON
```

**Solution**: This error is typically caused by VPN interference with font provider requests. Try turning off your VPN (e.g., Surfshark) and restarting the development server:

```bash
# Turn off VPN, then restart
npm run dev
```

The error occurs because VPNs can interfere with the Bunny CDN font provider requests, causing HTML error pages to be returned instead of expected JSON responses.

## 📄 Nuxt Content Module

This project uses `@nuxt/content` v3.7.1 to provide a file-based content management system. The Content module allows you to write content in Markdown, Vue components, and other formats, and query them through a powerful API.

### Content Module Configuration

The Content module is configured in `nuxt.config.ts` with optimizations for hydration:

```typescript
modules: [
  "@nuxt/content",
  // ... other modules
],
content: {
  // Configure content to help with hydration
  renderer: {
    anchorLinks: false,
  },
  build: {
    markdown: {
      // Disable plugins that might cause hydration issues
      remarkPlugins: {
        "remark-slug": false,
        "remark-autolink-headings": false,
      },
      rehypePlugins: {
        "rehype-slug": false,
        "rehype-autolink-headings": false,
      },
    },
  },
}
```

### Content Directory Structure

Content files are stored in the `/content/` directory at the project root:

```text
content/
└── about.md              # Accessible at /about
```

#### File-Based Routing

- Files in `/content/` are automatically mapped to routes
- `about.md` becomes accessible at `/about`
- Nested directories create nested routes (e.g., `blog/post1.md` → `/blog/post1`)

### Markdown Features

#### Frontmatter

All content files support frontmatter for metadata:

```markdown
---
title: "About us"
description: "Welcome to our site"
bodyClass: "about-us-page"
---

# Your content here
```

#### Custom Components in Markdown

The project includes custom Vue components that can be used directly in Markdown:

```markdown
::layout-row{tag=div variant=inset-content style-class-passthrough=mb-20}
  :header-block{tag-level=2 class-level=2}[Display Prompt Example]

  :raw-text[This renders plain text content]

  :markdown-nuxt-link{to="/about" style-class-passthrough="custom-class"}[Link Text]
::
```

### Custom Markdown Components

The project provides several custom components for enhanced Markdown functionality:

#### RawText Component

Located at `app/components/custom-markdown-components/RawText.vue`:

```vue
<template>
  <slot></slot>
</template>
```

**Usage in Markdown:**

```markdown
**Usage in Markdown:**

```markdown
:raw-text[Your plain text content here]
```

#### MarkdownNuxtLink Component

Located at `app/components/custom-markdown-components/MarkdownNuxtLink.vue`:

```vue
<template>
  <NuxtLink :to :class="[elementClasses]"><slot></slot></NuxtLink>
</template>
```

**Usage in Markdown:**

```markdown
**Usage in Markdown:**

```markdown
:markdown-nuxt-link{to="/contact" style-class-passthrough="btn-primary"}[Contact Us]
```

**Props:**

- `to` (required): The route path

**Props:**

- `to` (required): The route path
- `style-class-passthrough`: CSS classes to apply

### Content Rendering

#### Dynamic Pages with `[...slug].vue`

The project uses a catch-all route (`app/pages/[...slug].vue`) to render content dynamically:

```vue
<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <ContentRenderer v-if="page" :value="page" tag="article" :prose="true" />
        <div v-else>Page not found</div>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Query content using the new Content v3 API
const { data: page } = await useAsyncData(`page:${route.path}`, async () => {
  const content = await queryCollection("content").path(route.path).first()
  return content
})

// Handle 404 errors
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true })
}

// Set page metadata from frontmatter
useHead({
  title: page.value?.title || "Page",
  meta: [
    {
      name: "description",
      content: page.value?.description || "",
    },
  ],
  bodyAttrs: {
    class: page.value?.bodyClass || "content-page",
  },
})
</script>
```

### Content API Usage

#### Query Content

Use the `queryCollection` API to fetch content:

```typescript
// Get a single page by path
const page = await queryCollection("content").path("/about").first()

// Get all content
const allContent = await queryCollection("content").all()

// Filter content
const blogPosts = await queryCollection("content")
  .path("/blog")
  .sort({ date: -1 })
  .all()
```

#### In Components

You can also use content in any Vue component:

```vue
<script setup lang="ts">
const { data: aboutPage } = await useAsyncData("about", () =>
  queryCollection("content").path("/about").first()
)
</script>

<template>
  <ContentRenderer v-if="aboutPage" :value="aboutPage" />
</template>
```

### Creating New Content

#### 1. Create a Markdown File

```bash
# Create a new content file
touch content/services.md
```

#### 2. Add Frontmatter and Content

```markdown
---
title: "Our Services"
description: "Comprehensive design and development services"
bodyClass: "services-page"
---

# Our Services

We offer a wide range of services...

:raw-text[This is plain text rendered through our custom component]

::layout-row{tag=section variant=popout}
  # Service Section

  :markdown-nuxt-link{to="/contact"}[Get in touch]
::
```

#### 3. Access Your Content

The file will automatically be accessible at `/services`

### Markdown Utilities

The project includes a custom `useMarkdown()` composable for processing markdown:

```typescript
// In app/composables/useMarkdown.ts
export function useMarkdown() {
  const renderMarkdown = (text: string): string => {
    return md.renderInline(text)
  }

  return { renderMarkdown }
}
```

**Features:**

- Automatic external link handling (adds `target="_blank"` and `rel="noopener noreferrer"`)
- Safe HTML rendering
- Link detection and processing

### Best Practices

#### 1. File Organization

```text
content/
├── index.md              # Homepage content
├── about.md              # About page
├── services/
│   ├── index.md          # Services overview
│   ├── web-design.md     # Individual service
│   └── development.md    # Individual service
└── blog/
    ├── index.md          # Blog listing
    └── posts/
        ├── post-1.md
        └── post-2.md
```

#### 2. Frontmatter Consistency

Always include essential metadata:

```markdown
---
title: "Page Title"
description: "SEO-friendly description"
bodyClass: "page-specific-class"
date: "2025-01-15"
author: "Author Name"
---
```

#### 3. Custom Component Usage

- Use `:raw-text[]` for plain text that doesn't need markdown processing
- Use `:markdown-nuxt-link{}[]` for internal links with custom styling
- Wrap related content in layout components using `::component-name{}`

#### 4. SEO Optimization

The content system automatically handles SEO through:

- Frontmatter title and description become page meta
- Custom body classes for page-specific styling
- Automatic 404 handling for missing content

### Troubleshooting

#### Content Not Found

1. **File Path Issues**: Ensure your content file path matches the URL structure
2. **Frontmatter Syntax**: Check that frontmatter is properly formatted with `---` delimiters
3. **Component Errors**: Verify custom component syntax matches the component props

#### Hydration Issues

The configuration disables certain plugins that can cause hydration mismatches:

- `remark-slug` and `rehype-slug` are disabled
- `remark-autolink-headings` and `rehype-autolink-headings` are disabled

If you experience hydration issues, check the browser console for specific errors.

## 🎨 Styling Architecture

The project uses a modular CSS architecture located in `/app/assets/styles/` with two distinct organizational layers:

### Overview

The styling system is organized into two main categories:

- **`setup/`** - Core styles for the current application
- **`extends-layer/`** - Layer-specific components and utilities

### Setup Folder (`/app/assets/styles/setup/`)

The setup folder contains all foundational styles for the current application:

#### Core Foundation

- **`_basic-resets.css`** - Basic CSS resets
- **`_head.css`** - Head-specific styles
- **`_normalise.css`** - CSS normalization
- **`index.css`** - Main setup entry point

#### Theming System (`setup/theming/`)

- **`colors/`** - Color palette definitions
  - `_blue.css`, `_gray.css`, `_green.css`, `_orange.css`, `_red.css`, `_yellow.css`
- **`themes/`** - Semantic theme variants
  - `_default.css`, `_primary.css`, `_secondary.css`, `_tertiary.css`
  - `_error.css`, `_success.css`, `_warning.css`, `_info.css`, `_ghost.css`

#### Typography (`setup/typography/`)

- **`vars/`** - Typography variables and scales
- **`utility-classes/`** - Typography utility classes
- **`index.css`** - Typography system entry point

#### Utility Classes (`setup/utility-classes/`)

- **`_fluid-spacing.css`** - Responsive spacing utilities
- **`_margin.css`** - Margin utility classes
- **`_padding.css`** - Padding utility classes
- **`animations/`** - Animation utilities

#### Accessibility (`setup/a11y/`)

- **`_utils.css`** - Accessibility utility classes
- **`_variables.css`** - A11y-focused CSS variables
- **`index.css`** - Accessibility system entry point

### Extends Layer (`/app/assets/styles/extends-layer/`)

The extends-layer folder contains styles specific to layer-based components and external design systems:

#### Component Layers

- **`srcdev-components/`** - Components from the srcdev layer
  - `components/` - Individual component styles
  - `index.css` - Layer entry point
- **`srcdev-forms/`** - Form components from the srcdev layer
  - `setup/` - Form-specific setup and configuration
  - `components/` - Individual form component styles
  - `index.css` - Form layer entry point

### Import Structure

The main stylesheet (`main.css`) imports in this order:

```css
@import "./setup"; /* Core app styles */
@import "./extends-layer/srcdev-forms"; /* Form layer */
@import "./extends-layer/srcdev-components"; /* Component layer */
```

### Usage Guidelines

#### For Application Styles

- Add new core styles to the appropriate `setup/` subdirectory
- Use `setup/theming/` for color and theme definitions
- Add utility classes to `setup/utility-classes/`
- Include accessibility considerations in `setup/a11y/`

#### For Layer-Specific Styles

- Add component layer styles to `extends-layer/srcdev-components/`
- Add form-specific styles to `extends-layer/srcdev-forms/`
- Create new layer directories in `extends-layer/` for additional design systems

This architecture ensures clear separation between application-specific styles and reusable layer components, making the design system modular and maintainable.

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
