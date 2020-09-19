<template>
  <div class="container">
    <h1>Cadastre-se</h1>
    <form>
      <input
        type="name"
        name="name"
        id="name"
        :class="{ 'has-error': $v.name.$error }"
        @change="$v.name.$touch()"
        v-model="name"
        placeholder="Nome completo"
      />
      <input
        type="email"
        name="email"
        :class="{ 'has-error': $v.email.$error }"
        id="email"
        @change="$v.email.$touch()"
        v-model="email"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        :class="{ 'has-error': $v.password.$error }"
        id="password"
        @change="$v.password.$touch()"
        v-model="password"
        placeholder="Senha"
      />
      <input
        type="password"
        name="password_confirmation"
        :class="{ 'has-error': $v.password_confirmation.$error }"
        id="password_confirmation"
        @change="$v.password_confirmation.$touch()"
        v-model="password_confirmation"
        placeholder="Digite a senha novamente"
      />
      <!-- <input
        type="cpf"
        name="cpf"
        :class="{'has-error' : $v.password_confirmation.$error}"
        id="cpf"
        v-model.trim="cpf"
        placeholder="CPF"
      />-->
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

import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import api from "@/services/api";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
      // cpf: ""
    };
  },
  methods: {
    ...mapActions("auth", ["createUser"]),
    storeNewUser() {
      console.log("submit!", this.$v);

      if (!this.$v.$invalid) {
        this.createUser({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
          .then(response => {
            this.$toast.open("Cadastro realizado com sucesso!");
            this.$router.push("Login");
          })
          .catch(e => {
            this.$toast.open({
              message: e.response.data[0].message,
              type: "error"
            });
          });
      } else {
        this.$v.$touch();
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(5)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password_confirmation: {
      required,
      sameAs: sameAs("password")
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

.has-error {
  border: solid red 1px;
}
</style>
