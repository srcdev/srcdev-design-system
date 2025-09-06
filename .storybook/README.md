# Storybook Configuration

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

- `@chromatic-com/storybook`
- `@nuxtjs/storybook`
- `@storybook/addon-a11y`
- `@storybook/addon-docs`
- `@storybook/addon-vitest`
- `eslint-plugin-storybook`
- `storybook`

### Package Overrides

The `overrides` section in `package.json` also pins Storybook and Nuxt versions to ensure consistency across the dependency tree.

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
