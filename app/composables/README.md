# Composables Documentation

This directory contains custom Vue 3 composables for the SRCDEV Design System. Each composable provides specific functionality to enhance development experience and solve common challenges in Nuxt.js applications.

## 📦 Available Composables

- [`useRawLocaleData`](#userawlocaledata) - Safe i18n locale data retrieval with AST normalization
- [`useCanonicalUrl`](#usecanonicalurl) - Automatic canonical URL generation and SEO meta tags
- [`useMarkdown`](#usemarkdown) - Markdown rendering utilities with safety features
- [`useStyleClassPassthrough`](#usestyleclasspassthrough) - Dynamic CSS class management for components

---

## useRawLocaleData

A Vue 3 composable that safely retrieves and normalizes i18n locale data, converting Vue I18n AST (Abstract Syntax Tree) nodes back to raw JSON data. This solves the common hydration mismatch issue between server-side rendering and client-side rendering in Nuxt.js applications.

## 🚀 Features

- **AST to JSON normalization**: Converts Vue I18n compiled AST nodes back to raw JSON
- **Full TypeScript support**: Generic types with complete IntelliSense
- **Fallback support**: Optional default values for safer usage
- **Path resolution**: Dot notation support for nested object access
- **Hydration safe**: Prevents server/client mismatch issues
- **Performance optimized**: Minimal overhead with smart fallbacks

## 📦 Installation

This composable is designed for Nuxt.js applications with `@nuxtjs/i18n` module.

```bash
# Prerequisites
npm install @nuxtjs/i18n vue-i18n
```

## 🎯 The Problem It Solves

When using Vue I18n with complex data structures (arrays, objects), you might encounter:

1. **AST vs JSON mismatch**: Server renders JSON, client sees AST nodes
2. **Hydration errors**: Server/client content doesn't match
3. **Type safety issues**: Inconsistent data types between environments

**Before (problematic):**

```typescript
// ❌ This can cause hydration mismatches
const data = $tm("pages.index.exampleArray") // Returns AST on client, JSON on server
```

**After (solved):**

```typescript
// ✅ Always returns consistent JSON data
const data = useRawLocaleData<MyInterface[]>("pages.index.exampleArray", [])
```

## 🔧 Usage

### Basic Usage

```typescript
<script setup lang="ts">
// Simple string value
const title = useRawLocaleData<string>("pages.homepage.title", "Default Title")

// Array with type safety
interface MenuItem {
  id: string
  label: string
  url: string
}

const menuItems = useRawLocaleData<MenuItem[]>("navigation.mainMenu", [])

// Complex object
interface AppConfig {
  theme: string
  features: {
    darkMode: boolean
    notifications: boolean
  }
}

const config = useRawLocaleData<AppConfig>("app.config")
</script>
```

### Real-World Example

```typescript
<template>
  <div>
    <h1>{{ pageTitle }}</h1>

    <ul>
      <li v-for="item in blogPosts" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.excerpt }}</p>
        <span>{{ item.publishDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface BlogPost {
  id: string
  title: string
  excerpt: string
  publishDate: string
  tags: string[]
}

// Type-safe locale data access
const pageTitle = useRawLocaleData<string>("pages.blog.title", "Blog")
const blogPosts = useRawLocaleData<BlogPost[]>("pages.blog.posts", [])
</script>
```

### Corresponding i18n JSON Structure

```json
{
  "pages": {
    "blog": {
      "title": "My Awesome Blog",
      "posts": [
        {
          "id": "post-1",
          "title": "Getting Started with Vue 3",
          "excerpt": "Learn the basics of Vue 3 composition API",
          "publishDate": "2024-01-15",
          "tags": ["vue", "javascript", "tutorial"]
        },
        {
          "id": "post-2",
          "title": "TypeScript Best Practices",
          "excerpt": "Write better TypeScript code with these tips",
          "publishDate": "2024-01-20",
          "tags": ["typescript", "best-practices"]
        }
      ]
    }
  },
  "navigation": {
    "mainMenu": [
      { "id": "home", "label": "Home", "url": "/" },
      { "id": "about", "label": "About", "url": "/about" },
      { "id": "blog", "label": "Blog", "url": "/blog" }
    ]
  }
}
```

## 📚 API Reference

### `useRawLocaleData<T>(path: string, defaultValue?: T): T`

#### Parameters

| Parameter      | Type     | Required | Description                                                               |
| -------------- | -------- | -------- | ------------------------------------------------------------------------- |
| `path`         | `string` | ✅       | Dot notation path to the locale data (e.g., `"pages.index.exampleArray"`) |
| `defaultValue` | `T`      | ❌       | Fallback value returned if the path is not found                          |

#### Returns

| Type | Description                                                                 |
| ---- | --------------------------------------------------------------------------- |
| `T`  | The normalized locale data cast to the specified type, or the default value |

#### Type Parameter

| Parameter | Description                                                                |
| --------- | -------------------------------------------------------------------------- |
| `T`       | The expected type of the returned data (interface, primitive, array, etc.) |

## 🛠️ How It Works

1. **Path Resolution**: Splits the dot notation path and traverses the locale message object
2. **Fallback Strategy**: If path not found in raw messages, falls back to Vue I18n's `tm()` function
3. **AST Normalization**: Converts Vue I18n AST nodes back to plain JSON:
   - `{ body: { static: "value" } }` → `"value"`
   - Recursively processes arrays and objects
   - Preserves primitive types (string, number, boolean)
4. **Type Casting**: Returns the data cast to your specified TypeScript type

## ⚙️ Configuration

### i18n.config.ts Setup

For optimal results, configure your i18n setup:

```typescript
// i18n.config.ts
import { defineI18nConfig } from "@nuxtjs/i18n"

export default defineI18nConfig(() => ({
  legacy: false, // Use Composition API
  messageCompiler: false, // Disable AST compilation
  serialization: {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  },
}))
```

### nuxt.config.ts

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n"],
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", file: "en-GB.json" },
      { code: "fr", file: "fr-FR.json" },
    ],
    langDir: "locales",
  },
})
```

## 🔍 Advanced Examples

### Reactive Data with Locale Switching

```typescript
<script setup lang="ts">
import { watch } from 'vue'

interface Product {
  id: string
  name: string
  price: number
  currency: string
}

const { locale } = useI18n()
const products = ref<Product[]>([])

// Update products when locale changes
watch(locale, () => {
  products.value = useRawLocaleData<Product[]>('catalog.products', [])
}, { immediate: true })
</script>
```

### Error Handling

```typescript
<script setup lang="ts">
interface UserProfile {
  name: string
  email: string
  preferences: {
    theme: 'light' | 'dark'
    language: string
  }
}

// Provide comprehensive defaults
const defaultProfile: UserProfile = {
  name: 'Guest User',
  email: '',
  preferences: {
    theme: 'light',
    language: 'en'
  }
}

const userProfile = useRawLocaleData<UserProfile>('user.profile', defaultProfile)
</script>
```

### Dynamic Path Construction

```typescript
<script setup lang="ts">
const { locale } = useI18n()

// Dynamic path based on current route or conditions
const route = useRoute()
const pageName = route.name || 'index'

interface PageMeta {
  title: string
  description: string
  keywords: string[]
}

const pageMeta = useRawLocaleData<PageMeta>(
  \`pages.\${pageName}.meta\`,
  {
    title: 'Default Title',
    description: 'Default description',
    keywords: []
  }
)
</script>
```

## 🐛 Troubleshooting

### Common Issues

1. **Path not found warnings**

   ```console
   [useRawLocaleData] Path not found: pages.missing.key
   ```

   **Solution**: Check your JSON structure and path spelling, or provide a default value.

2. **Type mismatch errors**

   ```typescript
   // ❌ Wrong: expecting array but got object
   const data = useRawLocaleData<string[]>("pages.index.title")

   // ✅ Correct: match your JSON structure
   const data = useRawLocaleData<string>("pages.index.title")
   ```

3. **Hydration mismatches**
   - Ensure you're using this composable instead of `$tm()` directly
   - Check that your i18n configuration has `messageCompiler: false`

### Debug Mode

Add logging to see what's happening:

```typescript
const data = useRawLocaleData<MyType>("my.path", defaultValue)
console.log("Resolved data:", data)
```

## 🎉 Benefits

- ✅ **Eliminates hydration mismatches** between server and client
- ✅ **Full TypeScript support** with generics and interfaces
- ✅ **Consistent data format** across all environments
- ✅ **Graceful fallbacks** with default values
- ✅ **Performance optimized** with minimal overhead
- ✅ **Developer friendly** with clear error messages

## 📄 License

Part of the SRCDEV Design System - Internal use composable.

---

## useCanonicalUrl

A composable that automatically generates canonical URLs and sets appropriate SEO meta tags for pages. This helps with SEO optimization and prevents duplicate content issues.

### 🚀 Features

- **Automatic canonical URL generation**: Creates proper canonical URLs based on current route
- **SEO optimization**: Automatically sets canonical link in document head
- **Configuration driven**: Uses runtime config for domain settings
- **SSR compatible**: Works seamlessly with server-side rendering

### 🔧 Usage

```typescript
<script setup lang="ts">
  // Simple usage - automatically sets canonical URL for current page const {canonicalUrl} = useCanonicalUrl() // The
  canonical URL is automatically added to the page head //{" "}
  <link rel="canonical" href="https://yourdomain.com/current-path" />
</script>
```

### ⚙️ Configuration

Ensure your `nuxt.config.ts` has the canonical host configured:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      canonicalHost: "yourdomain.com",
    },
  },
})
```

### 📚 API Reference

#### `useCanonicalUrl(): { canonicalUrl: string }`

**Returns:**

- `canonicalUrl` (string): The complete canonical URL for the current page

---

## useMarkdown

A composable that provides safe markdown rendering capabilities using MarkdownIt. Configured with security in mind while supporting common markdown features.

### 🚀 Features

- **Safe HTML rendering**: Raw HTML disabled for security
- **Auto-linking**: Automatically converts URLs to links
- **Line break support**: Converts line breaks to `<br>` tags
- **Inline rendering**: Optimized for single-line markdown content
- **TypeScript support**: Full type safety

### 🔧 Usage

```typescript
<script setup lang="ts">
  const {renderMarkdown} = useMarkdown() // Render inline markdown (no block elements) const formattedText =
  renderMarkdown('This is **bold** and *italic* text with a [link](https://example.com)') // Output: 'This is{" "}
  <strong>bold</strong> and <em>italic</em> text with a <a href="https://example.com">link</a>' // Auto-linking URLs
  const autoLinked = renderMarkdown('Visit https://github.com for more info') // Output: 'Visit{" "}
  <a href="https://github.com">https://github.com</a> for more info'
</script>
```

### Template Usage

```vue
<template>
  <div>
    <!-- Render markdown content safely -->
    <p v-html="renderMarkdown(userContent)"></p>

    <!-- Example with reactive content -->
    <div v-for="comment in comments" :key="comment.id">
      <div v-html="renderMarkdown(comment.text)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Comment {
  id: string
  text: string
}

const comments = ref<Comment[]>([
  { id: "1", text: "Great **article**! Thanks for sharing." },
  { id: "2", text: "Check out this link: https://vue.js.org" },
])

const { renderMarkdown } = useMarkdown()
</script>
```

### 📚 API Reference

#### `useMarkdown(): { renderMarkdown: (text: string) => string }`

**Methods:**

- `renderMarkdown(text: string): string` - Renders markdown text to safe HTML

**MarkdownIt Configuration:**

- `html: false` - Raw HTML disabled for security
- `linkify: true` - Auto-detect and convert URLs to links
- `breaks: true` - Convert line breaks to `<br>` tags

---

## useStyleClassPassthrough

A composable for dynamic CSS class management in components. Provides utilities to manage, update, and reset CSS classes reactively.

### 🚀 Features

- **Dynamic class management**: Add, remove, and toggle CSS classes
- **Reactive updates**: Automatically updates when classes change
- **Array and string support**: Accepts both string and array inputs
- **Class persistence**: Maintains class state across component lifecycle
- **Reset functionality**: Easy way to reset to original classes

### 🔧 Usage

```typescript
<script setup lang="ts">
  // Initialize with default classes const initialClasses = ['btn', 'btn-primary'] const{" "}
  {(elementClasses, updateElementClasses, resetElementClasses, styleClassPassthroughRef)} =
  useStyleClassPassthrough(initialClasses) // elementClasses is a computed property with joined classes //
  elementClasses.value = 'btn btn-primary' // Add a single class updateElementClasses('active') // elementClasses.value
  = 'btn btn-primary active' // Remove a class (toggle behavior) updateElementClasses('btn-primary') //
  elementClasses.value = 'btn active' // Add multiple classes updateElementClasses(['loading', 'disabled']) //
  elementClasses.value = 'btn active loading disabled' // Reset to original classes resetElementClasses(['btn',
  'btn-secondary']) // elementClasses.value = 'btn btn-secondary'
</script>
```

### Component Example

```vue
<template>
  <button
    :class="elementClasses"
    @click="handleClick"
    @mouseenter="updateElementClasses('hover')"
    @mouseleave="updateElementClasses('hover')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
})

// Build initial classes from props
const initialClasses = computed(() => [
  "btn",
  `btn-${props.variant}`,
  `btn-${props.size}`,
  ...(props.disabled ? ["btn-disabled"] : []),
])

const { elementClasses, updateElementClasses, resetElementClasses } = useStyleClassPassthrough(initialClasses.value)

// Update classes when props change
watch(
  initialClasses,
  (newClasses) => {
    resetElementClasses(newClasses)
  },
  { deep: true }
)

const handleClick = () => {
  if (!props.disabled) {
    updateElementClasses("active")
    // Remove active class after animation
    setTimeout(() => updateElementClasses("active"), 200)
  }
}
</script>
```

### Advanced Usage with Conditional Classes

```typescript
<script setup lang="ts">
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(['card'])

// Conditional class management
const isLoading = ref(false)
const hasError = ref(false)
const isSelected = ref(false)

watch(isLoading, (loading) => {
  updateElementClasses('loading')
})

watch(hasError, (error) => {
  updateElementClasses('error')
})

watch(isSelected, (selected) => {
  updateElementClasses('selected')
})
</script>
```

### 📚 API Reference

#### `useStyleClassPassthrough(initialClasses: string[])`

**Parameters:**

- `initialClasses` (string[]): Array of initial CSS class names

**Returns:**

- `elementClasses` (ComputedRef<string>): Computed property with space-separated class string
- `updateElementClasses(cssClass: string | string[])`: Add/remove classes (toggle behavior)
- `resetElementClasses(newClasses: string[])`: Reset to new set of classes
- `styleClassPassthroughRef` (Ref<string[]>): Direct access to the reactive class array

**Methods:**

- `updateElementClasses(cssClass)`: Toggles classes - adds if not present, removes if present
- `resetElementClasses(propsClasses)`: Completely replaces current classes with new ones

---

**Need help?** Check the individual implementation files in `app/composables/` or see example usage throughout the application.
