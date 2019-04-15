import { gql } from 'apollo-boost';

const SEARCH_PROJECTS_QUERY = gql`
  query searchProjectsQuery($search: String) {
    searchProjects(search: $search) {
      title
      description
      imageUrl
    }
  }
`;

const SEND_EMAIL_MUTATION = gql`
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

export { SEND_EMAIL_MUTATION, SEARCH_PROJECTS_QUERY };
