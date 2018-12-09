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
        title
        dateAdded
        githubLink
        demoLink
        tags
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

//contact mutations
export const SEND_EMAIL = gql`
  mutation(
    $senderEmail: String!
    $senderName: String
    $subject: String!
    $senderPhone: String
    $comments: String!
  ) {
    sendEmail(
      senderEmail: $senderEmail
      senderName: $senderName
      subject: $subject
      senderPhone: $senderPhone
      comments: $comments
    ) {
      message
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

//admin mutaions
export const SIGNIN_ADMIN = gql`
  mutation($email: String!, $password: String!) {
    signinAdmin(email: $email, password: $password) {
      token
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      message
    }
  }
`;

export const POST_PROJECT = gql`
  mutation(
    $title: String!
    $description: String!
    $imageUrl: String!
    $tags: [String!]!
    $githubLink: String
    $demoLink: String!
  ) {
    postProject(
      title: $title
      description: $description
      tags: $tags
      imageUrl: $imageUrl
      githubLink: $githubLink
      demoLink: $demoLink
    ) {
      _id
      title
      imageUrl
    }
  }
`;
