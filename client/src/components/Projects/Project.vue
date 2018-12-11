<template>
  <v-container  flexbox center>
    <!-- Project card -->
    <v-layout v-if="fetchProjectById" id="page__layout" row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h1>{{fetchProjectById.title}}</h1>
              <a v-if="fetchProjectById.githubLink" :href="fetchProjectById.githubLink" target="_blank" class="code__button">
                <span><i class="devicon-github-plain github"></i></span>
                View Code
              </a>
              <a v-if="fetchProjectById.demoLink" :href="fetchProjectById.demoLink" target="_blank" class="code__button">
                <span><i class="fas fa-desktop"></i></span>
                Live Demo
              </a>
            <v-spacer></v-spacer>
            <v-icon @click="goToPrevPage" color="info" large>arrow_back</v-icon>
          </v-card-title>

          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-img @click="toggleImageDialog" slot="activator" style="cursor: pointer" :src="fetchProjectById.imageUrl" id="project__image"></v-img>
          </v-tooltip>

          <!-- enlarged image -->
          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="fetchProjectById.imageUrl" height="70vh"></v-img>
            </v-card>
          </v-dialog>

          <v-card-text>
            <span v-for="(tag, index) in fetchProjectById.tags" :key="index">
              <v-chip class="mb-3" color="info" text-color="white">{{tag}}</v-chip>
            </span>
            <h3>{{fetchProjectById.description}}</h3>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import { FETCH_PROJECT_BY_ID } from "../../queries";

export default {
  name: "Project",
  props: ["projectId"],
  data(){
    return {
      dialog: false
    }
  },
  apollo: {
    fetchProjectById: {
      query: FETCH_PROJECT_BY_ID,
      variables() {
        return {
          projectId: this.projectId
        };
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
