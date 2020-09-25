<template>
  <section class="container">
    <h1>Cadastrar Fazenda</h1>
    <form>
      <!-- <label for="email">Email</label> -->
      <input
        type="name"
        name="name"
        id="name"
        :class="{ 'input-has-error': $v.name.$error }"
        @change="$v.name.$touch()"
        v-model="name"
        placeholder="Nome da fazenda"
      />
      <input
        type="text"
        name="address"
        id="address"
        :class="{ 'input-has-error': $v.address.$error }"
        @change="$v.address.$touch()"
        v-model="address"
        placeholder="Endereço da fazenda"
      />
      <input
        type="text"
        name="billing_address"
        id="billing_address"
        :class="{ 'input-has-error': $v.billing_address.$error }"
        @change="$v.billing_address.$touch()"
        v-model="billing_address"
        placeholder="Endereço de cobrança"
      />
      <input
        type="text"
        name="state_registration"
        id="state_registration"
        :class="{ 'input-has-error': $v.state_registration.$error }"
        @change="$v.state_registration.$touch()"
        v-model="state_registration"
        placeholder="Estado"
      />
      <input
        type="text"
        name="production_area"
        id="production_area"
        :class="{ 'input-has-error': $v.production_area.$error }"
        @change="$v.production_area.$touch()"
        v-model="production_area"
        placeholder="Área de produção"
      />
      <input
        type="text"
        name="production_type"
        id="production_type"
        :class="{ 'input-has-error': $v.production_type.$error }"
        @change="$v.production_type.$touch()"
        v-model="production_type"
        placeholder="Tipo de produção"
      />
      <button class="btn-outline" @click.prevent="criarFazenda">Criar fazenda</button>
    </form>
  </section>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

export default {
  name: "FarmCreate",
  data() {
    return {
      name: "",
      address: "",
      state_registration: "",
      billing_address: "",
      production_area: "",
      production_type: "",
      edit: false
    };
  },
  created() {
    console.log("ROUTER", this.$route);
    if (this.$route.params.id) {
      this.edit = true;
    }
  },
  methods: {
    ...mapActions("farm", ["createFarm"]),
    criarFazenda() {
      if (!this.$v.$invalid) {
        console.log("Criar Fazenda");
        this.createFarm({
          name: this.name,
          address: this.address,
          state_registration: this.state_registration,
          billing_address: this.billing_address,
          production_area: this.production_area,
          production_type: this.production_type
        })
          .then(response => {
            if (response.status === 201) {
              this.$toast.open("Fazenda criada com sucesso!");
              this.$router.push({ name: "farm-show" });
            }
          })
          .catch(err => {
            this.$toast.open({
              message: err.response.data.message,
              type: "error"
            });
          });
      } else {
        console.log("Formulario invalido ", this.$v);
        this.$v.$touch();
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(6)
    },
    address: {
      required
    },
    state_registration: {
      required
    },
    billing_address: {
      required
    },
    production_area: {
      required
    },
    production_type: {
      required
    }
  }
};
</script>

<style scoped>
section {
  max-width: 700px;
  margin: auto auto;
  padding: 0 20px;
}

form {
  display: grid;
}
</style>
