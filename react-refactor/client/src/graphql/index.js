import { gql } from 'apollo-boost';

export const INFINITE_SCROLL_PROJECTS_QUERY = gql`
  query infiniteScrollProjectsQuery($pageSize: Int!, $pageNum: Int!) {
    infiniteScrollProjects(pageSize: $pageSize, pageNum: $pageNum) {
      hasMore
      projects {
        _id
        title
        imageUrl
        description
      }
    }
  }
`;

export const SEARCH_PROJECTS_QUERY = gql`
  query searchProjectsQuery($searchTerm: String) {
    searchProjects(searchTerm: $searchTerm) {
      title
      description
      imageUrl
      _id
    }
  }
`;

export const PROJECT_DETAIL_QUERY = gql`
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

export const SEND_EMAIL_MUTATION = gql`
  mutation sendEmailMutation(
    $senderEmail: String!
    $senderName: String!
    $subject: String!
    $comments: String!
    $senderPhone: String
  ) {
    sendEmail(
      senderEmail: $senderEmail
      senderName: $senderName
      subject: $subject
      comments: $comments
      senderPhone: $senderPhone
    ) {
      message
    }
  }
`;

// Local query/mutation for toggling the search
export const LOCAL_STATE_QUERY = gql`
  query {
    searchOpen @client
  }
`;

export const TOGGLE_SEARCH_MUTATION = gql`
  mutation {
    toggleSearch @client
  }
`;
