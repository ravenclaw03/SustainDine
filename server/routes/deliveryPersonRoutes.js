import express from "express";
const router = express.Router();
import {
  allDPs,
  newDP,
  detailsOfDP,
  updateDP,
  deleteDP,
} from "../controllers/deliveryPersonCont.js";
import catchAsync from "../utils/catchAsync.js";
import { validateDeliveryPerson } from "../middleware.js/middleware.js";
//import {DeliveryPersonSchema} from '../Schemas.js';
//DP routers
router.get("/show", catchAsync(allDPs));
router.post("/new", validateDeliveryPerson, catchAsync(newDP));
router.get("/:id", catchAsync(detailsOfDP));
router.put("/:id", validateDeliveryPerson, catchAsync(updateDP));
router.delete("/:id", catchAsync(deleteDP));

export default router;
