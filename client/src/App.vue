<template>
  <v-app style="background: #F6F9FC">

    <!-- Side Nav -->
    <v-navigation-drawer app fixed temporary v-model="sideNav">
      <v-toolbar color="secondary" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">{F/R}</h1>
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
      
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          {F/R}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      
      <!-- Search Term -->
      <v-text-field v-model="searchTerm" 
          @input="handleSearchProjects" 
          flex prepend-icon="search" 
          placeholder="Search projects by title or keyword (e.g. Node, React, GraphQL, etc)" 
          hide-details single-line></v-text-field>

      <!-- Search Results -->
      <v-card dark v-if="searchResults.length" id="search__card">
        <v-list>
          <v-list-tile v-for="result in searchResults" :key="result._id" @click="goToSearchResult(result._id)" >
            <v-list-tile-title>
              {{result.title}} -
              <span class="font-weight-thin">{{formatDescription(result.description)}}</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-card>

      <v-spacer></v-spacer>
  <!-- Horizontal nav items / toggle side nav -->
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="toggleSideNav"></v-toolbar-side-icon>
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
      <transition name="fade">
        <router-view />
      </transition>

      <!-- snackbar for after an email is sent -->
      <v-snackbar v-model="emailSnackbar" :timeout="5000" color="success" bottom left>
        <v-icon class="mr-3">check_circle</v-icon>
        <h3>Your message has been sent, thank you for reaching out!</h3>
        <v-btn dark flat @click="emailSnackbar = false">Close</v-btn>
      </v-snackbar>
    </main>

    <!-- footer -->
    <footer>
      <div class='links'>
        <div class='iconCard'>
            <a
              href='https://www.freecodecamp.org/forum/u/frankRose1/activity'
              target='_blank'
              rel='noopener noreferrer'>
              <i class='fab fa-free-code-camp'></i>
            </a>
        </div>
        <div class='iconCard'>
            <a href='https://github.com/frankRose1' target='_blank' rel='noopener noreferrer'>
              <i class='devicon-github-plain'></i>
            </a>
        </div>
          <div class='iconCard'>
              <a 
                href='https://stackexchange.com/users/14858932/frank-rose'
                target='_blank'
                rel='noopener noreferrer'>
                <i class='fab fa-stack-overflow'></i>
              </a>
          </div>
          <div class='iconCard'>
              <router-link to="/contact" class='link' style="cursor: pointer">
                <i class='fas fa-envelope'></i>
              </router-link>
          </div>
      </div>
      <p class='copyRight'>
        &copy; Frank Rosendorf {{new Date().getFullYear()}} | All Rights Reserved
      </p>
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
        {icon: 'code', title: 'Skills', link: '/skills'},
        {icon: 'folder', title: 'Portfolio', link: '/portfolio'},
        {icon: 'mail', title: 'Contact', link: '/contact'},
      ]
      if(this.admin) {
        items.push({icon: 'expand', title: 'Dashboard', link: '/admin/dashboard'});
      }
      return items;
    },
    sideNavItems() {
      let items = [
        {icon: 'code', title: 'Skills', link: '/skills'},
        {icon: 'folder', title: 'Portfolio', link: '/portfolio'},
        {icon: 'mail', title: 'Contact', link: '/contact'},
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
      return desc.length > 50 ? `${desc.slice(0, 50)}...` : desc;
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

  #page__layout {
    margin-top: 120px;
    margin-bottom: 120px;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 400;
  }

  .main__title{
    font-size: 2.5rem;
    font-weight: 400;
  }

  main {
    min-height: 70vh;
  }

  .main__title:after {
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

  .links {
    display: grid;
    grid-template-columns: 1fr;
  }

  .iconCard {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 200%;
    background-image: linear-gradient(to bottom, #b0bec5 50%, #3eCF8E 50%);
    border-bottom: 1px solid #f3f6f7;
    height: 80px;
    transition: background-position 0.3s ease-in;
  }


  .iconCard:hover {
      background-position: 0 100%;
    }

  .iconCard a {
    cursor: pointer;
    text-decoration: none;
    color: #f3f6f7;
  }

  .iconCard i {
    font-size: 60px;
  }

  .copyRight {
    background-color: #6B7C93;
    text-align: center;
    color: #f3f6f7;
    margin: 0;
    padding: 10px 0px;
  }
  @media (min-width: 500px){
    .links {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .iconCard {
      height: 200px;
      border-right: 1px solid #f3f6f7;
      border-bottom: 0;
    }
  }
</style>
