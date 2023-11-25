import express from "express";
const router = express.Router();
import FoodReq from "../models/foodReq.js";
import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import ExpressError from "../utils/ExpressError.js";
import { isLoggedIn } from "../middleware.js/middleware.js";
router.get(
  "/showactv",
  catchAsync(async (req, res) => {
    const FoodReqs = await FoodReq.find({
      isDPAccepted: false,
      isNGOAccepted: false,
    });
    return res.status(200).json({
      count: FoodReqs.length,
      data: FoodReqs,
    });
  })
);
router.get(
  "/showactvDP",
  catchAsync(async (req, res) => {
    const FoodReqs = await FoodReq.find({
      isDPAccepted: false,
      isNGOAccepted: true,
    });
    return res.status(200).json({
      count: FoodReqs.length,
      data: FoodReqs,
    });
  })
);
router.get(
  "/showall",
  catchAsync(async (req, res) => {
    const FoodReqs = await FoodReq.find({});
    return res.status(200).json({
      count: FoodReqs.length,
      data: FoodReqs,
    });
  })
);
router.post(
  "/new",
  isLoggedIn,catchAsync(async (req, res) => {
    const newFoodReq = new FoodReq(req.body);
    console.log(req.user)
    await newFoodReq.save();
    return res.status(200).json(newFoodReq);
  })
);
router.put(
  "/closeDP/:id",
  catchAsync(async (req, res) => {
    const foodreq = await FoodReq.findById(req.params.id);
    foodreq.isDPAccepted = true;
    await foodreq.save();
    return res.status(200).json(foodreq);
  })
);
router.put(
  "/closeNGO/:id",
  catchAsync(async (req, res) => {
    const foodreq = await FoodReq.findById(req.params.id);
    foodreq.isNGOAccepted = true;
    await foodreq.save();
    return res.status(200).json(foodreq);
  })
);
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const foodReq = await FoodReq.findById(req.params.id).populate("author");
    console.log(foodReq);
    //return res.status(200).foodReq;
  })
);
router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const result = await FoodReq.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("Request not found");
    }
  })
);
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const result = await FoodReq.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("Request not found");
    }
  })
);

export default router;
