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
        <Form ref="form" :form="form" @submit.prevent>
          <button @click.prevent="criarFazenda" class="mt-2 btn btn-primary">Cadastrar</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import { mapActions } from "vuex";

import PageTitle from "@/Layout/Components/PageTitle.vue";

import Form from "./components/form";

export default {
  name: "FarmCreate",
  components: {
    PageTitle,
    Form
  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        state_registration: "",
        billing_address: "",
        production_area: "",
        production_type: "",
        edit: false
      }
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
      this.$refs.form
        .submit()
        .then(payload => {
          console.log("AQUI", this.$refs.form.model);
          this.createFarm(this.$refs.form.model)
            .then(response => {
              if (response.status === 201) {
                this.$toast.open("Fazenda criada com sucesso!");
                this.$router.push({
                  name: "farm-show",
                  params: { id: response.data.id }
                });
              }
            })
            .catch(err => {
              this.$toast.open({
                message: err.response.data.message,
                type: "error"
              });
            });
        })
        .catch(error => console.error(error));
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
