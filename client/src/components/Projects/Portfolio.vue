<template>

  <v-container id="page__layout">
      <v-container fluid grid-list-xl>

      <!-- Page Title -->
      <v-layout text-xs-center row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <h2 class="main__title">My Portfolio</h2>
        </v-flex>
      </v-layout>

      <!-- Project Card -->
      <v-layout row wrap v-if="infiniteScrollProjects">
        <v-flex xs12 sm6 v-for="project in infiniteScrollProjects.projects" :key="project._id">
          <v-card hover>

            <v-img @click.native="goToProject(project._id)" :src="project.imageUrl" lazy height="30vh"></v-img>

            <v-card-actions>
              <v-card-title primary>
                <div>
                  <div class="headline">{{project.title}}</div>
                </div>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="showProjectDetails = !showProjectDetails">
                <v-icon>{{`keyboard_arrow_${showProjectDetails ? 'up' : 'down'}`}}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="showProjectDetails" color="grey lighten-4">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="text--primary">
                      {{formatDescription(project.description)}}
                    </v-list-tile-title>
                    <v-list-tile-subtitle class="font-weight-thin">
                      Added {{formatDateAdded(project.dateAdded)}}
                    </v-list-tile-subtitle>
                  </v-list-tile-content>

                  <v-list-tile-action >
                    <v-btn @click="goToProject(project._id)" ripple icon>
                      <v-icon title="See More Info" color="grey lighten-1">info</v-icon>
                    </v-btn>
                  </v-list-tile-action>

                </v-list-tile>
              </v-card-text>
            </v-slide-y-transition>

          </v-card>
        </v-flex>
      </v-layout>

      <!-- fetch more button -->
      <v-layout column v-if="showMoreEnabled">
        <v-flex xs12>
          <v-layout justify-center row>
            <v-btn color="info" @click="showMore">Show More</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>

    </v-container>
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_PROJECTS } from '../../queries';
import moment from 'moment';

const pageSize = 4;

export default {
  name: 'Projects',
  data(){
    return {
      pageNum: 1,
      showProjectDetails: false
    }
  },
  apollo: {
    infiniteScrollProjects: {
      query: INFINITE_SCROLL_PROJECTS,
      variables: {
        pageSize,
        pageNum: 1
      }
    }
  },
  computed: {
    showMoreEnabled(){
      return this.infiniteScrollProjects && this.infiniteScrollProjects.hasMore;
    }
  },
  methods: {
    goToProject(projectId){
      this.$router.push(`/projects/${projectId}`);
    },
    formatDateAdded(date){
      return moment(new Date(parseInt(date))).fromNow();
    },
    formatDescription(desc){
      return desc.length > 25 ? `${desc.slice(0, 25)}...` : desc;
    },
    showMore(){
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollProjects.fetchMore({
        variables: {
          pageSize,
          pageNum: this.pageNum
        },
        //combine the new results with the old
        updateQuery: (prevResult, {fetchMoreResult}) => {
          const newProjects = fetchMoreResult.infiniteScrollProjects.projects;
          const hasMore = fetchMoreResult.infiniteScrollProjects.hasMore;

          return {
            infiniteScrollProjects: {
              __typename: prevResult.infiniteScrollProjects.__typename,
              hasMore,
              projects: [
                ...prevResult.infiniteScrollProjects.projects,
                ...newProjects
              ]
            }
          };
        }
      });
    },
  }
}
</script>
