import { api, TOKEN_LABEL } from "../../../services/api";

export type State = {
  user: {
    name: string,
  },
  login: boolean
}

const state: State = {
  user: Object,
  login: false
};

export const actions = {
  createUser(context: any, payload: any) {
    return api.post(`/register`, payload).then((response: any) => response);
  },
  loginUser(context: any, payload: any) {
    console.log("Teste", context.rootState);

    return api.post(`/login`, payload).then((response: any) => {
      context.commit("UPDATE_USUARIO", response.data.user);
      context.commit("UPDATE_LOGIN", true);
      context.commit("UPDATE_TOKEN", response.data.token);
    });
  },
  criarUsuario(context: any, payload: any) {
    context.commit("UPDATE_USUARIO", { id: payload.email });
    return api.post(`/usuarios`, payload);
  },
  deslogarUsuario(context: any) {
    context.commit("UPDATE_USUARIO", {});
    context.commit("UPDATE_LOGIN", false);
    localStorage.removeItem(TOKEN_LABEL);
  },
  getLoggededUser(context: any, payload: any) {
    return api.get("user/me");
  },
  setUser(context: any, payload: any) {
    context.commit("UPDATE_USUARIO", payload);
    if(payload) {
      context.commit("UPDATE_LOGIN", true);
    }else{
      context.commit("UPDATE_LOGIN", false);
    }
  },
  loadInitialContext({ commit, rootState}) {
    api.get("user/me").then(res => {
      if(res.status === 200) {
        console.log("ROOTSTATE", rootState)
        rootState.farm.farm = res.data.farm;
        rootState.auth.user = res.data.user;
      }
    })
  },
  updateUser(context: any, payload: any) {
    return api.put(`user/${context.state.user.id}`, payload).then(res => {
      if(res.status === 201){
        context.commit("UPDATE_USUARIO", res.data);
      }
      return res;
    });
  },
  updateUserData(context: any, payload: any) {
    context.commit("UPDATE_USUARIO", payload);
  }
};

export const mutations = {
  UPDATE_LOGIN(state: any, payload: boolean) {
    state.login = payload;
  },
  UPDATE_USUARIO(state: any, payload: any) {
    state.user = { ...state.user, ...payload};
  },
  UPDATE_TOKEN(state: any, payload: any) {
    const token = `Bearer ${payload}`;
    localStorage.setItem(TOKEN_LABEL, token);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
