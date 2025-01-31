import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./routes";
import "../src/assets/main.css";
import "./firebaseConfig";
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.mount("#app");