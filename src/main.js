import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

//crecateApp(App).use(router).use(PrimeVue).mount("#app");
const app = createApp(App);
app.use(router).use(PrimeVue).mount("#app");
