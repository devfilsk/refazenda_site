<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/logo.svg" alt="ReFazenda" />
      </router-link>

      <div class="actions-auth">
        <router-link
          v-if="!$store.state.auth.login || $route.path === '/'"
          class="btn-outline"
          :to="{ name: 'signup' }"
        >
          Cadastre-se
        </router-link>

        <router-link
          v-if="!$store.state.auth.login || $route.path === '/'"
          class="btn-outline"
          :to="{ name: 'Login' }"
        >
          Entrar
        </router-link>

        <button v-else class="btn-outline" @click.prevent="deslogar">
          Deslogar
        </button>
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

<style scoped>
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
</style>
