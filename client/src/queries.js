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

//contact mutations

//admin queries

//admin mutaions
export const SIGNIN_ADMIN = gql`
  mutation($email: String!, $password: String!) {
    signinAdmin(email: $email, password: $password) {
      token
    }
  }
`;
