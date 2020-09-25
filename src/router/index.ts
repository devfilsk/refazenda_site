import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/App/Home.vue";
import Login from "@/views/Auth/Login.vue";
import SignUp from "@/views/Auth/SignUp.vue";
import SendForgotPassword from "@/views/Auth/SendForgotPassword.vue";
import Dashboard from "@/views/App/Dashboard/Dashboard.vue";
import FarmCreate from "@/views/App/Farm/FarmCreate.vue";
import Presentation from "@/views/Presentation/Presentation.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "presentation",
    component: Presentation
  },
  {
    path: "/panel",
    component: Home,
    meta: {
      login: true
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/farm/create",
        name: "farm-create",
        component: FarmCreate
      },
      {
        path: "/farm/:id",
        name: "farm-show",
        component: FarmCreate
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/cadastrar",
    name: "signup",
    component: SignUp
  },
  {
    path: "/recuperar-senha",
    name: "send-forgot-password",
    component: SendForgotPassword
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.login)) {
//     if (!window.localStorage.token) {
//       // next("/login");
//       router.push({ path: "/login" });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
