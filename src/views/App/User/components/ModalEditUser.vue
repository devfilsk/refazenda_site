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
          name="production_area"
          id="production_area"
          placeholder="Nome"
          class="form-control"
          :value="user.name"
        />
      </div>
      <div class="position-relative form-group">
        <!-- <label for="production_area" class="">Area de produção</label> -->
        <input
          type="text"
          name="production_area"
          id="production_area"
          placeholder="Email"
          class="form-control"
          :value="user.email"
        />
      </div>
      <div class="position-relative form-group">
        <!-- <label for="production_area" class="">Area de produção</label> -->
        <input
          type="text"
          name="production_area"
          id="production_area"
          placeholder="CPF"
          class="form-control"
          :value="user.cpf"
        />
      </div>
    </div>
    <br />
    <b-button
      class="mt-3 btn-success text-white"
      block
      @click="editUser"
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
export default {
  name: "ModalEditUser",
  props: {
    user: null
  },
  data() {
    return {
      loading: false
    }  
  },
  methods: {
    editUser() {
      
    }
  }
};
</script>
