<template>
  <section class="content">
    <page-title
      heading="Informações da fazenda"
      :subheading="currentfarm ? currentfarm.address : ''"
      icon="pe-7s-graph text-success"
    >
      <button
        type="button"
        class="btn-shadow mr-3 btn btn-dark"
        v-b-tooltip.hover
        title="Favoritar fazenda"
        @click="makeMainFarm"
        :disabled="farm && farm.id === currentfarm.id"
      >
        <font-awesome-icon icon="star" :class="farm && farm.id === currentfarm.id ? 'yellow' : ''" />
      </button>
      <router-link
        :to="{ name: 'farm-edit', params: { id: currentfarm ? currentfarm.id : ''}}"
        type="button"
        class="btn-shadow d-inline-flex align-items-center btn btn-success"
      >
        <font-awesome-icon class="mr-2" icon="fa-pen" />Editar Fazenda
      </router-link>
    </page-title>
    <div class="card mb-3">
      <div class="no-gutters row">
        <b-col md="12">
          <b-card class="mb-3 nav-justified" no-body>
            <b-tabs pills card>
              <b-tab title="Detalhes da Fazenda" active>
                <div class="row">
                  <b-col md="6" class="details-grid">
                    <strong>Nome</strong>
                    <strong>:</strong>
                    <p>{{ currentfarm.name }}</p>

                    <strong>Endereço</strong>
                    <strong>:</strong>
                    <p>{{ currentfarm.address }}</p>

                    <strong>Estado</strong>
                    <strong>:</strong>
                    <p>{{ currentfarm.state_registration }}</p>

                    <strong>Endereço de cobrança</strong>
                    <strong>:</strong>
                    <p>{{ currentfarm.billing_address }}</p>

                    <strong>Area de produção</strong>
                    <strong>:</strong>
                    <p>{{ currentfarm.production_area }}</p>

                    <strong>Tipo de produção</strong>
                    <strong>:</strong>
                    <p>{{ currentfarm.production_type }}</p>
                  </b-col>
                  <b-col md="6" class="logo-content">
                    <span class="farm-logo">
                      <h4>LOGO DA FAZENDA</h4>
                    </span>
                  </b-col>
                </div>
              </b-tab>
              <b-tab title="Outras informações">
                <p>
                  Like Aldus PageMaker including versions of Lorem. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from "@/Layout/Components/PageTitle.vue";
import { api } from "@/services/api";
import { mapActions, mapState } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Farm from "@/interfaces/Farm";

export default {
  name: "FarmShow",
  data() {
    return {
      currentfarm: Farm
    };
  },
  components: {
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon
  },
  computed: {
    ...mapState("farm", ["farm"])
  },
  created() {
    document.title = Fazenda;
  },
  methods: {
    ...mapActions("farm", ["setFarmTenant"]),
    async getFarm() {
      const farmId = this.$route.params.id;
      await api
        .get(`farm/${farmId}`)
        .then(res => res)
        .then(res => {
          this.currentfarm = res.data;
        });
    },
    makeMainFarm() {
      this.setFarmTenant(this.currentfarm.id).then(res => {
        if (res.status === 201) {
          console.log("RESs->", res);

          this.$toast.open(`${res.data.farm.name} foi definida como padrão`);
        }
      });
    }
  },
  created() {
    this.getFarm();
  }
};
</script>

<style lang="scss" scoped>
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  margin-bottom: 60px;
  row-gap: 10px;
}
.logo-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.farm-logo {
  display: flex;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  background-color: #c5c5c5;
  color: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>