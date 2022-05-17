import mongoose, { Document } from "mongoose";

export interface IUserModel extends Document {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserModel>("users", schema);
