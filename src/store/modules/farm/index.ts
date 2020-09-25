import { api, TOKEN_LABEL } from "../../../services/api";

const state = () => ({
  farm: Object,
  selected: false
});

export const actions = {
  createFarm(context: any, payload: any) {
    return api.post(`/farm`, payload).then((response: any) => {
      if (response.status === 201) {
        context.commit("UPDATE_FARM", response.data);
      }
    });
  }
};

export const mutations = {
  UPDATE_FARM(state: any, payload: Object) {
    state.farm = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
