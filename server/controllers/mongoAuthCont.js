import User from "../models/user.js";
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      contact,
      type,
      latitude,
      longitude,
      address,
    } = req.body;
    const user = new User({
      fullName,
      email,
      contact,
      type,
      latitude,
      longitude,
      address,
    });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.json(newUser);
    });
  } catch (error) {
    return res.json(error.message);
  }
};
const getLogin = (req, res) => {
  return res.status(401).json("You need to login");
};
const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  return res.json(user);
};
const logoutUser = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.json("Logged Out");
  });
};
const currentUserDetails = async (req, res) => {
  return res.status(200).json(req.user);
};

export { registerUser, loginUser, getLogin, logoutUser, currentUserDetails };
