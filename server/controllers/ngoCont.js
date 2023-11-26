import Ngo from "../models/ngo.js";
const listNGOs = async (req, res) => {
  const ngos = await Ngo.find({});
  return res.json({
    count: ngos.length,
    data: ngos,
  });
};
const newNGO = async (req, res) => {
  const newNgo = new Ngo(req.body);
  await newNgo.save();
  await res.send("NGO created successfully");
};
const detailsNGO = async (req, res) => {
  const ngo = await Ngo.findById(req.params.id);
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
  const result = await Ngo.findByIdAndDelete(req.params.id);
  if (result) {
    res.send("Deleted successfully");
  } else {
    res.send("Ngo not found");
  }
};

export { listNGOs, newNGO, detailsNGO, updateNGO, deleteNGO };
