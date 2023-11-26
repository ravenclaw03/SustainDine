import User from "../models/user.js";

const showUsers = async (req, res) => {
  const users = await User.find({});
  return res.json({
    count: users.length,
    data: users,
  });
};
const newUser = async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  await res.send("User Created Successfully");
};
const detailsUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.json(user);
};
const updateUser = async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, req.body);
  if (result) {
    res.send("Updated successfully");
  } else {
    res.send("User not found");
  }
};
const deleteUser = async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  if (result) {
    res.send("Deleted successfully");
  } else {
    res.send("User not found");
  }
};
export { showUsers, newUser, detailsUser, updateUser, deleteUser };
