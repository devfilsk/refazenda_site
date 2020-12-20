<template>
  <div class="d-flex">
    <div class="header-btn-lg pr-0">
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
              <span slot="button-content">
                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <img v-if="user.picture" width="42" height="42" class="rounded-circle" :src="user.picture ? user.picture : '@/assets/images/avatars/user-circle-solid.svg'" />
                  <img v-else width="42" height="42" class="rounded-circle" src="@/assets/images/avatars/user-circle-solid.svg" />
                </div>
              </span>
              <router-link class="dropdown-item" :to="{ name: 'user-profile' }">Perfil</router-link>
              <button type="button" tabindex="0" class="dropdown-item">Settings</button>
              <h6 tabindex="-1" class="dropdown-header">Header</h6>
              <button
                type="button"
                tabindex="0"
                class="dropdown-item"
                v-b-modal.modal-1
                @click="getFarms"
              >Fazenda Padrão</button>
              <div tabindex="-1" class="dropdown-divider"></div>
              <button type="button" tabindex="0" class="dropdown-item" @click="logout">Sair</button>
            </b-dropdown>
          </div>
          <div class="widget-content-left ml-3 header-user-info">
            <div class="widget-heading">{{ user ? user.name : 'Carregando...' }}</div>
            <div class="widget-subheading">{{ farm ? farm.name : "" }}</div>
          </div>
          <div class="widget-content-right header-user-info ml-3">
            <b-btn
              v-b-tooltip.hover
              title="Tooltip Example"
              class="btn-shadow p-1"
              size="sm"
              variant="info"
            >
              <font-awesome-icon icon="calendar-alt" class="mr-1 ml-1" />
            </b-btn>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modal-1" size="md" title="Alterar fazenda padrão" hide-footer no-stacking>
      <div class="d-block text-center">
        <h4>Selecione uma fazenda:</h4>
        <br />
        <multiselect
          v-model="farmSelected"
          :value="farmSelected"
          deselect-label="Selecione outra para remover"
          track-by="name"
          label="name"
          placeholder="Selecione uma"
          :options="farms"
          :searchable="false"
          :allow-empty="false"
          selectLabel="Pressione enter"
          selectedLabel="SELECIONADO"
          :custom-label="nameWithState"
        >
          <template slot="singleLabel" slot-scope="{ option }">
            <strong>{{ option.name }}</strong> Estado:
            <strong>{{ option.state_registration }}</strong>
          </template>
        </multiselect>
      </div>
      <br />
      <b-button class="mt-3" block @click="saveDefaultFarm" :disabled="loading">
        Salvar
        <b-spinner v-if="loading" variant="primary" label="Text Centered"></b-spinner>
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Multiselect from "vue-multiselect";
import { api } from "../../../services/api";

library.add(
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
);

export default {
  components: {
    VuePerfectScrollbar,
    "font-awesome-icon": FontAwesomeIcon,
    Multiselect
  },
  data: () => {
    return {
      loading: false,
      farms: [],
      farmSelected: null
    };
  },
  created() {
    this.farmSelected = this.farm;
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("farm", ["farm"])
  },
  methods: {
    ...mapActions("auth", ["deslogarUsuario"]),
    ...mapActions("farm", ["getUserFarms", "updateFarm"]),
    getFarms() {
      this.getUserFarms()
        .then(res => res)
        .then(res => {
          this.farms = res.data;
          console.log("FARMSSS", res);
        });
    },
    async saveDefaultFarm() {
      this.loading = true;
      const response = await api.put(`tenant/${this.farmSelected.id}`);
      console.log("RESPONSE => ", response);
      this.loading = false;
      if (response.status === 201) {
        this.$toast.open("Fazenda padrão alterada com sucesso!");
        this.$bvModal.hide("modal-1");
        this.updateFarm(this.farmSelected);
      }
    },
    logout() {
      this.deslogarUsuario();
      this.$router.go();
      this.$router.push("/");
    },
    nameWithState({ name, state_registration }) {
      return `${name} | ${state_registration}`;
    }
  }
};
</script>
