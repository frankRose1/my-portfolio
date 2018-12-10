import Vue from 'vue';
import Router from 'vue-router';
import ProtectedRoute from './ProtectedRoute';

//Admin
import AdminDashboard from './components/Admin/AdminDashboard.vue';
import AddProject from './components/Admin/AddProject.vue';
import DeleteProject from './components/Admin/DeleteProject.vue';
import AdminSignin from './components/Admin/AdminSignin.vue';

//projects
import Portfolio from './components/Projects/Portfolio.vue';
import Project from './components/Projects/Project.vue';

//general
import ContactForm from './components/Contact/ContactForm.vue';
import Skills from './components/Skills.vue'
import Home from './components/Home.vue';

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
      path: '/skills',
      name: 'Skills',
      component: Skills
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },
    {
      path: '/projects/:projectId',
      name: 'Project',
      component: Project,
      props: true
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
      name: 'AdminDashboard',
      component: AdminDashboard,
      beforeEnter: ProtectedRoute
    },
    {
      path: '/admin/add',
      name: 'AddProject',
      component: AddProject,
      beforeEnter: ProtectedRoute
    },
    {
      path: '/admin/delete',
      name: 'DeleteProject',
      component: DeleteProject,
      beforeEnter: ProtectedRoute
    }
  ]
});
