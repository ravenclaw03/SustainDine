import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateFields } from "../middleware.js/middleware.js";
import {
  showUsers,
  detailsUser,
  updateUser,
  deleteUser,
} from "../controllers/userCont.js";

//Users routers
router.get("/show", catchAsync(showUsers));
router.get("/:id", catchAsync(detailsUser));
router.put("/:id", validateFields, catchAsync(updateUser));
router.delete("/:id", catchAsync(deleteUser));

export default router;
