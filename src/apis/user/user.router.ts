import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res, next) => {
    return res.status(200).json(req.user);
  }
);

export default router;
