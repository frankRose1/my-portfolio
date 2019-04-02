const { gql } = require('apollo-server');

module.exports = gql`
  type Admin {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Project {
    _id: ID!
    title: String!
    dateAdded: String!
    githubLink: String
    demoLink: String
    imageUrl: String
    description: String!
    tags: [String]!
  }

  type ProjectsPage {
    projects: [Project]
    hasMore: Boolean!
  }

  type Token {
    token: String!
  }

  type Message {
    message: String!
  }

  type Mutation {
    signinAdmin(email: String!, password: String!): Token
    sendEmail(
      senderEmail: String!
      senderName: String
      subject: String!
      senderPhone: String
      comments: String!
    ): Message!
    postProject(
      title: String!
      githubLink: String
      description: String!
      demoLink: String
      imageUrl: String
      tags: [String!]!
    ): Project!
    deleteProject(projectId: ID!): Message!
  }

  type Query {
    fetchProjects: [Project]!
    getCurrentAdmin: Admin
    infiniteScrollProjects(pageNum: Int!, pageSize: Int!): ProjectsPage!
    fetchProjectById(projectId: ID!): Project
    searchProjects(searchTerm: String): [Project]!
  }
`;
