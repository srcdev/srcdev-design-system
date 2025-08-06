// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: {
    // port: 3020,
  },
  css: ["./app/assets/styles/main.css"],
  app: {
    head: {
      // title: "Nuxt Playground",
      // meta: [{ name: "description", content: "A playground for Nuxt.js" }],
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
});
