import { api, TOKEN_LABEL } from "../../../services/api";

const state = () => ({
  user: Object,
  login: false
});

export const actions = {
  createUser(context: any, payload: any) {
    return api.post(`/register`, payload).then((response: any) => response);
  },
  loginUser(context: any, payload: any) {
    return api.post(`/login`, payload).then((response: any) => {
      console.log("DADOS", response);
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
  }
};

export const mutations = {
  UPDATE_LOGIN(state: any, payload: boolean) {
    state.login = payload;
  },
  UPDATE_USUARIO(state: any, payload: any) {
    state.user = payload;
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
