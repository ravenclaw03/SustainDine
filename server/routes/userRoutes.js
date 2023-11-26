import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateUser } from "../middleware.js/middleware.js";
import {
  showUsers,
  newUser,
  detailsUser,
  updateUser,
  deleteUser,
} from "../controllers/userCont.js";

//Users routers
router.get("/show", catchAsync(showUsers));
router.post("/new", validateUser, catchAsync(newUser));

router.get("/:id", catchAsync(detailsUser));
router.put("/:id", validateUser, catchAsync(updateUser));
router.delete("/:id", catchAsync(deleteUser));

export default router;
