const { collections, ObjectId } = require('../config/db');

const createNews = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.newsCol.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNewss = async (req, res) => {
  try {
    const query = {};
    if (req.query.type) {
      query.type = req.query.type;
    }
    if (req.query.program) {
      query.program = req.query.program;
    }
    const result = await collections.newsCol.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getNewsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const result = await collections.newsCol.findOne({ _id: new ObjectId(id) });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateNews = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    
    // Some routes used updateOne, some findOneAndUpdate, but updateOne is safe generic
    const result = await collections.newsCol.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.newsCol.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createNews,
  getNewss,
  getNewsById,
  updateNews,
  deleteNews,
};
