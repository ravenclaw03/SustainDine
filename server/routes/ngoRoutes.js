import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateNgo } from "../middleware.js/middleware.js";
import {
  listNGOs,
  newNGO,
  detailsNGO,
  updateNGO,
  deleteNGO,
} from "../controllers/ngoCont.js";
//Ngos routers
router.get("/show", catchAsync(listNGOs));
router.post("/new", validateNgo, catchAsync(newNGO));
router.get("/:id", catchAsync(detailsNGO));
router.put("/:id", validateNgo, catchAsync(updateNGO));
router.delete("/:id", catchAsync(deleteNGO));

export default router;
