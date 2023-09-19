import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "@/style/public.css";
createApp(App).use(store).use(router).use(Antd).use(ElementPlus).mount("#app");
