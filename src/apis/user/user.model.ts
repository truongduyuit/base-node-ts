import mongoose, { Document } from "mongoose";

export interface IUserModel extends Document {
  _id: string;
  email: string;
  password: string;
  profile: {
    id: string;
    displayName: string;
    provider: string;
    photos: [
      {
        value: string;
      }
    ];
    emails: [
      {
        value: string;
        verified: boolean;
      }
    ];
  };
  createdAt: string;
  updatedAt: string;
}

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile: {
      id: String,
      displayName: String,
      provider: String,
      photos: [
        {
          value: String,
        },
      ],
      emails: [
        {
          value: String,
          verified: Boolean,
        },
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserModel>("users", schema);
