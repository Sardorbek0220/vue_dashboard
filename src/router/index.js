import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '../pages/Dashboard.vue';
import Social from '../pages/Social.vue';
import Media from '../pages/Media.vue';
import Snackbar from '../pages/Snackbar.vue';
import Chart from '../pages/Chart.vue';
import Mailbox from '../pages/Mailbox.vue';
import Domain from '../pages/Domain.vue';
import Login from '../pages/core/Login.vue';
import Error from '../pages/core/Error.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: [
          { name: 'dashboard' }
        ]
      }
    },
    {
      path: '/mailbox',
      name: 'Mailbox',
      component: Mailbox,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'mailbox' }
        ]
      }
    },
    {
      path: '/snackbar',
      name: 'Snackbar',
      component: Snackbar,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'snackbar' }
        ]
      }
    },
    {
      path: '/domain',
      name: 'Domain',
      component: Domain,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'Domain' }
        ]
      }
    },
    {
      path: '/social',
      name: 'Social',
      component: Social,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'social' }
        ]
      }
    },
    {
      path: '/media',
      name: 'Media',
      component: Media,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'media' }
        ]
      }
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart,
      meta: {
        breadcrumb: [
          { name: 'dashboard', href: 'Dashboard' },
          { name: 'charts' }
        ]
      }
    },
    {
      path: '/',
      redirect: to => {
        if (localStorage.getItem("manager_user")) {
          return { path: '/dashboard' }
        }else{
          return { path: '/login' }
        }
        
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
  ]
});
