<template>
  <section class="content">
    <page-title
      heading="Suas Propriedades"
      subheading="Todas as propriedades cadastradas seguem listadas abaixo."
      icon="pe-7s-graph text-success"
    ></page-title>
    <div class="row">
      <div class="col-md-4" v-for="farm in farms" :key="farm.id">
        <div class="mb-3 card card-body">
          <h5 class="card-title">{{ farm.name}}</h5>
          <p>{{farm.address}}</p>
          <router-link
            :to="{name: 'farm-show', params: { id: farm.id}}"
            class="btn btn-primary mt-2"
          >Ver dados da fazenda</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from "@/Layout/Components/PageTitle.vue";

import { api } from "@/services/api";

export default {
  name: "FarmList",
  data() {
    return {
      farms: null
    };
  },
  components: {
    PageTitle
  },
  methods: {
    async getFarms() {
      await api
        .get("farm")
        .then(res => res)
        .then(res => {
          console.log("FARMS", res.data);
          this.farms = res.data;
        });
    }
  },
  created() {
    this.getFarms();
  }
};
</script>

<style scoped>
</style>
