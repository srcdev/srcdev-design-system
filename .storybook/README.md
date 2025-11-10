# Storybook Component Management

This file explains how to manage components in Storybook for your Nuxt project.

## Component Types

### 1. Your Extends Layer Components
These are real components from `srcdev-nuxt-components` and `srcdev-nuxt-forms` that should be imported directly.

**Location**: `node_modules/srcdev-nuxt-components/app/components/` and `node_modules/srcdev-nuxt-forms/app/components/`

**How to add**: Edit `.storybook/component-loader.ts` and add:
```typescript
import NewComponent from "srcdev-nuxt-components/app/components/path/NewComponent.vue"

// Then register in registerComponents function:
app.component("NewComponent", NewComponent)
```

### 2. Nuxt Framework Components
These are built-in Nuxt components that need mocks for Storybook.

**Examples**: `Icon`, `NuxtImg`, `NuxtLink`, `ClientOnly`, `NuxtLayout`

**How to add**: Edit `.storybook/component-loader.ts` in the `registerNuxtMocks` function.

### 3. Nuxt Composables
Functions provided by Nuxt that need mocks for Storybook.

**Examples**: `useSlots()`, `useStyleClassPassthrough()`, `useRouter()`, etc.

**How to add**: Edit `.storybook/preview.ts` and add globals like:
```typescript
;(globalThis as any).useNewComposable = () => ({ /* mock implementation */ })
```

## Adding New Components

When you need a new component in Storybook stories:

1. **Check if it's from your extends layers** → Add to `component-loader.ts`
2. **Check if it's a Nuxt framework component** → Add mock to `registerNuxtMocks()`
3. **Check if it's a composable** → Add global mock to `preview.ts`

## Benefits of This Approach

✅ **Real components**: Your actual components are imported, not mocked
✅ **Sustainable**: Easy to add new components without breaking existing ones
✅ **Type-safe**: TypeScript support for all imported components
✅ **Performance**: Only imports components you actually use
✅ **Maintainable**: Clear separation between real components and mocks

## Troubleshooting

If a component causes Storybook errors:
1. Check the component's prop definitions in the source code
2. Temporarily comment out the problematic component import
3. Add a TODO comment to fix the component later
4. Consider creating a simplified mock if the real component is too complex

## Example: Adding Form Components

```typescript
// In component-loader.ts
import FormWrapper from "srcdev-nuxt-forms/app/components/form-wrapper/FormWrapper.vue"
import InputTextWithLabel from "srcdev-nuxt-forms/app/components/input-text-with-label/InputTextWithLabel.vue"

// In registerComponents function:
app.component("FormWrapper", FormWrapper)
app.component("InputTextWithLabel", InputTextWithLabel)
```
