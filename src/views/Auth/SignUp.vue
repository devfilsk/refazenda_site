<template>
  <div class="container">
    <h1>Cadastre-se</h1>
    <form>
      <input
        type="name"
        name="name"
        id="name"
        v-model="userdata.name"
        placeholder="Nome completo"
      />
      <input
        type="email"
        name="email"
        id="email"
        v-model="userdata.email"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        v-model="userdata.password"
        placeholder="Senha"
      />
      <input
        type="password_confirmation"
        name="password_confirmation"
        id="password_confirmation"
        v-model="userdata.password_confirmation"
        placeholder="Digite a senha novamente"
      />
      <input
        type="cpf"
        name="cpf"
        id="cpf"
        v-model="userdata.cpf"
        placeholder="CPF"
      />
      <button class="btn-outline" @click.prevent="storeNewUser">
        FINALIZAR CADASTRO
      </button>
      <!-- <ErroNotificacao :erros="erros" /> -->
    </form>
  </div>
</template>

<script>
// import { api } from "@/services/api";
import { mapActions } from "vuex";

import { required, minLength /*, between*/ } from "vuelidate/lib/validators";

export default {
  name: "SignUp",
  data() {
    return {
      userdata: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        cpf: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["createUser"]),
    storeNewUser() {
      console.log("submit!", this.$v);
      this.$v.$touch();
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      minLength: minLength(4)
    }
  }
};
</script>
<style scoped>
.container {
  min-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #42b983;
}

form {
  display: grid;
}

.btn-outline {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
