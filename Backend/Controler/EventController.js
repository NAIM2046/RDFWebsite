const { collections, ObjectId } = require('../config/db');

const createEvent = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.eventCol.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const result = await collections.eventCol.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const result = await collections.eventCol.findOne({ _id: new ObjectId(id) });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updatedData = { ...req.body, updatedAt: new Date() };
    delete updatedData._id;
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    
    // Some routes used updateOne, some findOneAndUpdate, but updateOne is safe generic
    const result = await collections.eventCol.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.eventCol.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
