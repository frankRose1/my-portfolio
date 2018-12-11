<template>
  <v-container id="page__layout" text-xs-center>

    <!-- Page Title -->
    <v-layout mb-3 row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="main__title">Want to chat? Send an email!</h2>
      </v-flex>
    </v-layout>

    <!-- Error alert -->
    <v-layout v-if="formError" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="formError.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Contact Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="white">
          <v-container>
            <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSendEmail">

              <!-- sender email -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field :rules="emailRules" v-model="senderEmail" prepend-icon="email" label="Company or personal email*" type="email" required></v-text-field>
                </v-flex>
              </v-layout>

              <!-- sender name -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="senderName" prepend-icon="face" label="Name" type="text"></v-text-field>
                </v-flex>
              </v-layout>

              <!-- sender phone -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="senderPhone" prepend-icon="settings_phone" label="Phone number" type="text"></v-text-field>
                </v-flex>
              </v-layout>

              <!-- subject -->
              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="subject" :rules="subjectRules" prepend-icon="subject" label="Subject*" type="text" required></v-text-field>
                </v-flex>
              </v-layout>
            
            <!-- additional comments -->
            <v-layout row>
              <v-flex xs12>
                <v-textarea v-model="comments" :rules="commentsRules" label="Additional comments*" type="text" required>

                </v-textarea>
              </v-flex>
            </v-layout>

              <!-- submit button -->
              <v-layout row>
                <v-flex xs12>
                  <v-btn :loading="loading" :disabled="!isFormValid" color="accent" type="submit">
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Send Email
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
  name: "ContactForm",
  data(){
    return {
      isFormValid: true,
      senderEmail: '',
      senderPhone: '',
      senderName: '',
      subject: '',
      comments: '',
      emailRules: [
        email => !!email || 'Email is required',
        email => /.@+./.test(email) || 'Email must be valid'
      ],
      subjectRules: [
        subj => !!subj || 'Please provide a subject for your message',
        subj => subj.length < 150 || 'Please keep the subject line less than 150 characters'
      ],
      commentsRules: [
        comments => !!comments || 'Please provide some comments/additional info regarding your message',
        comments => comments.length < 1000 || 'Additional comments must be less than 1000 characters'
      ]
    }
  },
  computed: {
    ...mapGetters(["formError", "loading"])
  },
  methods: {
    handleSendEmail(){
      if (this.$refs.form.validate()){
        this.$store.dispatch('sendEmail', {
          senderEmail: this.senderEmail,
          senderPhone: this.senderPhone,
          senderName: this.senderName,
          subject: this.subject,
          comments: this.comments
        });
      }
    }
  }
};
</script>