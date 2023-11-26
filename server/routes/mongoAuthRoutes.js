import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";
import { validateFields } from "../middleware.js/middleware.js";
import {
  registerUser,
  loginUser,
  getLogin,
  logoutUser,
  currentUserDetails,
} from "../controllers/mongoAuthCont.js";

//auth routes
router.post("/register", validateFields,catchAsync(registerUser));
router.get("/login", getLogin);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  catchAsync(loginUser)
);
router.get("/logout", catchAsync(logoutUser));
router.get("/currentUser", currentUserDetails);

export default router;
