<template>
  <v-container mt-5 pd-5 text-xs-center >

    <!-- Form Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Add a Project</h1>
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
        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handlePostProject">

          <!-- title -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="titleRules" v-model="title" label="Title" type="text" required></v-text-field>
            </v-flex>
          </v-layout>

          <!-- imageUrl -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field :rules="imageRules" v-model="imageUrl" label="Image URL" type="text" required></v-text-field>
            </v-flex>
          </v-layout>

          <!-- image preview -->
          <v-layout row>
            <v-flex xs12><img :src="imageUrl" height="300px"></v-flex>
          </v-layout>

          <!-- github -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field v-model="githubLink" label="Github Link" type="text"></v-text-field>
            </v-flex>
          </v-layout>

          <!-- demo -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field v-model="demoLink" label="Demo Link" type="text"></v-text-field>
            </v-flex>
          </v-layout>

          <!-- tags -->
          <v-layout row>
            <v-flex xs12>
              <v-select v-model="tags" :rules="tagsRules" multiple label="Tags" :items="selectItems">

              </v-select>
            </v-flex>
          </v-layout>

          <!-- desc -->
          <v-layout row>
            <v-flex xs12>
              <v-textarea v-model="description" :rules="descRules" label="Description" type="text" required>

              </v-textarea>
            </v-flex>
          </v-layout>

          <!-- signin button -->
          <v-layout row>
            <v-flex xs12>
              <v-btn :loading="loading" :disabled="loading || !isFormValid" color="info" type="submit">
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                Add Project
              </v-btn>
            </v-flex>
          </v-layout>

        </v-form>
      </v-flex>
    </v-layout>
    <!-- end add project form -->
  </v-container>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'AddProject',
  data(){
    return {
      isFormValid: true,
      title: '',
      description: '',
      imageUrl: '',
      githubLink: '',
      demoLink: '',
      tags: [],
      titleRules: [
        title => !!title || 'Title is required'
      ],
      descRules: [
        desc => !!desc || 'Description is required'
      ],
      imageRules: [
        image => !!image || 'ImageUrl is required'
      ],
      tagsRules: [
        tags => tags.length >= 1  || 'Include at least one tag'
      ],      
      selectItems: [
        'HTML', 'CSS', 'JavaScript', 'React', 'Node', 'Redux', 
        'GraphQL', 'Apollo', 'Vue', 'MongoDB', 'SQL', 'Sequelize', 
        'Gulp', 'React Router', 'Next.js', 'Webpack', 'Python', 'Git',
        'Gatsby', 'MySQL', 'Angular', 'jQuery', 'Object Oriented Programming',
        'Functional Programming', 'Express', 'Prisma', 'GraphQL-Yoga', 'Django', 
        'Flask'
      ]
    }
  },
  computed: {
    ...mapGetters(['formError', 'loading'])
  },
  methods: {
    handlePostProject(){
      if(this.$refs.form.validate()){
        this.$store.dispatch('postProject', {
          title: this.title,
          description: this.description,
          tags: this.tags,
          demoLink: this.demoLink,
          githubLink: this.githubLink,
          imageUrl: this.imageUrl
        });
      }
    }
  }
}
</script>