import { gql } from 'apollo-boost';

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
