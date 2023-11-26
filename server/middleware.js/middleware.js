import ExpressError from "../utils/ExpressError.js";
import FoodReq from "../models/foodReq.js";
import {
  ngoSchema,
  userSchema,
  foodReqSchema,
  deliveryPersonSchema,
} from "../utils/Schemas.js";
export const validateFoodReq = (req, res, next) => {
  const { error } = foodReqSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
export const validateNgo = (req, res, next) => {
  const { error } = ngoSchema.validate(req.body);
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
export const validateDeliveryPerson = (req, res, next) => {
  const { error } = deliveryPersonSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
