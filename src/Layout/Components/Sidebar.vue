<template>
  <div
    class="app-sidebar sidebar-shadow"
    @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
  >
    <div class="app-header__logo">
      <div class="logo-src" />
      <div class="header__pane ml-auto">
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active': isOpen }"
          @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
        <sidebar-menu showOneChild :menu="menu" />
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    SidebarMenu,
    VuePerfectScrollbar
  },
  data() {
    return {
      isOpen: false,
      sidebarActive: false,

      menu: [
        {
          header: true,
          title: "Dashboard"
        },
        {
          title: "Gráficos Gerais",
          icon: "pe-7s-graph text-success",
          href: "/dashboard"
        },
        {
          header: true,
          title: "Minhas Propriedades"
        },

        {
          title: "Todas as Propriedades",
          icon: "pe-7s-news-paper",
          href: "/propriedades"
        },
        {
          title: "Cadastrar Propriedade",
          icon: "pe-7s-map-2",
          href: "/propriedades/criar"
        },
        {
          header: true,
          title: "Animais"
        },
        {
          icon: "pe-7s-news-paper",
          title: "Todos os Animais",
          href: "/animais"
        },
        {
          icon: "pe-7s-plus",
          title: "Cadastrar Animal",
          href: "animais/cadastrar"
        },
        {
          icon: "pe-7s-eyedropper",
          title: "Vacinas",
          href: "animais/cadastrar"
        },
        {
          icon: "pe-7s-next-2",
          title: "Importar Planilhas",
          href: "animais/cadastrar"
        },
        {
          header: true,
          title: "Usuários"
        },
        {
          icon: "pe-7s-users",
          title: "Todos os Usuários",
          href: "/widgets/chart-boxes-3"
        },
        {
          icon: "pe-7s-add-user",
          title: "Cadastrar Usuário",
          href: "/widgets/chart-boxes-3"
        },
        {
          icon: "pe-7s-paper-plane",
          title: "Convidar Usuário",
          href: "/widgets/chart-boxes-3"
        }
      ],
      collapsed: true,

      windowWidth: 0
    };
  },
  props: {
    sidebarbg: String
  },
  methods: {
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1350") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  }
};
</script>
