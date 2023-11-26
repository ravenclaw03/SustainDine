import FoodReq from "../models/foodReq.js";

const activeReqs= async (req, res) => {
    const FoodReqs = await FoodReq.find({
      isDPAccepted: false,
      isNGOAccepted: false,
    });
    return res.status(200).json({
      count: FoodReqs.length,
      data: FoodReqs,
    });
  }
  const activeDpReqs=async (req, res) => {
    const FoodReqs = await FoodReq.find({
      isDPAccepted: false,
      isNGOAccepted: true,
    });
    return res.status(200).json({
      count: FoodReqs.length,
      data: FoodReqs,
    });
  }
  const allReqs=async (req, res) => {
    const FoodReqs = await FoodReq.find({});
    return res.status(200).json({
      count: FoodReqs.length,
      data: FoodReqs,
    });
  }
const newReq=async (req, res) => {
    const newFoodReq = new FoodReq(req.body);
    newFoodReq.author=req.user._id;
    await newFoodReq.save();
    return res.status(200).json(newFoodReq);
  }
const closedByDP=async (req, res) => {
    const foodreq = await FoodReq.findById(req.params.id);
    foodreq.isDPAccepted = true;
    await foodreq.save();
    return res.status(200).json(foodreq);
  }
const closedByNGO=async (req, res) => {
    const foodreq = await FoodReq.findById(req.params.id);
    foodreq.isNGOAccepted = true;
    await foodreq.save();
    return res.status(200).json(foodreq);
  }
const getDetails=async (req, res) => {
    const foodReq = await FoodReq.findById(req.params.id).populate("author");
    return res.status(200).json(foodReq);
  }
const updateReq=async (req, res) => {
    const result = await FoodReq.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("Request not found");}}
      
const deleteReq=async (req, res) => {
    const result = await FoodReq.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json("Request not found");
    }
  }

export{activeReqs,activeDpReqs,allReqs,newReq,closedByDP,closedByNGO,getDetails,updateReq,deleteReq};