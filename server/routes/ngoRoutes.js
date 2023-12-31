import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateFields } from "../middleware.js/middleware.js";
import {
  listNGOs,
  detailsNGO,
  updateNGO,
  deleteNGO,
} from "../controllers/ngoCont.js";
//Ngos routers
router.get("/show", catchAsync(listNGOs));
router.get("/:id", catchAsync(detailsNGO));
router.put("/:id", validateFields, catchAsync(updateNGO));
router.delete("/:id", catchAsync(deleteNGO));

export default router;
