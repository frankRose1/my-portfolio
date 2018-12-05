<template>
  <v-app>

    <!--Horizontal Nav -->
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
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
      </v-toolbar-items>
    </v-toolbar>

    <!-- App content -->
    <main>
      <v-container class="mt-4">
        <router-view />
      </v-container>
    </main>
    
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    horizontalNavItems() {
      return [
        {icon: 'lock_open', title: 'About', link: '/about'},
        {icon: 'create', title: 'Portfolio', link: '/portfolio'},
        {icon: 'chat', title: 'Contact', link: '/contact'},
      ]
    }
  }
}
</script>

