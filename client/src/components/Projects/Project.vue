<template>
  <v-container v-if="fetchProjectById" class="mt-3" flexbox center>

    <!-- Project card -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{fetchProjectById.title}}</h1>
            <v-spacer></v-spacer>
            <v-icon @click="goToPrevPage" color="info" large>arrow_back</v-icon>
          </v-card-title>

          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-img @click="toggleImageDialog" slot="activator" :src="fetchProjectById.imageUrl" id="project__image"></v-img>
          </v-tooltip>

          <!-- enlarged image -->
          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="fetchProjectById.imageUrl" height="70vh"></v-img>
            </v-card>
          </v-dialog>

          <v-card-text>
            <span v-for="(tag, index) in fetchProjectById.tags" :key="index">
              <v-chip class="mb-3" color="primary" text-color="white">{{tag}}</v-chip>
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

<style>
#project__image{
  height: 400px !important;
}
</style>
