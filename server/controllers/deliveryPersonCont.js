import DeliveryPerson from "../models/deliveryperson.js";
const allDPs = async (req, res) => {
  const DeliveryPersons = await DeliveryPerson.find({});
  return res.json({
    count: DeliveryPersons.length,
    data: DeliveryPersons,
  });
};
const newDP = async (req, res) => {
  const newDeliveryPerson = new DeliveryPerson(req.body);
  await newDeliveryPerson.save();
  await res.send("User Created Successfully");
};
const detailsOfDP = async (req, res) => {
  const DeliveryPerson = await DeliveryPerson.findById(req.params.id);
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
  const result = await DeliveryPerson.findByIdAndDelete(req.params.id);
  if (result) {
    res.send("Deleted successfully");
  } else {
    res.send("User not found");
  }
};
export { allDPs, newDP, detailsOfDP, updateDP, deleteDP };
