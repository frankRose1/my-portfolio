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
      
      <!-- Search Term -->
      <v-text-field v-model="searchTerm" @input="handleSearchProjects" flex prepend-icon="search" placeholder="Search projects by title or keyword (e.g. Node, React, etc)" hide-details single-line></v-text-field>

      <!-- Search Results -->
      <v-card dark v-if="searchResults.length" id="search__card">
        <v-list>
          <v-list-tile v-for="result in searchResults" :key="result._id" @click="goToSearchResult(result._id)" >
            <v-img :src="result.imageUrl" width="40px"></v-img>
            <v-list-tile-title>
              {{result.title}} -
              <span class="font-weight-thin">{{formatDescription(result.description)}}</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>

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

      <!-- snackbar for after an email is sent -->
      <v-snackbar v-model="emailSnackbar" :timeout="5000" color="success" bottom left>
        <v-icon class="mr-3">check_circle</v-icon>
        <h3>Your message has been sent, thank you for reaching out!</h3>
        <v-btn dark flat @click="emailSnackbar = false">Close</v-btn>
      </v-snackbar>
    </main>

    <!-- footer -->
    <footer>
        <v-container text-xs-center>
            <ul class="social-icons">
                <li><a href="https://twitter.com/devs_fr" target="_blank"><i class="devicon-twitter-plain twitter"></i></a></li>
                <li><a href="https://github.com/frankRose1" target="_blank"><i class="devicon-github-plain github gh-hover"></i></a></li>
                <li><a href="https://stackexchange.com/users/14858932/frank-rose" target="_blank"><i class="fab fa-stack-overflow"></i></a></li>
            </ul>
            <p class="copyright">&copy; Frank Rosendorf {{new Date().getFullYear()}} | All Rights Reserved</p>
        </v-container>
    </footer>

  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  data(){
    return {
      sideNav: false,
      emailSnackbar: false,
      searchTerm: ''
    }
  },
  watch: {
    emailSent(newValue, oldValue){
      //if someone sends an email, show a success pop up
      if (oldValue === null){
        this.emailSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(['admin', 'searchResults', 'emailSent']),
    horizontalNavItems() {
      let items = [
        {icon: 'code', title: 'Skills', link: '/Skills'},
        {icon: 'brush', title: 'Portfolio', link: '/portfolio'},
        {icon: 'chat', title: 'Contact', link: '/contact'},
      ]
      if(this.admin) {
        items.push({icon: 'expand', title: 'Dashboard', link: '/admin/dashboard'});
      }
      return items;
    },
    sideNavItems() {
      let items = [
        {icon: 'code', title: 'Skills', link: '/Skills'},
        {icon: 'brush', title: 'Portfolio', link: '/portfolio'},
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
    },
    handleSearchProjects(){
      this.$store.dispatch('searchProjects', {
        searchTerm: this.searchTerm
      });
    },
    formatDescription(desc){
      return desc.length > 25 ? `${desc.slice(0, 25)}...` : desc;
    },
    goToSearchResult(resultId){
      //clear search term to remove the cards
      this.searchTerm = '';
      this.$router.push(`/projects/${resultId}`);
      this.$store.commit('clearSearchResults');
    }
  }
}
</script>

<style>

  main {
    padding: 100px 0;
  }

  .main-title:after {
    content: "";
    width: 150px;
    margin: 10px auto 15px auto;
    display: block;
    background: rgba(0, 0, 0, 0.4);
    height: 2px;
  }

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

  #search__card {
    position: absolute;
    width: 100vw;
    z-index: 10;
    top: 100%;
    left: 0%;
  }

  footer {
    background-color: #222;
    color: white;
    padding: 30px;
  }

  footer .social-icons {
    list-style: none;
    display: flex;
    width: 100%;
    max-width: 280px;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
  }

  footer .social-icons a {
    text-decoration: none;
    color: white;
  }

  .social-icons li i {
    font-size: 35px;
    transition: color 0.3s ease-in;
  }

  .gh-hover:hover {
    color: #c9510c;
  }
  .twitter:hover {
    color: #1da1f2;
  }
  .fa-stack-overflow:hover {
    color: coral;
  }
</style>
