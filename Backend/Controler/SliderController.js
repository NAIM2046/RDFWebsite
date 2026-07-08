const { collections, ObjectId } = require('../config/db');

const createSlider = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.sliderinfo.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSliders = async (req, res) => {
  try {
    const result = await collections.sliderinfo.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



const updateSlider = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    
    // Some routes used updateOne, some findOneAndUpdate, but updateOne is safe generic
    const result = await collections.sliderinfo.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSlider = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.sliderinfo.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createSlider,
  getSliders,
  
  updateSlider,
  deleteSlider,
};
