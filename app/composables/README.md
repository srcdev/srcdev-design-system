# useRawLocaleData Composable

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

**Need help?** Check the implementation in `app/composables/useRawLocaleData.ts` or see the example usage in `app/pages/index.vue`.
