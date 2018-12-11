<template>
  <v-container id="page__layout" text-xs-center>
    <!-- Page Title -->
    <v-layout mb-3 row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="main__title">Here's What I Know</h2>
      </v-flex>
    </v-layout>
    <!-- Skills Display -->
    <div class="skills-col">
      <ul class="skill-icons">
          <li v-for="item in skillIcons" :key="item.text" :class="item.liClass">
            <i :class="item.icon"></i>
            <p>{{item.text}}</p>
          </li>
      </ul>
      <div class="skill-cards">
          <article class="skill-card skill-card-red">
              <i class="fas fa-code"></i>
              <h3>Full Stack JavaScript</h3>
              <p>The projects I've built with JavaScript have really shown me how awesome of a language it is! 
                After building command line apps, to backend APIs, and working with front-end libraries like React, 
                my passion for becoming a better JavaScript developer grows with each project I build.</p>
          </article>
          <article class="skill-card skill-card-blue">
              <i class="fas fa-graduation-cap"></i>
              <h3>Continued Learning</h3>
              <p>I'm committed to learning everything I can about the wonderful world of web development! I'm working on new projects all the time to challenge myself and become a better developer.
                Currently, I'm enjoying building client and server side application with GraphQL.
              </p>
          </article>
          <article class="skill-card skill-card-orange">
              <i class="fas fa-desktop"></i>
              <h3>Web Development</h3>
              <p>Building web apps is what I love to do. From working with databases on the backend to 
                building a responsive frontend, I enjoy all of it! My goal on every project is to put 
                my best foot forward and give the end user a great final product. 
                Check out my <a href="https://github.com/frankRose1" target="_blank" class="inline-gh">github</a> to see what I'm working on next.</p>
          </article>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Skills',
  computed: {
    skillIcons(){
      return [
        {icon: 'devicon-html5-plain colored' , text: 'HTML5' , liClass: 'html'},
        {icon: 'devicon-css3-plain colored' , text: 'CSS3' , liClass: 'css'},
        {icon: 'devicon-javascript-plain colored' , text: 'JavaScript' , liClass: 'js'},
        {icon: 'devicon-jquery-plain colored' , text: 'jQuery' , liClass: 'jquery'},
        {icon: 'devicon-git-plain colored' , text: 'git' , liClass: 'git'},
        {icon: 'devicon-gulp-plain colored' , text: 'Gulp' , liClass: 'gulp'},
        {icon: 'devicon-sequelize-plain colored' , text: 'Sequelize' , liClass: 'sequelize'},
        {icon: 'devicon-nodejs-plain colored' , text: 'Node.js' , liClass: 'node'},
        {icon: 'devicon-express-original colored' , text: 'Express' , liClass: 'express'},
        {icon: 'devicon-mongodb-plain colored' , text: 'MongoDB' , liClass: 'mongo'},
        {icon: 'devicon-react-original colored' , text: 'React' , liClass: 'react'},
        {icon: 'devicon-vuejs-plain colored' , text: 'Vue' , liClass: 'vue'},
      ]
    }
  }
}
</script>

<style scoped>

/* SKILLS SECTION START */
.skills-col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #222;
}

.skill-icons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  list-style: none;
}

.skill-icons li {
  flex-basis: 50%;
  margin-bottom: 20px;
  text-align: center;
}

.skill-icons i {
  font-size: 60px;
  cursor: pointer;
}

.skill-icons li p {
  border-radius: 12px 6px;
  background-color: rgba(0, 0, 0, 0.68);
  max-width: 75px;
  padding: 5px 8px;
  color: #fff;
  opacity: 0;
  transition: 0.5s;
  margin: 0 auto;
}

.skill-icons li:hover p {
  opacity: 1;
}

.skill-cards {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 50px;
}

.skill-card {
  border-radius: 5px;
  text-align: center;
  width: 100%;
  background-color: white;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.9);
}

.skill-card i {
  font-size: 35px;
  margin-bottom: 15px;
}
.skill-card h3 {
  font-size: 1.5rem;
}

.skill-card h3::after {
  content: '';
  background-color: #222;
  display: block;
  margin: 15px auto;
  width: 120px;
  height: 1px;
}

.skill-card p {
  font-size: 18px;
  line-height: 23px;
}

.skill-card-red {
  border-top: 10px solid #F25F5C;
}

.skill-card-red i {
  color: #F25F5C;
}

.skill-card-blue {
  border-top: 10px solid #357edd;
}

.skill-card-blue i {
  color: #357edd;
}

.skill-card-orange {
  border-top: 10px solid #f09233;
}

.skill-card-orange i {
  color: #f09233;
}

.inline-gh {
  text-decoration: none;
  color: #c9510c;
  font-size: 20px;
  border-bottom: 1px solid transparent;
  transition: color 0.3s ease-in, border-bottom 0.3s ease-in;
  font-weight: 700;
}

.inline-gh:hover {
  color: #ac4103;
  border-bottom: 1px solid #ac4103;
}

@media(min-width: 768px){
    .skill-cards {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .skill-card {
    width: 31%;
  }

  .skill-highlight {
    background-color: rgba(0, 0, 0, 0.55);
    color: #fff;
    transition: all 0.2s ease-out;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 20px;
    display: block;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .skill-icons {
    display: block;
    position: relative;
    margin: 0 auto;
    max-width: 650px;
    height: 50vh;
  }

  .skill-icons li {
    position: absolute;
    margin-bottom: 0;
  }

  li.html {
    top: 20px;
    left: 10px;
  }

  li.css {
    bottom: 20px;
    left: 10px;
  }

  li.js {
    top: 150px;
    left: 55px;
  }
  li.gulp {
    top: 150px;
    right: 55px;
  }

  li.jquery {
    bottom: 10px;
    left: 25%;
  }
  li.mongo {
    bottom: 10px;
    right: 25%;
  }

  li.express {
    top: 20px;
    left: 25%;
  }
  li.sequelize {
    top: 20px;
    right: 25%;
  }

  li.node {
    top: 20px;
    right: 10px;
  }
  li.react {
    bottom: 20px;
    right: 10px;
  }

  li.git {
    top: 150px;
    right: 35%;
  }
  li.vue {
    top: 150px;
    left: 35%;
  }
}

</style>

