# Storybook Component Management

This Storybook setup leverages **Nuxt's auto-generated component types** for sustainable component management.

## How It Works

Instead of manually importing every component, we use the component paths from `.nuxt/types/components.d.ts` which Nuxt generates automatically via `npm run postinstall` (nuxt prepare).

## Component Types

### 1. Your Extends Layer Components

These are real components from `srcdev-nuxt-components` and `srcdev-nuxt-forms` imported using paths from Nuxt's generated types.

**Source**: `.nuxt/types/components.d.ts`

**How to add**:
1. Find the component path in `.nuxt/types/components.d.ts`
2. Add it to `componentPaths` in `.storybook/component-auto-loader.ts`
3. Add the component name to `componentsToRegister` array

```typescript
// In component-auto-loader.ts
const componentPaths = {
  NewComponent: "../../node_modules/srcdev-nuxt-components/app/components/path/NewComponent.vue",
}

// Then add to componentsToRegister
const componentsToRegister = [
  'LayoutRow',
  'NewComponent', // Add here
]
```

### 2. Nuxt Framework Components

Built-in Nuxt components that need mocks for Storybook.

**Examples**: `Icon`, `NuxtImg`, `NuxtLink`, `ClientOnly`, `NuxtLayout`

**How to add**: Edit `registerNuxtMocks()` in `component-auto-loader.ts`

### 3. Nuxt Composables

Functions provided by Nuxt that need mocks for Storybook.

**Examples**: `useSlots()`, `useStyleClassPassthrough()`, `useRouter()`, etc.

**How to add**: Edit `preview.ts` and add globals

## Benefits of This Approach

✅ **Leverages Nuxt's component discovery** - Uses same paths Nuxt generates
✅ **Always fresh** - Component paths updated when you run `nuxt prepare`
✅ **Type-safe** - Based on Nuxt's own TypeScript definitions
✅ **On-demand loading** - Only registers components you actually need
✅ **No duplication** - Single source of truth from Nuxt's generated types
✅ **Sustainable** - Add components by referencing existing Nuxt types

## Adding New Components

1. **Check `.nuxt/types/components.d.ts`** for the exact import path
2. **Copy the path** to `componentPaths` in `component-auto-loader.ts`
3. **Add component name** to `componentsToRegister` array
4. **Component is automatically available** in all stories

## Example: Adding Form Components

```typescript
// 1. Find in .nuxt/types/components.d.ts:
'InputButtonSubmit': typeof import("../../node_modules/srcdev-nuxt-forms/app/components/forms/input-button/variants/InputButtonSubmit.vue")['default']

// 2. Add to component-auto-loader.ts:
const componentPaths = {
  // ... existing components
  InputButtonSubmit: "../../node_modules/srcdev-nuxt-forms/app/components/forms/input-button/variants/InputButtonSubmit.vue",
}

const componentsToRegister = [
  'LayoutRow',
  'InputButtonSubmit', // Add here
]
```

## Workflow

1. **Run `npm run postinstall`** to refresh Nuxt's component types
2. **Check `.nuxt/types/components.d.ts`** for available components
3. **Add needed components** to the auto-loader
4. **Components are immediately available** in Storybook stories

This approach ensures your Storybook components stay in sync with your Nuxt application! 🚀
