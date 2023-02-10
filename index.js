const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 5000 }, () => {
    console.log("Server running on port 5000");
  });
});
