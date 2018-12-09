<template>
  <v-container mt-5 pd-5 text-xs-center >

    <!-- Form Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="error--text">Delete a Project</h1>
      </v-flex>
    </v-layout>

    <!-- Error alert -->
    <v-layout v-if="formError" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="formError.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Add Project Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleDeleteProject">

          <!-- project ID -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="projectIdRules" v-model="projectId" label="Project ID" type="text" required></v-text-field>
            </v-flex>
          </v-layout>

          <!-- submit button -->
          <v-layout row>
            <v-flex xs12>
              <v-btn :loading="loading" :disabled="loading || !isFormValid" color="error" type="submit">
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                Delete Project
              </v-btn>
            </v-flex>
          </v-layout>

        </v-form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'DeleteProject',
  data(){
    return {
      isFormValid: true,
      projectId: '',
      projectIdRules: [
        projectId => !!projectId || 'Project ID is required'
      ]
    }
  },
  computed: {
    ...mapGetters(['formError', 'loading'])
  },
  methods: {
    handleDeleteProject(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('deleteProject', {
          projectId: this.projectId
        });
      }
    }
  }
}
</script>