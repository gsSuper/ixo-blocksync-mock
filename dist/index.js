"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const TypeDefs_1 = require("./Schema/TypeDefs");
const Resolvers_1 = require("./Schema/Resolvers");
const app = (0, express_1.default)();
const server = new apollo_server_express_1.ApolloServer({ typeDefs: TypeDefs_1.typeDefs, resolvers: Resolvers_1.resolvers });
const PORT = process.env.PORT || 5000;
server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen({ port: PORT }, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
