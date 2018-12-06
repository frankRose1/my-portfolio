import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import FormAlert from './components/Shared/FormAlert.vue';

//regsiter form alert globally
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

//export client to be used in the store to fire off queries/mutations
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    //set the auth headers
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  //inject apollo in to components
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created() {
    //execute getCurrentAdmin when app is created
    this.$store.dispatch('getCurrentAdmin');
  }
}).$mount('#app');
