<template>
  <section>
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="6" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />

          <div class="modal-dialog w-100">
            <div class="modal-content">
              <div class="modal-header">
                <div class="h5 modal-title">
                  Esqueceu a senha?
                  <h6 class="mt-1 mb-0 opacity-8">
                    <span>Use o formulário abaixo para recupera-la.</span>
                  </h6>
                </div>
              </div>
              <div class="modal-body">
                <div>
                  <Form>
                    <b-row form>
                      <b-col md="12">
                        <b-form-group>
                          <Label for="email">Email</Label>
                          <b-form-input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Digite o seu email..."
                            :class="{ 'input-has-error': $v.email.$error }"
                            @change="$v.email.$touch()"
                            v-model="email"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </Form>
                </div>
                <div class="divider" />
                <h6 class="mb-0">
                  <router-link class="text-primary" :to="{ name: 'Login' }"
                    >Acessar uma conta já existne</router-link
                  >
                </h6>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button
                    variant="primary"
                    size="lg"
                    @click.prevent="enviarEmail"
                    >Recuperar Senha</b-button
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
