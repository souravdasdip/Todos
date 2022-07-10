import { quotes, users } from "../fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Quotes = mongoose.model("Quotes");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }), //users.find((user) => user._id == _id),
    quotes: async () => await Quotes.find({}).populate("by", "_id firstName"), // instead of response with by(_id), response with the _id and firstName of that _id
    iquote: async (_, { by }) => await Quotes.find({ by }), //quotes.filter((quote) => quote.by == by),
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur._id),
  },
  Mutation: {
    //user sign up
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },

    //user sign in
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      console.log(user);
      if (!user) {
        throw new Error("User dosen't exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("Email or password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, "jwt_super_secret_key");
      return { token };
    },

    //create quote =? destructure userID from "context"
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You must be logged in!");
      const newQoute = new Quotes({
        name,
        by: userId,
      });

      await newQoute.save();
      return "Quote saved successfully!";
    },
  },
};

export default resolvers;
