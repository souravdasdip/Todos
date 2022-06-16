import { ApolloServer, gql } from "apollo-server";
import jwt from "jsonwebtoken";
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
  //before resolvers context meet the req
  context: ({ req }) => {
    const { authorization } = req.headers;

    //token recieved, jwt verify token, decode the userId and return the id
    if (authorization) {
      const { userId } = jwt.verify(authorization, "jwt_super_secret_key");
      return { userId };
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(url);
});
