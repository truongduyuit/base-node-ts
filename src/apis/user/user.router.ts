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
  return sendResponse(res, { data: { isLogin: req.isAuthenticated() } });
});

router.get("/logout", (req, res) => {
  req.logout();
  return sendResponse(res);
});

/** Login with Google */
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    return sendResponse(res, req.user);
  }
);

/** Login with Facebook */
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/login/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    return sendResponse(res, req.user);
  }
);

export default router;
