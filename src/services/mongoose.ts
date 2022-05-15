import bluebird from "bluebird";
import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/secrets";

// Connect to MongoDB
mongoose.Promise = bluebird;

export const connectMongo = () => {
  mongoose
    .connect(MONGODB_URI, {
      autoIndex: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    })
    .then(() => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch((err) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`
      );
      // process.exit();
    });
};
