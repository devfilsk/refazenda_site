<template>
  <section>
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />

          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title text-center">
                  <h4 class="mt-2">
                    <div>Bem vindo de volta,</div>
                    <span>Entre com suas credenciais para continuar.</span>
                  </h4>
                </div>
                <b-form-group
                  id="exampleInputGroup1"
                  label-for="exampleInput1"
                  description="Nós nunca compartilharemos o seu email com ninguem."
                >
                  <b-form-input
                    id="email"
                    type="email"
                    required
                    placeholder="Digite o seu email..."
                    name="email"
                    :class="{ 'input-has-error': $v.email.$error }"
                    @change="$v.email.$touch()"
                    v-model="email"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2" label-for="exampleInput2">
                  <b-form-input
                    name="password"
                    type="password"
                    required
                    placeholder="Digire sua senha..."
                    id="password"
                    :class="{ 'input-has-error': $v.password.$error }"
                    @change="$v.password.$touch()"
                    v-model="password"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-checkbox name="check" id="exampleCheck">
                  Me mantenha logado
                </b-form-checkbox>
                <div class="divider" />
                <h6 class="mb-0">
                  Ainda não é cadastrado?

                  <router-link class="text-primary" :to="{ name: 'signup' }"
                    >Cadastre-se</router-link
                  >
                </h6>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-left">
                  <router-link
                    class="btn-lg btn btn-link"
                    :to="{ name: 'send-forgot-password' }"
                    >Esqueceu a senha?</router-link
                  >
                </div>
                <div class="float-right">
                  <b-button variant="primary" size="lg" @click.prevent="logar"
                    >Acessar o sistema</b-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="text-center text-white opacity-8 mt-3">
            Copyright &copy; Refazenda 2020
          </div>
        </b-col>
      </div>
    </div>
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
