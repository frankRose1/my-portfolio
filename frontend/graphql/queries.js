import { gql } from 'apollo-boost';

//project queries
export const FETCH_PROJECTS = gql`
  query {
    fetchProjects {
      _id
      imageUrl
      title
    }
  }
`;

export const FETCH_PROJECT_BY_ID = gql`
  query($projectId: ID!) {
    fetchProjectById(projectId: $projectId) {
      _id
      imageUrl
      description
      tags
      title
      dateAdded
      githubLink
      demoLink
    }
  }
`;

export const INFINITE_SCROLL_PROJECTS = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollProjects(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      projects {
        _id
        imageUrl
        description
        title
        dateAdded
      }
    }
  }
`;

export const SEARCH_PROJECTS = gql`
  query($searchTerm: String) {
    searchProjects(searchTerm: $searchTerm) {
      _id
      title
      imageUrl
      description
    }
  }
`;

//admin queries
export const GET_CURRENT_ADMIN = gql`
  query {
    getCurrentAdmin {
      _id
      name
      email
    }
  }
`;
