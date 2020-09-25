<template>
  <section class="login">
    <h1>Login</h1>
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
      <!-- <label for="password">Senha</label> -->
      <input
        type="password"
        name="password"
        id="password"
        :class="{ 'input-has-error': $v.password.$error }"
        @change="$v.password.$touch()"
        v-model="password"
        placeholder="Senha"
      />
      <button class="btn-outline" @click.prevent="logar">Logar</button>
      <!-- <ErroNotificacao :erros="erros" /> -->
      <router-link class="forgot-link" :to="{ name: 'send-forgot-password' }"
        >Esqueceu a senha?</router-link
      >
    </form>
    <!-- <p class="perdeu">
      <a
        href="http://ranekapilocal.local/wp-login.php?action=lostpassword"
        target="_blank"
      >Perdeu a password? Clique aqui.</a>
    </p>-->
    <!-- <LoginCriar/> -->
  </section>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      erros: []
    };
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),
    logar() {
      if (!this.$v.$invalid) {
        this.loginUser({ email: this.email, password: this.password })
          .then(response => {
            console.log("AUTH", response);
            this.$toast.open("Login realizado com sucesso!");
            this.$router.push("/panel");
          })
          .catch(e => {
            this.$toast.open({
              message: e.response.data.message,
              type: "error"
            });
          });
      } else {
        this.$v.$touch();
      }
      // this.erros = [];
      // this.$store
      //   .dispatch("logarUsuario", this.login)
      //   .then(response => {
      //     if (response.status === 201) {
      //       if (parseInt(response.data.user.access) === 1) {
      //         window.localStorage.token = `Bearer ${response.data.token}`;
      //         this.logarUsuario(response.data.user)
      //         this.$store.dispatch("getUsuario", response.data.user);

      //         this.$router.push({ name: "conteudo-lista" });
      //       } else {
      //         this.$toasted.show("Usuário sem permissão de acesso!");
      //       }
      //     }
      //   })
      //   .catch(error => {
      //     console.log("ERROOR", error);
      //     this.erros.push(error.response.data.message);
      //   });
    }
  },
  created() {
    document.title = "Login";
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
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

.btn-outline {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.forgot-link {
  display: flex;
  align-self: flex-start;
  margin-top: 20px;
  color: #42b983;
}
</style>
