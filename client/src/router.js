import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import ProtectedRoute from './ProtectedRoute';

//Admin
import AddProject from './components/Admin/AddProject';
import AdminSignin from './components/Admin/AdminSignin';

//projects
import Projects from './components/Projects/Projects';
import Project from './components/Projects/Project';

//contact
import ContactForm from './components/Contact/ContactForm';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/projects/:projectId',
      name: 'Project',
      component: Project
    },
    {
      path: '/contact',
      name: 'ContactForm',
      component: ContactForm
    },
    {
      path: '/admin/signin',
      name: 'AdminSignin',
      component: AdminSignin
    },
    {
      path: '/admin/dashboard',
      name: 'AddProject',
      component: AddProject,
      beforeEnter: ProtectedRoute
    }
  ]
});
