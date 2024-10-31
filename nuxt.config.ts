// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  plugins: [{ src: "~/plugins/tippy.ts", mode: "client" }],
});
