import express from "express";
const router = express.Router();
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";
//register user
router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { fullName, email, password, contact } = req.body;
      const user = new User({ fullName, email, contact });
      const newUser = await User.register(user, password);
      req.login(newUser, (err) => {
        if (err) return next(err);
        res.send("registered and logged in");
      });
      //return res.json(newUser);
    } catch (error) {
      res.send(error.message);
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/home" }),
  (req, res) => {
    res.send("Welcome user");
  }
);
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("logged out");
  });
});

export default router;
