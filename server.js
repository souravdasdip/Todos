import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import * as mongoServices from "./config/index.js";
import { typeDefs } from "./gqlschemas/index.js";

//mongo uri connect
mongoose.connect(mongoServices.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check mongoDB connection
mongoose.connection.on("connected", () => {
  console.log("Connection successfull!");
});

mongoose.connection.on("error", () => {
  console.log("Connection Error!");
});

//mongoDB model connection with Schema
import "./models/index.js";

//resolver
import resolvers from "./gqlresolvers/index.js";

//create Apollo server nstance to listen
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(url);
});
