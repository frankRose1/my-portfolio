require('dotenv').config({ path: 'variables.env' });
const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const port = process.env.PORT || 5000;
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

//path to typedefs
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

//models
const Admin = require('./models/Admin');
const Project = require('./models/Project');

const server = new ApolloServer({
  //gql schema
  typeDefs,
  context: {
    //expose the DB via context
    Admin,
    Project
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
