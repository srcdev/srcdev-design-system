#!/bin/bash
# Fix Storybook 10.x compatibility for @nuxtjs/storybook

# Create symlink for framework resolution
if [ -d "node_modules/@nuxtjs/storybook/node_modules/@storybook-vue/nuxt" ]; then
    mkdir -p node_modules/@storybook-vue
    cp -r node_modules/@nuxtjs/storybook/node_modules/@storybook-vue/nuxt node_modules/@storybook-vue/
    echo "✓ Fixed @storybook-vue/nuxt framework resolution for Storybook 10.x"
else
    echo "⚠ @storybook-vue/nuxt not found, skipping fix"
fi
