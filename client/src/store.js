import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import { defaultClient as apolloClient } from './main';
import {
  FETCH_PROJECTS,
  SIGNIN_ADMIN,
  GET_CURRENT_ADMIN,
  POST_PROJECT,
  SEARCH_PROJECTS,
  SEND_EMAIL,
  DELETE_PROJECT
} from './queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    searchResults: [],
    loading: false,
    admin: null,
    formError: null,
    emailSent: null
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setSearchResults(state, payload) {
      if (payload !== null) {
        state.searchResults = payload;
      }
    },
    clearSearchResults: state => (state.searchResults = []),
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
    setEmailSent: state => (state.emailSent = true),
    resetEmailSent: state => (state.emailSent = null)
  },
  actions: {
    fetchProjects({ commit }) {
      commit('setLoading', true);
      apolloClient
        .query({
          query: FETCH_PROJECTS
        })
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setProjects', data.fetchProjects);
        })
        .catch(err => {
          commit('setLoading', false);
        });
    },
    searchProjects({ commit }, payload) {
      apolloClient
        .query({
          query: SEARCH_PROJECTS,
          variables: payload
        })
        .then(({ data }) => {
          commit('setSearchResults', data.searchProjects);
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendEmail({ commit }, payload) {
      commit('resetEmailSent');
      commit('clearFormError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: SEND_EMAIL,
          variables: payload
        })
        .then(({ data }) => {
          commit('setLoading', false);
          commit('setEmailSent', true);
          router.push('/');
        })
        .catch(err => {
          commit('setFormError', err);
          commit('setLoading', false);
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
    },
    deleteProject({ commit }, payload) {
      commit('clearFormError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: DELETE_PROJECT,
          variables: payload
        })
        .then(({ data }) => {
          router.push('/');
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setFormError', err);
        });
    },
    postProject({ commit }, payload) {
      commit('clearFormError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: POST_PROJECT,
          variables: payload,
          //tell apollo how to update the data
          update: (cache, { data }) => {
            const { postProject } = data;
            const cacheData = cache.readQuery({
              query: FETCH_PROJECTS
            });
            cacheData.fetchProjects.unshift(postProject);
            //write the updated data back
            cache.writeQuery({
              query: FETCH_PROJECTS,
              data: cacheData
            });
          },
          //tell apollo to update the data immediately
          optimisticResponse: {
            __typename: 'Mutation',
            postProject: {
              __typename: 'Project',
              _id: -1,
              ...payload
            }
          }
        })
        .then(({ data }) => {
          commit('setLoading', false);
          router.push('/');
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setFormError', err);
        });
    }
  },
  getters: {
    projects: state => state.projects,
    loading: state => state.loading,
    admin: state => state.admin,
    formError: state => state.formError,
    searchResults: state => state.searchResults,
    emailSent: state => state.emailSent
  }
});
