import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/App/Home.vue";
import Login from "@/views/Auth/Login.vue";
import SignUp from "@/views/Auth/SignUp.vue";
import SendForgotPassword from "@/views/Auth/SendForgotPassword.vue";
import Dashboard from "@/views/App/Dashboard/Dashboard.vue";
import FarmCreate from "@/views/App/Farm/FarmCreate.vue";
import FarmList from "@/views/App/Farm/FarmList.vue";
import Presentation from "@/views/Presentation/Presentation.vue";
import FarmShow from "@/views/App/Farm/FarmShow.vue";

import { TOKEN_LABEL } from "@/services/api";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "presentation",
    meta: { layout: "userpages" },
    component: Presentation
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "userpages" },
    component: Login
  },
  {
    path: "/cadastrar",
    name: "signup",
    meta: { layout: "userpages" },
    component: SignUp
  },
  {
    path: "/recuperar-senha",
    name: "send-forgot-password",
    meta: { layout: "userpages" },
    component: SendForgotPassword
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
        path: "/propriedades/criar",
        name: "farm-create",
        component: FarmCreate
      },
      {
        path: "/propriedades/editar/:id",
        name: "farm-edit",
        component: () => import("@/views/App/Farm/FarmEdit.vue"),
        props: true
      },
      {
        path: "/propriedades/:id",
        name: "farm-show",
        component: FarmShow,
        // component: () => import("@/views/App/Farm/FarmShow.vue"),
        props: true
      },
      {
        path: "/propriedades",
        name: "farm-list",
        component: FarmList
      },
      {
        path: "/usuario/perfil",
        name: "user-profile",
        component: () => import('@/views/App/User/Profile/Profile.vue')
      }
    ]
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
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!localStorage.getItem(TOKEN_LABEL)) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
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
