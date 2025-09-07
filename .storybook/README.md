# Storybook Configuration

This directory contains the Storybook configuration for the SrcDev Design System. The setup integrates Storybook 9.1.5 with Nuxt 4.1.1 using the `@nuxtjs/storybook` module.

## Current Configuration

### Framework Setup

- **Framework**: `@storybook-vue/nuxt` via `@nuxtjs/storybook`
- **Storybook Version**: 9.1.5
- **Nuxt Version**: 4.1.1
- **Vue Version**: 3.5.21

### Main Configuration (`main.ts`)

The main configuration uses:

```typescript
import type { StorybookConfig } from "@nuxtjs/storybook"

const config: StorybookConfig = {
  framework: {
    name: "@storybook-vue/nuxt",
    options: {},
  },
  // ... other configuration
}
```

### Required Packages

Both packages must be installed for proper functionality:

- `@nuxtjs/storybook@9.0.1` - Nuxt module integration
- `@storybook-vue/nuxt@9.0.1` - Framework implementation

## Package Version Pinning

### Why Are Storybook Package Versions Pinned?

In this project, all Storybook-related package versions in `package.json` are **pinned to exact versions** (without the `^` prefix). This is a deliberate decision for the following reasons:

#### 1. **Nuxt Ecosystem Instability**

The Nuxt ecosystem is known for having version compatibility issues when packages are allowed to auto-update. Minor version bumps can introduce breaking changes or incompatibilities between packages.

#### 2. **Storybook + Nuxt Integration Fragility**

The integration between Storybook and Nuxt is particularly sensitive to version mismatches. Even patch releases can cause:

- Build failures
- Runtime errors
- Plugin compatibility issues
- TypeScript compilation problems

#### 3. **Dependency Chain Complexity**

Storybook has a complex dependency chain with many interconnected packages. Allowing semantic versioning (`^`) can lead to:

- Mixed versions of Storybook core packages
- Addon version mismatches
- Conflicting peer dependencies

### Pinned Packages

The following packages are pinned to exact versions:

- `@chromatic-com/storybook@4.1.1`
- `@nuxtjs/storybook@9.0.1`
- `@storybook-vue/nuxt@9.0.1`
- `@storybook/addon-a11y@9.1.5`
- `@storybook/addon-docs@9.1.5`
- `@storybook/addon-vitest@9.1.5`
- `eslint-plugin-storybook@9.1.5`
- `storybook@9.1.5`

### Package Overrides

The `overrides` section in `package.json` ensures consistency:

```json
"overrides": {
  "@nuxtjs/storybook": {
    "storybook": "9.1.5",
    "nuxt": "4.1.1"
  },
  "@storybook-vue/nuxt": {
    "storybook": "9.1.5",
    "nuxt": "4.1.1"
  }
}
```

## Troubleshooting

### Common Issues and Solutions

#### "Could not evaluate '@storybook-vue/nuxt'" Error

**Symptoms**: Storybook fails to start with framework evaluation error

**Causes**:

- Missing `@storybook-vue/nuxt` package
- Version conflicts between Nuxt and Storybook packages
- Corrupted node_modules

**Solutions**:

1. **Clean reinstall**:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Verify both packages are installed**:

   ```bash
   npm list @nuxtjs/storybook @storybook-vue/nuxt
   ```

3. **Install missing packages**:

   ```bash
   npm install --save-dev @nuxtjs/storybook @storybook-vue/nuxt
   ```

#### Version Compatibility Warnings

**Symptoms**: Warnings about package version mismatches

**Expected Behavior**: These warnings are normal and don't affect functionality. The overrides ensure compatibility despite version number differences.

#### TypeScript Import Errors

**Symptoms**: Cannot find module '@storybook-vue/nuxt' in main.ts

**Solution**: Import from `@nuxtjs/storybook` but use `@storybook-vue/nuxt` as framework name:

```typescript
import type { StorybookConfig } from "@nuxtjs/storybook"  // Import from here
// ...
framework: {
  name: "@storybook-vue/nuxt",  // But use this as framework name
}
```

### Development Workflow

1. **Start Storybook**: `npm run storybook`
2. **Build Storybook**: `npm run build-storybook`
3. **Check Configuration**: Verify at `http://localhost:6006`

### Story Locations

Stories are automatically discovered from:

- `../**/*.mdx`
- `../**/*.stories.ts`

This includes:

- `app/components/**/stories/*.stories.ts`
- `components/*.stories.ts`

### Updating Storybook

When updating Storybook:

1. **Test thoroughly** in a separate branch
2. **Update all related packages together** to compatible versions
3. **Pin the new versions** without `^` prefix
4. **Update the overrides section** to match
5. **Verify all stories and addons work correctly**

### Best Practices

- Always check the actual installed versions with `npm list | grep storybook`
- Keep a changelog of version updates and any required configuration changes
- Test the full Storybook build process after any updates
- Consider using `npm ci` in CI/CD to ensure exact version installation

This approach trades automatic updates for stability and predictable builds.
