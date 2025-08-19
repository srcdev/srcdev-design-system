// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  extends: ["srcdev-nuxt-forms", "srcdev-nuxt-components"],
  devtools: { enabled: true },
  devServer: {
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
  ],
  i18n: {
    locales: [
      {
        code: "en",
        language: "en-GB",
        name: "English",
        file: "en-GB.json",
        dir: "ltr",
      },
      {
        code: "cn",
        language: "zh-CN",
        name: "简体中文",
        file: "zh-CN.json",
        dir: "ltr",
      },
      {
        code: "ary",
        language: "ar-YE",
        name: "العربية",
        file: "ar-YE.json",
        dir: "rtl",
      },
    ],
    defaultLocale: "en",
    // langDir: "i18n/locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  fonts: {
    families: [
      {
        name: "Poppins",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
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
