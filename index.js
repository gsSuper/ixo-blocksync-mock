const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 5000;

server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
