<template>
  <v-container text-xs-center mt-5 pd-5>

    <!-- Page Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Admin Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-container>
            <v-form @submit.prevent="handleSigninAdmin">

              <!-- email -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="email" prepend-icon="face" label="Email" type="email" required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- email -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="password" prepend-icon="extenstion" label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- signin button -->
              <v-layout row>
                <v-flex xs12>
                  <v-btn color="primary" type="submit">Sign In</v-btn>
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
export default {
  name: "AdminSignin",
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSigninAdmin(){
      this.$store.dispatch('signinAdmin', {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>