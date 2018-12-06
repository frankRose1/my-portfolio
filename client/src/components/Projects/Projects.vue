<template>
  <v-container fluid grid-list-xl>

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
                    place holder content
                  </v-list-tile-title>
                  <v-list-tile-subtitle class="font-weight-thin">
                    Added {{project.dateAdded}}
                  </v-list-tile-subtitle>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn ripple icon>
                    <v-icon color="grey lighten-1">info</v-icon>
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
</template>

<script>
import { INFINITE_SCROLL_PROJECTS } from '../../queries';
const pageSize = 2;
export default {
  name: 'Projects',
  data(){
    return {
      showMoreEnabled: true,
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
  methods: {
    goToProject(projectId){
      this.$router.push(`/projects/${projectId}`);
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
          this.showMoreEnabled = hasMore;

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
