<template>
  <v-container id="page__layout" flexbox center>
    
        <v-layout row wrap>
          <v-flex xs12>
            <loading-animation v-if="loading"></loading-animation>
            <!-- <h3 v-else-if="error">Shoot, looks like we got an error: {{error.message}}</h3> -->
            <!-- Project card -->
            <v-card v-if="project">
              <v-card-title>
                <h1>{{project.title}}</h1>
                  <a v-if="project.githubLink" :href="project.githubLink" target="_blank" class="code__button">
                    <span><i class="devicon-github-plain github"></i></span>
                    View Code
                  </a>
                  <a v-if="project.demoLink" :href="project.demoLink" target="_blank" class="code__button">
                    <span><i class="fas fa-desktop"></i></span>
                    Live Demo
                  </a>
                <v-spacer></v-spacer>
                <v-icon @click="goToPrevPage" color="info" large>arrow_back</v-icon>
              </v-card-title>

              <v-tooltip right>
                <span>Click to enlarge image</span>
                <v-img @click="toggleImageDialog" slot="activator" style="cursor: pointer" :src="project.imageUrl" id="project__image"></v-img>
              </v-tooltip>

              <!-- enlarged image -->
              <v-dialog v-model="dialog">
                <v-card>
                  <v-img :src="project.imageUrl" height="70vh"></v-img>
                </v-card>
              </v-dialog>

              <v-card-text>
                <span v-for="(tag, index) in project.tags" :key="index">
                  <v-chip class="mb-3" color="info" text-color="white">{{tag}}</v-chip>
                </span>
                <h3>{{project.description}}</h3>
              </v-card-text>

            </v-card>
          </v-flex>
        </v-layout>

  </v-container>
</template>

<script>
import { FETCH_PROJECT_BY_ID } from "../../queries";
import {mapGetters} from 'vuex'

export default {
  name: "Project",
  props: ["projectId"],
  data(){
    return {
      dialog: false,
      fetchProjectByIdQuery: FETCH_PROJECT_BY_ID
    }
  },
  computed: {
    ...mapGetters(['project', 'loading'])
  },
  created(){
    this.fetchProject(this.projectId)
  },
  watch: {
    projectId(newValue, oldValue){
      if (newValue !== oldValue) {
        this.fetchProject(newValue)
      }
    }
  },
  methods: {
    goToPrevPage(){
      this.$router.go(-1);
    },
    toggleImageDialog(){
      if(window.innerWidth > 500){
        this.dialog = !this.dialog;
      }
    },
    fetchProject(id){
      this.$store.dispatch('fetchProjectById', {
        projectId: id
      })
    }
  }
};
</script>

<style scoped>
#project__image{
  height: 400px !important;
}

.code__button{
  text-decoration: none;
  padding: 10px 20px;
  text-align: center;
  background: #ddd;
  color: #222;
  border-radius: 5px;
  margin-left: 15px;
  transition: background-color 0.4s ease-in, color 0.4s ease-in;
}

.code__button i {
  font-size: 18px;
}

.code__button:hover{
  background: #357edd;
  color: white;
}

.code__button span {
  margin-right: 5px;
}


</style>
