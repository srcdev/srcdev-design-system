// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  extends: ["srcdev-nuxt-forms", "srcdev-nuxt-components"],
  // imports: {
  //   dirs: ["./stores"],
  // },
  // alias: {
  //   "@/shared": "./shared",
  // },
  devtools: { enabled: true },
  devServer: {
    // https true for production, false for local dev
    https: process.env.NODE_ENV === "production",
    // port: 3020,
  },
  runtimeConfig: {
    public: {
      canonicalHost: "srcdev-design-system.vercel.app", // Replace with your actual domain
    },
  },
  css: ["./app/assets/styles/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        // "data-color-scheme": "auto",
        class: "srcdev-forms-extended srcdev-components-extended",
      },
      // titleTemplate: "%s - Website name",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxtjs/i18n",
    "nuxt-security",
    "nuxt-auth-utils",
    "@nuxtjs/storybook",
    "@nuxt/content",
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
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        "script-src-attr": ["'self'", "'unsafe-inline'"],
        "img-src": ["'self'", "data:", "avatars.githubusercontent.com"],
        "connect-src": ["'self'", "api.iconify.design", "github.com", "ws://localhost:4000/ws"],
        "frame-src": ["'self'"],
        "worker-src": ["'self'", "blob:"],
        "child-src": ["'self'", "blob:"],
      },
    },
  },
  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      {
        code: "en",
        language: "en-GB",
        name: "English",
        file: "en-GB.ts",
        dir: "ltr",
      },
      {
        code: "cn",
        language: "zh-CN",
        name: "简体中文",
        file: "zh-CN.ts",
        dir: "ltr",
      },
      {
        code: "ary",
        language: "ar-YE",
        name: "العربية",
        file: "ar-YE.ts",
        dir: "rtl",
      },
    ],
  },
  fonts: {
    assets: {
      // The baseURL where font files are served.
      prefix: "/public/_fonts/",
    },
    families: [
      // {
      //   name: "Poppins",
      //   weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      //   styles: ["normal", "italic"],
      //   provider: "bunny",
      // },
      {
        name: "Quicksand",
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
        provider: "local",
      },
      // {
      //   name: "Inter Variable",
      //   styles: ["normal", "italic"],
      //   provider: "fontsource",
      // },
    ],
  },
  components: [
    {
      path: "./components",
      pathPrefix: false,
    },
  ],
  typescript: {
    includeWorkspace: true,
    strict: true,
    shim: true,
    tsConfig: {
      compilerOptions: {
        types: ["srcdev-nuxt-forms", "srcdev-nuxt-components"],
        skipLibCheck: true,
      },
    },
  },
  eslint: {
    config: {
      // ESLint configuration options
      // stylistic: true, // Enable ESLint stylistic rules
    },
  },
})
