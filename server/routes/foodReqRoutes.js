import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { isAuthor } from "../middleware.js/middleware.js";
import {
  activeReqs,
  activeDpReqs,
  allReqs,
  newReq,
  closedByDP,
  closedByNGO,
  getDetails,
  updateReq,
  deleteReq,
  userActive,
  userInProgress,
  dpInProgress,
  ngoInProgress,
} from "../controllers/foodReqCont.js";

//foodReq routes
router.get("/showactv", catchAsync(activeReqs));
router.get("/showactvDP", catchAsync(activeDpReqs));
router.get("/useractv", catchAsync(userActive));
router.get("/userProgress", catchAsync(userInProgress));
router.get("/ngoProgress", catchAsync(ngoInProgress));
router.get("/dpProgress", catchAsync(dpInProgress));
router.get("/showall", catchAsync(allReqs));
router.post("/new", catchAsync(newReq));
router.put("/closeDP/:id", catchAsync(closedByDP));
router.put("/closeNGO/:id", catchAsync(closedByNGO));
router.get("/:id", catchAsync(getDetails));
router.put("/:id", isAuthor, catchAsync(updateReq));
router.delete("/:id", isAuthor, catchAsync(deleteReq));

export default router;
