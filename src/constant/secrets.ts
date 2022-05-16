import dotenv from "dotenv";
import fs from "fs";

fs.existsSync(".env")
  ? dotenv.config({ path: ".env" })
  : dotenv.config({ path: ".env.example" });

export const MONGODB_URI = process.env.MONGODB_URI;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;

export const SESSION_SECRET = process.env.SESSION_SECRET;
