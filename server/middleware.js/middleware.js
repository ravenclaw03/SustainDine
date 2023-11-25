import ExpressError from "../utils/ExpressError.js";

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
export const isLoggedIn=(req,res,next)=>{
  console.log(req.user)
  next();
}
