import express from "express";
const router = express.Router();
import {
  allDPs,
  detailsOfDP,
  updateDP,
  deleteDP,
} from "../controllers/deliveryPersonCont.js";
import catchAsync from "../utils/catchAsync.js";
import { validateFields } from "../middleware.js/middleware.js";
//DP routers
router.get("/show", catchAsync(allDPs));
router.get("/:id", catchAsync(detailsOfDP));
router.put("/:id", validateFields, catchAsync(updateDP));
router.delete("/:id", catchAsync(deleteDP));

export default router;
