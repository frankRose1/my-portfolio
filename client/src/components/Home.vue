<template>

  <v-container text-xs-center>
    <!-- Loading -->
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
    <!-- Carousel -->
    <v-flex xs12>
      <v-carousel v-if="!loading && projects.length" v-bind="{'cycle': true}" interval="3000">
        <v-carousel-item v-for="project in projects" :key="project._id" :src="project.imageUrl" @click.native="goToProject(project._id)">
          <h1 id="carousel__title">{{project.title}}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  created(){
    this.handleFetchProjects();
  },
  computed: {
    ...mapGetters(['loading', 'projects'])
  },
  methods: {
    handleFetchProjects(){
      this.$store.dispatch('fetchProjects');
    },
    goToProject(projectId){
      this.$router.push(`/projects/${projectId}`);
    }
  }
}
</script>


<style>
#carousel__title {
  position: absolute;
  background: rgba ();
  color: white;
  border: 5px 5px 0 0;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0.5em;
}
</style>
