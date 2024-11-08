import { defineNuxtPlugin } from "#app";
import { Tippy } from "vue-tippy";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Tippy);
});
