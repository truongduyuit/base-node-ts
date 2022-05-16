import mongoose, { Document } from "mongoose";

export interface IUserModel extends Document {}

const schema = new mongoose.Schema(
  {},
  {
    collection: "users",
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserModel>("users", schema);
