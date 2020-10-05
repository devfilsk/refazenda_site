<template>
  <div class="content">
    <page-title
      heading="Criar sua fazenda"
      subheading="Cadastre uma nova fazenda e tenha todos os dados da sua produção facilmente."
      icon="pe-7s-graph text-success"
    ></page-title>
    <div class="main-card mb-3 card">
      <div class="card-body">
        <!-- <h5 class="card-title">Grid Rows</h5> -->
        <form class="">
          <div class="position-relative form-group">
            <!-- <label for="name" class="">Nome</label> -->
            <input
              type="name"
              name="name"
              id="name"
              :class="{ 'input-has-error': $v.name.$error }"
              @change="$v.name.$touch()"
              v-model="name"
              placeholder="Nome da fazenda"
              class="form-control"
            />
          </div>
          <div class="position-relative form-group">
            <!-- <label for="address" class="">Endereço da fazenda</label> -->
            <input
              type="text"
              name="address"
              id="address"
              :class="{ 'input-has-error': $v.address.$error }"
              @change="$v.address.$touch()"
              v-model="address"
              placeholder="Endereço da fazenda"
              class="form-control"
            />
          </div>
          <div class="position-relative form-group">
            <!-- <label for="address" class="">Endereço de cobranca</label> -->
            <input
              type="text"
              name="billing_address"
              id="billing_address"
              :class="{ 'input-has-error': $v.billing_address.$error }"
              @change="$v.billing_address.$touch()"
              v-model="billing_address"
              placeholder="Endereço de cobrança"
              class="form-control"
            />
          </div>
          <div class="form-row">
            <div class="col-md-2">
              <div class="position-relative form-group">
                <!-- <label for="state_registration" class="">Estado</label> -->
                <input
                  type="text"
                  name="state_registration"
                  id="state_registration"
                  :class="{ 'input-has-error': $v.state_registration.$error }"
                  @change="$v.state_registration.$touch()"
                  v-model="state_registration"
                  placeholder="Estado"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="position-relative form-group">
                <!-- <label for="production_area" class="">Area de produção</label> -->
                <input
                  type="text"
                  name="production_area"
                  id="production_area"
                  :class="{ 'input-has-error': $v.production_area.$error }"
                  @change="$v.production_area.$touch()"
                  v-model="production_area"
                  placeholder="Área de produção"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-5">
              <div class="position-relative form-group">
                <!-- <label for="production_type" class="">Tipo de produção</label> -->
                <input
                  type="text"
                  name="production_type"
                  id="production_type"
                  :class="{ 'input-has-error': $v.production_type.$error }"
                  @change="$v.production_type.$touch()"
                  v-model="production_type"
                  placeholder="Tipo de produção"
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <!-- <div class="position-relative form-check">
            <input
              name="check"
              id="exampleCheck"
              type="checkbox"
              class="form-check-input"
            /><label for="exampleCheck" class="form-check-label"
              >Check me out</label
            >
          </div> -->
          <button @click.prevent="criarFazenda" class="mt-2 btn btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

import PageTitle from "@/Layout/Components/PageTitle.vue";

export default {
  name: "FarmCreate",
  components: {
    PageTitle
  },
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
