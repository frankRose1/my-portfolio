require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const port = process.env.PORT || 4000;
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const typeDefs = require('./typeDefs');
const Admin = require('./models/Admin');
const Project = require('./models/Project');

const server = new ApolloServer({
  typeDefs,
  context: ({ req }) => {
    const token = req.headers.authorization;
    return {
      Admin,
      Project,
      token
    };
  },
  resolvers: {
    Query,
    Mutation
  },
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.log(`Error connecting to mongoDB: ${err}`));

server
  .listen({ port })
  .then(({ url }) => console.log(`Server is listening at ${url}`));
