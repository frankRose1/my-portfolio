import Vue from 'vue';
import Vuex from 'vuex';
import { defaultClient as apolloCiient } from './main';
import { gql } from 'apollo-boost';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    loading: false
  },
  mutations: {
    setProjects(state, payload){
      state.projects = payload 
    },
    setLoading(state, payload){
      state.loading = payload
    }
  },
  actions: {
    fetchProjects({ commit }) {
      commit('setLoading', true)
      apolloCiient
        .query({
          query: gql`
            query {
              fetchProjects {
                _id
                imageUrl
                title
              }
            }
          `
        })
        .then(({data}) => {
          console.log(data)
          commit('setLoading', false);
          commit('setProjects', data.fetchProjects)
        })
        .catch(err => {
          commit('setLoading', false);
          console.log(err);
        });
    }
  },
  getters: {
    projects: state => state.projects,
    loading: state => state.loading
  }
});
