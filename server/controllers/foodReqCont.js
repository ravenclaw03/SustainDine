import FoodReq from "../models/foodReq.js";

const activeReqs = async (req, res) => {
  const FoodReqs = await FoodReq.find({
    isDPAccepted: false,
    isNGOAccepted: false,
  });
  return res.status(200).json({
    count: FoodReqs.length,
    data: FoodReqs,
  });
};
const activeDpReqs = async (req, res) => {
  const FoodReqs = await FoodReq.find({
    isDPAccepted: false,
    isNGOAccepted: true,
  });
  return res.status(200).json({
    count: FoodReqs.length,
    data: FoodReqs,
  });
};
const allReqs = async (req, res) => {
  const FoodReqs = await FoodReq.find({});
  return res.status(200).json({
    count: FoodReqs.length,
    data: FoodReqs,
  });
};
const newReq = async (req, res) => {
  const newFoodReq = new FoodReq(req.body);
  newFoodReq.author = req.user._id;
  await newFoodReq.save();
  return res.status(200).json(newFoodReq);
};
const closedByDP = async (req, res) => {
  const foodreq = await FoodReq.findById(req.params.id);
  foodreq.deliveryPerson = req.user._id;
  foodreq.isDPAccepted = true;
  await foodreq.save();
  return res.status(200).json(foodreq);
};
const closedByNGO = async (req, res) => {
  const foodreq = await FoodReq.findById(req.params.id);
  foodreq.ngo = req.user._id;
  foodreq.isNGOAccepted = true;
  await foodreq.save();
  return res.status(200).json(foodreq);
};
const getDetails = async (req, res) => {
  const foodReq = await FoodReq.findById(req.params.id)
    .populate("author")
    .populate("ngo")
    .populate("deliveryPerson");
  return res.status(200).json(foodReq);
};
const updateReq = async (req, res) => {
  const result = await FoodReq.findByIdAndUpdate(req.params.id, req.body);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json("Request not found");
  }
};

const deleteReq = async (req, res) => {
  const result = await FoodReq.findByIdAndDelete(req.params.id);
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json("Request not found");
  }
};
const userActive = async (req, res) => {
  const FoodReqs = await FoodReq.find({
    isDPAccepted: false,
    author: req.user._id,
  });
  return res.status(200).json({
    count: FoodReqs.length,
    data: FoodReqs,
  });
};
const userInProgress = async (req, res) => {
  const FoodReqs = await FoodReq.find({
    isDPAccepted: true,
    author: req.user._id,
  });
  return res.status(200).json({
    count: FoodReqs.length,
    data: FoodReqs,
  });
};
export {
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
};
