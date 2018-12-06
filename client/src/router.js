import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import ProtectedRoute from './ProtectedRoute';

//Admin
import AddProject from './components/Admin/AddProject.vue';
import AdminSignin from './components/Admin/AdminSignin.vue';

//projects
import Projects from './components/Projects/Projects.vue';
import Project from './components/Projects/Project.vue';

//contact
import ContactForm from './components/Contact/ContactForm.vue';

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
      name: 'AddProject',
      component: AddProject,
      beforeEnter: ProtectedRoute
    }
  ]
});
