import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
import ToutiaoIcon from "@/components/ToutiaoIcon";
// 注册vant
import Vant from "vant";
import "vant/lib/index.less";
Vue.use(Vant);
// rem适配
import "amfe-flexible";
// axios
import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
});
Vue.config.productionTip = false;
Vue.component("ToutiaoIcon", ToutiaoIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
