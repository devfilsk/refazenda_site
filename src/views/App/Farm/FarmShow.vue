<template>
  <section class="content">
    <page-title
      :heading="farm ? farm.name : ''"
      :subheading="farm ? farm.address : ''"
      icon="pe-7s-graph text-success"
    >
      <button type="button" class="btn-shadow mr-3 btn btn-dark">
        <font-awesome-icon icon="star" />
      </button>
      <router-link
        :to="{ name: 'farm-edit', params: { id: farm ? farm.id : ''}}"
        type="button"
        class="btn-shadow d-inline-flex align-items-center btn btn-success"
      >
        <font-awesome-icon class="mr-2" icon="plus" />Editar Fazenda
      </router-link>
    </page-title>
    <div class="card mb-3">
      <div class="no-gutters row">
        <div class="col-md-12 col-lg-4">
          <ul class="list-group list-group-flush">
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Total de Animais</div>
                      <div class="widget-subheading">Last year expenses</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-success">1896</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Clients</div>
                      <div class="widget-subheading">Total Clients Profit</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-primary">$12.6k</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-12 col-lg-4">
          <ul class="list-group list-group-flush">
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Followers</div>
                      <div class="widget-subheading">People Interested</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-danger">45,9%</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Products Sold</div>
                      <div class="widget-subheading">Total revenue streams</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-warning">$3M</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-12 col-lg-4">
          <ul class="list-group list-group-flush">
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Total Orders</div>
                      <div class="widget-subheading">Last year expenses</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-success">1896</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="bg-transparent list-group-item">
              <div class="widget-content p-0">
                <div class="widget-content-outer">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">Clients</div>
                      <div class="widget-subheading">Total Clients Profit</div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-numbers text-primary">$12.6k</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from "@/Layout/Components/PageTitle.vue";
import { api } from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "FarmShow",
  data() {
    return {
      farm: null
    };
  },
  components: {
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon
  },
  methods: {
    async getFarm() {
      const farmId = this.$route.params.id;
      await api
        .get(`farm/${farmId}`)
        .then(res => res)
        .then(res => {
          this.farm = res.data;
        });
    }
  },
  created() {
    this.getFarm();
  }
};
</script>