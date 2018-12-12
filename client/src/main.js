import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import VueParticles from 'vue-particles';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import FormAlert from './components/Shared/FormAlert.vue';
import Loading from './components/Shared/Loading.vue';
import { SERVER_URL } from './config';

//regsiter form alert globally
Vue.component('form-alert', FormAlert);
Vue.component('loading-animation', Loading);

Vue.use(VueApollo);
Vue.use(VueParticles);

//export client to be used in the store to fire off queries/mutations
export const defaultClient = new ApolloClient({
  uri: SERVER_URL,
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
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  //inject apollo in to components
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    //execute getCurrentAdmin when app is created
    this.$store.dispatch('getCurrentAdmin');
  }
}).$mount('#app');
