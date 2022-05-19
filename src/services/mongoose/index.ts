import bluebird from "bluebird";
import mongoose from "mongoose";
import { DB_PASS, DB_USER, MONGODB_URI } from "../../constant/secrets";

// Connect to MongoDB
mongoose.Promise = bluebird;

export const connectMongo = () => {
  mongoose
    .connect(MONGODB_URI, {
      user: DB_USER,
      pass: DB_PASS,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. ${err}`
      );
      process.exit();
    });

  const db = mongoose.connection;

  db.on("error", (err: any) => console.log("MongoDB error:\n" + err));
};

export * from "./base";
