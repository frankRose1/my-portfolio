<template>

  <div>
    <section id="hero__cover">
      <vue-particles
        color="#F25F5C"
        :particleOpacity="0.8"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#F25F5C"
        :lineLinked="false"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="repulse"
        :clickEffect="true"
        clickMode="push">
      </vue-particles>
      <v-container>
          <div id="hero__content">
            <h1>JavaScript Developer With A Love For Code</h1>
            <h3>Let's Create Something Amazing</h3>
          </div>
      </v-container>
    </section>

    <v-container mt-5 text-xs-center>
      <!-- About -->
      <v-layout mb-3 row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <h2 class="main__title">About Me</h2>
        </v-flex>
      </v-layout>

      <div id="about__row">
        <p class="about__card about__card1">
          Hello world, I'm Frank! I'm a full-stack JavaScript developer looking to apply my knowledge to create awesome applications. In college I actually studied accounting, but I fell in love with coding! Ever since I created my first app I knew web development was a field I 
          wanted to pursue and I only wish I had tried it sooner! It's such a satisfying feeling to invision something you want to build and 
          then make it come to life with code.
        </p>
        <p class="about__card about__card2">
            I'm always challenging myself with new projects to learn and grow as a developer. I love building apps with Node and React,
            but I often try out new technologies. I've taken great interest in building apps with GraphQL, 
            both on the server and client side! I'm looking forward to seeing how this powerful technology impacts the industry.
        </p>
      </div>
    </v-container>

      <section id="carousel__section">
        <v-container text-xs-center>
          <!-- Carousel -->
          <v-layout mb-3 row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <h2 class="main__title">Recent Work</h2>
            </v-flex>
          </v-layout>

          <v-flex xs12>

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

            <v-carousel v-if="!loading && projects.length" v-bind="{'cycle': true}" class="carousel__shadow" interval="3000">
              <v-carousel-item v-for="project in projects" :key="project._id" :src="project.imageUrl" @click.native="goToProject(project._id)">
                <h1 id="carousel__title">{{project.title}}</h1>
              </v-carousel-item>
            </v-carousel>

          </v-flex>
        </v-container>
      </section>

  </div>

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

#carousel__section{
  background: white;
  margin-top: 30px;
  padding-top: 15px;
  padding-bottom: 120px;
}

.carousel__shadow{
  box-shadow: 0 18px 29px 0 rgba(0, 0, 0, 0.5);
}

#carousel__title {
  position: absolute;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: 5px 5px 0 0;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 0.5em;
}

#hero__cover {
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../static/images/hero-cover2.jpg') no-repeat center / cover;
  position: relative;
}


#hero__content{
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

#hero__content h1 {
  font-size: 2.8rem;
  margin-bottom: 15px;
}

#hero__content h3 {
  font-size: 2rem;
  font-weight: 400;
}

#about__row{
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 80%;
  text-align: left;
  margin: 0 auto 50px auto;
}

.about__card {
  padding: 30px 25px;
  font-size: 1.4rem;
  background-color: white;
  border-radius: 5px;
  max-width: 450px;
  margin-bottom: 30px;
  box-shadow: 0 24px 16px 0 rgba(0, 0, 0, 0.4);
}

.about__card1 {
  border-top: 10px solid #357edd;
}

.about__card2 {
  border-top: 10px solid #f09233;
}

@media (min-width: 768px){
  #about__row{
    flex-direction: row;
  }

  .about__card{
    width: 45%;
    margin-bottom: 0;
  }
}

</style>
