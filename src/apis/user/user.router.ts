import express from "express";
import passport from "passport";
import { sendResponse } from "../../services/response";
import userController from "./user.controller";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  userController.login
);

router.get("/login", (req, res) => {
  return sendResponse(res, { data: { login: req.isAuthenticated() } });
});

router.post("/logout", (req, res) => {
  req.logout();
  return sendResponse(res);
});

export default router;
