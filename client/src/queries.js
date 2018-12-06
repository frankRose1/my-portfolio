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

export const INFINITE_SCROLL_PROJECTS = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollProjects(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      posts {
        _id
        imageUrl
        description
        title
        dateAdded
        githubLink
        demoLink
        tags
      }
    }
  }
`;

//contact mutations

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

//admin mutaions
export const SIGNIN_ADMIN = gql`
  mutation($email: String!, $password: String!) {
    signinAdmin(email: $email, password: $password) {
      token
    }
  }
`;
