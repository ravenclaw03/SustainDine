import User from "../models/user.js";
const allDPs = async (req, res) => {
  const DeliveryPersons = await User.find({type:3});
  return res.json({
    count: DeliveryPersons.length,
    data: DeliveryPersons,
  });
};

const detailsOfDP = async (req, res) => {
  const DeliveryPerson = await User.findById(req.params.id);
  return res.json(DeliveryPerson);
};
const updateDP = async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, req.body);
  if (result) {
    res.send("Updated successfully");
  } else {
    res.send("User not found");
  }
};
const deleteDP = async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  if (result) {
    res.send("Deleted successfully");
  } else {
    res.send("User not found");
  }
};
export { allDPs, detailsOfDP, updateDP, deleteDP };
