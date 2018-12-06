import Vue from 'vue';
import Vuex from 'vuex';
import { defaultClient as apolloCiient } from './main';
import { FETCH_PROJECTS, SIGNIN_ADMIN } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    loading: false
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    fetchProjects({ commit }) {
      commit('setLoading', true);
      apolloCiient
        .query({
          query: FETCH_PROJECTS
        })
        .then(({ data }) => {
          console.log(data);
          commit('setLoading', false);
          commit('setProjects', data.fetchProjects);
        })
        .catch(err => {
          commit('setLoading', false);
          console.log(err);
        });
    },
    signinAdmin({ commit }, payload) {
      apolloCiient
        .mutate({
          mutation: SIGNIN_ADMIN,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signinAdmin.token);
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {
    projects: state => state.projects,
    loading: state => state.loading
  }
});
