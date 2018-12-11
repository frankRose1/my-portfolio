<template>
  <v-container id="page__layout" text-xs-center >
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>

        <!-- Form Title -->
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <h1 class="primary--text main__title">Manage Projects</h1>
          </v-flex>
        </v-layout>

        <v-btn color="success" to="/admin/add">
          Add
        </v-btn>
        <v-btn color="error" to="/admin/delete">
          Delete
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'AdminDashboard'
}
</script>