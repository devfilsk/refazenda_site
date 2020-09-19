import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Vuelidate from "vuelidate";
import VueSimpleAlert from "vue-simple-alert";
// import Toasted from "vue-toasted";

import VueToast from "vue-toast-notification";
// Import one of available themes
import "vue-toast-notification/dist/theme-default.css";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueSimpleAlert);
// Vue.use(VueToast, { duration: 5000, iconPack: "fontawesome" });
Vue.use(VueToast, { duration: 5000 });
Vue.use(VueToast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
