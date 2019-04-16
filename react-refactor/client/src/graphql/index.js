import { gql } from 'apollo-boost';

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
    $email: String!
    $name: String!
    $subject: String!
    $comments: String!
    $phone: String
  ) {
    sendEmail(
      email: $email
      name: $name
      subject: $subject
      comments: $comments
      phone: $phone
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
