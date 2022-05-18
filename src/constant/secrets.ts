import dotenv from "dotenv";
import fs from "fs";

fs.existsSync(".env")
  ? dotenv.config({ path: ".env" })
  : dotenv.config({ path: ".env.example" });

export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
export const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;
