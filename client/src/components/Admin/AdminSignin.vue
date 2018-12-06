<template>
  <v-container text-xs-center mt-5 pd-5>

    <!-- Page Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Error alert -->
    <v-layout v-if="formError" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="formError.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Admin Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-container>
            <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSigninAdmin">

              <!-- email -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field :rules="emailRules" v-model="email" prepend-icon="face" label="Email" type="email" required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- email -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- signin button -->
              <v-layout row>
                <v-flex xs12>
                  <v-btn :loading="loading" :disabled="!isFormValid" color="primary" type="submit">
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Sign In
                  </v-btn>
                </v-flex>
              </v-layout>

            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- end form -->
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "AdminSignin",
  data(){
    return {
      isFormValid: true,
      email: '',
      password: '',
      emailRules: [
        email => !!email || 'Email is required',
        email => /.@+./.test(email) || 'Email must be valid'
      ],
      passwordRules: [
        password => !!password || 'Password is required',
        password => password.length >= 8 || 'Password must be at least 8 characters'
      ]
    }
  },
  computed: {
    ...mapGetters(["admin", "formError", "loading"])
  },
  //watch the "admin" property in state, when it changes from null, redirect to home page
  watch: {
    admin(value){
      if (value) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    handleSigninAdmin(){
      if (this.$refs.form.validate()){
        this.$store.dispatch('signinAdmin', {
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>