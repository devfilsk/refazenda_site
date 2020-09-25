<template>
  <section class="login">
    <h1>Recuperar sua senha</h1>
    <p>
      Digite o seu email e enviaremos um link para que você possa alterar a sua
      senha.
    </p>
    <form>
      <!-- <label for="email">Email</label> -->
      <input
        type="email"
        name="email"
        id="email"
        :class="{ 'input-has-error': $v.email.$error }"
        @change="$v.email.$touch()"
        v-model="email"
        placeholder="Email"
      />
      <button class="btn-outline" @click.prevent="enviarEmail">
        Enviar email
      </button>
    </form>
  </section>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "SendForgotPassword",
  data() {
    return {
      email: ""
    };
  },
  methods: {
    enviarEmail() {
      console.log("AQUI");
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
};
</script>

<style scoped>
.login {
  min-width: 500px;
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
</style>
