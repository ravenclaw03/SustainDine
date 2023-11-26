import User from "../models/user.js";
const listNGOs = async (req, res) => {
  const ngos = await User.find({type:2});
  return res.json({
    count: ngos.length,
    data: ngos,
  });
};

const detailsNGO = async (req, res) => {
  const ngo = await User.findById(req.params.id);
  return res.json(ngo);
};
const updateNGO = async (req, res) => {
  const result = await Ngo.findByIdAndUpdate(req.params.id, req.body);
  if (result) {
    res.send("Updated successfully");
  } else {
    res.send("Ngo not found");
  }
};
const deleteNGO = async (req, res) => {
  const result = await User.findByIdAndDelete(req.params.id);
  if (result) {
    res.send("Deleted successfully");
  } else {
    res.send("Ngo not found");
  }
};

export { listNGOs, detailsNGO, updateNGO, deleteNGO };
