<template>
  <div>
    <div class="h-100 bg-premium-dark">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />

          <div class="modal-dialog w-100">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="modal-title">
                  <h4 class="mt-2">
                    <div>Bem vindo,</div>
                    <span
                      >Só levará
                      <span class="text-success">alguns segundos</span> para
                      criar uma conta</span
                    >
                  </h4>
                </h5>
                <div class="divider" />
                <b-form-group id="name-label" label-for="name">
                  <b-form-input
                    id="name"
                    type="text"
                    required
                    placeholder="Nome completo"
                    name="name"
                    :class="{ 'input-has-error': $v.name.$error }"
                    @change="$v.name.$touch()"
                    v-model="name"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  id="exampleInputGroup1"
                  label-for="email"
                  description="Não se preocupe, manteremos sua privacidade."
                >
                  <b-form-input
                    id="email"
                    type="email"
                    required
                    placeholder="Seu melhor email..."
                    name="email"
                    :class="{ 'input-has-error': $v.email.$error }"
                    @change="$v.email.$touch()"
                    v-model="email"
                  >
                  </b-form-input>
                </b-form-group>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                      id="exampleInputGroup2"
                      label-for="exampleInput2"
                    >
                      <b-form-input
                        id="password"
                        type="password"
                        required
                        placeholder="Digite uma senha"
                        name="password"
                        :class="{ 'input-has-error': $v.password.$error }"
                        @change="$v.password.$touch()"
                        v-model="password"
                      >
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      id="exampleInputGroup2"
                      label-for="exampleInput2"
                    >
                      <b-form-input
                        id="password_confirmation"
                        type="password"
                        required
                        name="password_confirmation"
                        :class="{
                          'input-has-error': $v.password_confirmation.$error
                        }"
                        @change="$v.password_confirmation.$touch()"
                        v-model="password_confirmation"
                        placeholder="Digite a senha novamente"
                      >
                      </b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <b-form-checkbox name="check" id="exampleCheck">
                  Aceita nossos
                  <a href="javascript:void(0);">Termos e Condições</a>.
                </b-form-checkbox>
                <div class="divider" />
                <h6 class="mb-0">
                  Já possui uma conta?
                  <router-link class="text-primary" :to="{ name: 'Login' }"
                    >Logar</router-link
                  >
                  |
                  <router-link
                    class="text-primary"
                    :to="{ name: 'send-forgot-password' }"
                    >Esqueceu a senha?</router-link
                  >
                </h6>
              </div>
              <div class="modal-footer d-block text-center">
                <b-button
                  color="primary"
                  class="btn-wide btn-pill btn-shadow btn-hover-shine"
                  size="lg"
                  @click.prevent="storeNewUser"
                  >Criar Conta
                </b-button>
              </div>
            </div>
          </div>
          <div class="text-center text-white opacity-8 mt-3">
            Copyright &copy; Refazenda 2020
          </div>
        </b-col>
      </div>
    </div>
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
</style>
