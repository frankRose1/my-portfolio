import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#cb3837',
    secondary: '#F25F5C',
    error: '#722530',
    warning: '#FFCF56',
    info: '#357edd',
    accent: '#f09233'
  }
});

// original theme
// primary: '#5E977B',
// secondary: '#80CFA9',
// error: '#722530',
// warning: '#FFCF56',
// info: '#B2CEDE',
// accent: '#F25F5C'