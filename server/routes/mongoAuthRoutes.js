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
        return res.json(newUser)
      });
      //return res.json(newUser);
    } catch (error) {
      return res.json(error.message);
    }
  })
);
router.get("/login", (req, res) => {
  //res.render("")
});
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: ""}),
  async(req, res) => {
    const user = await User.findOne({email:req.user.email});
    return res.json(user);
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
