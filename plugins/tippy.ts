import { defineNuxtPlugin } from "#app";
import { Tippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Tippy);
});
