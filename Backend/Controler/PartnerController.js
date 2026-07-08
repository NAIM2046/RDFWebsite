const { collections, ObjectId } = require('../config/db');

const createPartner = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.partnerCol.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPartners = async (req, res) => {
  try {
    const result = await collections.partnerCol.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};





const updatePartner = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updatedData = { ...req.body, updatedAt: new Date() };
    // Remove _id from updatedData if present to prevent MongoDB immutable field error
    delete updatedData._id;
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    const result = await collections.partnerCol.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePartner = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.partnerCol.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createPartner,
  getPartners,
  updatePartner,
  deletePartner,
};
