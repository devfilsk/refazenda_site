<template>
  <b-modal
    id="modal-edit-user"
    size="md"
    title="Alterar seus dados pessoais"
    hide-footer
    no-stacking
  >
    <div class="d-block text-center">
      <div class="position-relative form-group">
        <!-- <label for="production_area" class="">Area de produção</label> -->
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          class="form-control"
          :class="{ 'input-has-error': $v.dataUser.name.$error }"
          @change="$v.dataUser.name.$touch()"
          v-model="dataUser.name"
        />
      </div>
      <div class="position-relative form-group">
        <!-- <label for="production_area" class="">Area de produção</label> -->
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          class="form-control"
          :class="{ 'input-has-error': $v.dataUser.email.$error }"
          @change="$v.dataUser.email.$touch()"
          v-model="dataUser.email"
        />
      </div>
      <div class="position-relative form-group">
        <!-- <label for="production_area" class="">Area de produção</label> -->
        <input
          type="text"
          name="cpf"
          id="production_area"
          placeholder="CPF"
          class="form-control"
          :class="{ 'input-has-error': $v.dataUser.cpf.$error }"
          @change="$v.dataUser.cpf.$touch()"
          v-model="dataUser.cpf"
        />
      </div>
    </div>
    <br />
    <b-button
      class="mt-3 btn-success text-white"
      block
      @click.prevent="editUser"
      :disabled="loading"
    >
      Salvar
      <b-spinner
        v-if="loading"
        variant="light"
        label="Text Centered"
      ></b-spinner>
    </b-button>
  </b-modal>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import { api } from '@/services/api';

export default {
  name: "ModalEditUser",
  props: {
    user: null
  },
  data() {
    return {
      loading: false,
      dataUser: {
        name: '',
        email: '',
        cpf: ''
      }
    }  
  },
  methods: {
    ...mapActions("auth", ["updateUser"]),
    editUser() {
      if (!this.$v.$invalid) {
        this.updateUser(this.dataUser).then(res => {
          if(res.status === 201) {
            this.$toast.open("Dados atualizado com sucesso.");
            this.$bvModal.hide("modal-edit-user");
          }else{
            this.$toast.open({
              message: "Algo deu errado ao atualizar o seu perfil.",
              type: "warning"
            });
          }
        }).catch(e => {
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
    dataUser: {
      email: {
        required,
        email
      },
      name: {
        required,
        minLength: minLength(6)
      },
      cpf: {
        required,
      }
    }
  },
  watch: {
    user() {
      this.dataUser = {...this.dataUser, ...this.user};
    }
  }
};
</script>
