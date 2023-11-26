import ExpressError from "../utils/ExpressError.js";
import FoodReq from "../models/foodReq.js";
import { foodReqSchema, generalSchema } from "../utils/Schemas.js";
export const validateFoodReq = (req, res, next) => {
  const { error } = foodReqSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
export const validateFields = (req, res, next) => {
  const { error } = generalSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export const isAuthor = async (req, res, next) => {
  const foodReq = await FoodReq.findById(req.params.id);
  if (!foodReq.author.equals(req.user._id)) {
    return res
      .status(401)
      .json("You dont have permission to perform this action.");
  }
  next();
};
