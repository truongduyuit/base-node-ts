import { UserService } from "../apis/user/user.services";
import { connectMongo } from "../services/mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { hash } from "../services/bcrypt";

fs.existsSync(".env")
  ? dotenv.config({ path: ".env" })
  : dotenv.config({ path: ".env.example" });

(async () => {
  try {
    console.log("Starting setup...");
    await connectMongo();

    const admin = await UserService.getOne({
      email: process.env.ADMIN_DEFAULT_EMAIL,
    });

    const hashed = hash(process.env.ADMIN_DEFAULT_PASSWORD);

    if (!admin) {
      await UserService.create({
        email: process.env.ADMIN_DEFAULT_EMAIL,
        password: hashed,
      });
    }

    console.log("Starting successfull...");
    process.exit(0);
  } catch (error) {
    console.log("Setup error: ", error);
    process.exit(1);
  }
})();
