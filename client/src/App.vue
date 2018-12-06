<template>
  <v-app style="background: #E3E3EE">

    <!-- Side Nav -->
    <v-navigation-drawer app fixed temporary v-model="sideNav">
      <v-toolbar color="secondary" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">FrankRosendorf</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>
      <!-- side nav links -->
      <v-list>
        <v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <!-- signout button -->
        <v-list-tile ripple v-if="admin" @click="handleSignoutAdmin">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <!--Horizontal Nav -->
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          FrankRosendorf
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field flex prepend-icon="search" placeholder="Search projects" hide-details single-line></v-text-field>

      <v-spacer></v-spacer>
      <!-- Horizontal nav items -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <!-- signout btn -->
        <v-btn v-if="admin" flat @click="handleSignoutAdmin">
          <v-icon left class="hidden-sm-only">exit_to_app</v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- App content -->
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
    
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  data(){
    return {
      sideNav: false
    }
  },
  computed: {
    ...mapGetters(['admin']),
    horizontalNavItems() {
      let items = [
        {icon: 'account_box', title: 'About', link: '/about'},
        {icon: 'create', title: 'Projects', link: '/projects'},
        {icon: 'chat', title: 'Contact', link: '/contact'},
      ]
      if(this.admin) {
        items.push({icon: 'expand', title: 'Dashboard', link: '/admin/dashboard'});
      }
      return items;
    },
    sideNavItems() {
      let items = [
        {icon: 'account_box', title: 'About', link: '/about'},
        {icon: 'create', title: 'Projects', link: '/projects'},
        {icon: 'chat', title: 'Contact', link: '/contact'},
      ];
      if (this.admin) {
        items.push({icon: 'expand', title: 'Dashboard', link: '/admin/dashboard'});
      }
      return items;
    },
  },
  methods: {
    toggleSideNav(){
      this.sideNav = !this.sideNav;
    },
    handleSignoutAdmin(){
      this.$store.dispatch('signoutAdmin');
    }
  }
}
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: all;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(-25px);
  }
</style>
