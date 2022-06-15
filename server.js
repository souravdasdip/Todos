import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import * as mongoServices from "./config/index.js";
import { resolvers } from "./gqlresolvers/index.js";
import { typeDefs } from "./gqlschemas/index.js";
import * as mongoModels from "./models/index.js";

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
mongoose.model("User", mongoModels.userSchema);
mongoose.model("Quotes", mongoModels.quotesSchema);

//schema create (greet returns String type)

//resolver

//create Apollo server nstance to listen
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(url);
});
