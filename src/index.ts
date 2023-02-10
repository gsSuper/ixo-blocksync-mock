import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./Schema/TypeDefs";
import { resolvers } from "./Schema/Resolvers";

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 5000;

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
