import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import { defaultClient as apolloClient } from './main';
import { FETCH_PROJECTS, SIGNIN_ADMIN, GET_CURRENT_ADMIN, INFINITE_SCROLL_PROJECTS } from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    loading: false,
    admin: null,
    formError: null
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setAdmin(state, payload) {
      state.admin = payload;
    },
    clearAdmin: state => (state.admin = null),
    setFormError(state, payload) {
      state.formError = payload;
    },
    clearFormError: state => (state.formError = null),
  },
  actions: {
    fetchProjects({ commit }) {
      commit('setLoading', true);
      apolloClient
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
      //clear token before signing in in the case of a malformed token
      localStorage.setItem('token', '');
      commit('clearFormError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: SIGNIN_ADMIN,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);
          localStorage.setItem('token', data.signinAdmin.token);
          //force a page refresh so that the getCurrentAdmin function executes
          router.go();
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setFormError', err);
        });
    },
    getCurrentAdmin({ commit }) {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_CURRENT_ADMIN
        })
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setAdmin', data.getCurrentAdmin);
        })
        .catch(err => {
          commit('setLoading', false);
        });
    },
    async signoutAdmin({ commit }) {
      commit('clearAdmin');
      localStorage.setItem('token', '');
      //clear store and redirect off protected route
      await apolloClient.resetStore();
      router.push('/');
    }
  },
  getters: {
    projects: state => state.projects,
    loading: state => state.loading,
    admin: state => state.admin,
    formError: state => state.formError
  }
});
