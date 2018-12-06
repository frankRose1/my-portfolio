require('dotenv').config({ path: 'variables.env' });
const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer, AuthenticationError } = require('apollo-server');
const port = process.env.PORT || 5000;
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

//path to typedefs
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

//models
const Admin = require('./models/Admin');
const Project = require('./models/Project');

//verify JWT sent from client
const getAdmin = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.APP_SECRET);
    } catch (err) {
      throw new AuthenticationError(
        'Your session has ended. Please sign in again'
      );
    }
  }
};

const server = new ApolloServer({
  //gql schema
  typeDefs,
  context: async ({ req }) => {
    const token = req.headers['authorization'];
    return {
      //expose the DB via context
      Admin,
      Project,
      currentAdmin: await getAdmin(token)
    };
  },
  resolvers: {
    Query,
    Mutation
  }
});

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB.');
    return server.listen(port);
  })
  .then(({ url }) => console.log(`Server is listening on ${url}`))
  .catch(err => console.log(`Server error --> ${err}`));
