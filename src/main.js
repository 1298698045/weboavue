import { createApp } from "vue";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import Axios from "@/utils/request.js";
import moment from "moment/moment";
import VueGridLayout from 'vue-grid-layout';
import "@/style/public.css";
import "@/style/theme.css";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const cors = require('cors');
const app = createApp(App);
moment.locale('zh-cn');
app.config.globalProperties.$moment = moment;
app.use(store);
app.use(router);
app.use(Axios);
app.use(Antd);
app.use(ElementPlus, { locale: zhCn });
app.use(VueGridLayout);
// app.use(cors());
app.mount("#app");
// createApp(App).use(store).use(router).use(Antd).use(ElementPlus).mount("#app");
