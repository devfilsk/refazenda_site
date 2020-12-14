import { api, TOKEN_LABEL } from "../../../services/api";

import FarmContext from "@/interfaces/FarmContext";

const state = <FarmContext>() => ({
  farm: null,
  selected: false
});

export const actions = {
  createFarm(context: any, payload: any) {
    return api.post(`/farm`, payload).then((response: any) => {
      console.log("FAAARM", response);
      // if (response.status === 201) {
      //   context.commit("UPDATE_FARM", response.data);
      // }
      return response;
    });
  },
  editFarm(context: any, payload: any) {
    return api.put(`/farm/${payload.id}`, payload).then((response: any) => {
      console.log("FAAARM", response);
      // if (response.status === 201) {
      //   context.commit("UPDATE_FARM", response.data);
      // }
      return response;
    });
  },
  updateFarm(context: any, payload: any) {
    context.commit("UPDATE_FARM", payload);
  },
  getUserFarms(context: any) {
    return api.get("farm");
  },
  getCurrentFarm(context: any, payload: any) {
    return api.get("tenant/farm");
  },
  setFarmTenant(context: any, payload: any) {
    return api.put(`farmtenant/${payload}`).then(res => {
      if (res.status === 201) {
        context.commit("UPDATE_FARM", res.data.farm);
      }
      return res;
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
