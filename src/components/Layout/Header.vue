<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/logo.svg" alt="ReFazenda" />
      </router-link>

      <ul id="menu-bar">
        <li class="item-menu">
          <a href="http://dev-center.com">Fazenda</a>
          <transition name="fade">
            <ul class="submenu">
              <li class="item-submenu">
                <router-link :to="{ name: 'farm-create' }" class="link-submenu">Cadastrar Fazenda</router-link>
              </li>
              <li class="item-submenu">
                <a class="link-submenu" href="#">Suas Fazendas</a>
              </li>
            </ul>
          </transition>
        </li>
        <li class="item-menu">
          <a href="#">Animais</a>
          <ul class="submenu">
            <li class="item-submenu">
              <a class="link-submenu" href="#">Cadastrar Animal</a>
            </li>
            <li class="item-submenu">
              <a class="link-submenu" href="#">Visualizar Animais</a>
            </li>
            <li class="item-submenu">
              <a class="link-submenu" href="#">Todos os animais da fazenda</a>
            </li>
            <li class="item-submenu">
              <a class="link-submenu" href="#">Todos os animais da fazenda</a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="actions-auth">
        <router-link
          v-if="!$store.state.auth.login || $route.path === '/'"
          class="btn-outline"
          :to="{ name: 'signup' }"
        >Cadastre-se</router-link>

        <router-link
          v-if="!$store.state.auth.login || $route.path === '/'"
          class="btn-outline"
          :to="{ name: 'Login' }"
        >Entrar</router-link>

        <button v-else class="btn-outline" @click.prevent="deslogar">Deslogar</button>
      </div>

      <!-- <router-link  class="btn" to="/login">Vender / Login</router-link> -->
    </nav>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    }
  },
  created() {
    console.log("A", this.$router);
  },
  methods: {
    ...mapActions("auth", ["deslogarUsuario"]),

    deslogar() {
      this.deslogarUsuario();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 110px;
}

.actions-auth {
  display: flex;
  flex-direction: row;
}

.btn-outline {
  margin-left: 10px;
}

#menu-bar {
  display: flex;
  justify-content: space-evenly;
  max-width: 1024px;
  margin: auto;
  position: relative;
  flex: 1;

  li {
    margin-right: 20px;
  }
  a {
    color: #353535;
  }

  a:hover {
    text-decoration: none;
  }
  .submenu {
    visibility: hidden;
    position: absolute;
    bottom: -250px;
    right: auto;
    height: 250px;
    max-width: 100%;
    min-width: auto;
    width: auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 32px 64px -28px,
      rgba(0, 0, 0, 0.024) 0px -16px 64px -8px;
    /* transform: translate3d(-50%, -10px, 0px) scale(1, 1) perspective(1px); */
    /* transform-origin: 50% 0px;
    transition: transform 0.2s cubic-bezier(0.36, 0.66, 0.04, 1) 0s,
      opacity 0.2s linear 0s, top 0.25s step-end 0s,
      -webkit-transform 0.2s cubic-bezier(0.36, 0.66, 0.04, 1) 0s; */
  }
}

.item-submenu {
  padding: 30px;
  border-bottom: solid 2px #fff;
  margin: 0 20px;
}
.item-submenu:hover {
  border-bottom: solid 2px #cccccc;
}

.link-submenu {
  width: 100% !important;
  height: 100%;
}

#menu-bar .item-menu:hover > .submenu {
  visibility: visible;
}
</style>
