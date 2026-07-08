const { collections, ObjectId } = require('../config/db');

const createProject = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.projectCol.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProjects = async (req, res) => {
  try {
    const query = {};
    if (req.query.programName) {
      query.programName = req.query.programName;
    }
    if (req.query.projectState) {
      query.projectState = req.query.projectState;
    }
    const result = await collections.projectCol.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const result = await collections.projectCol.findOne({ _id: new ObjectId(id) });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    
    // Some routes used updateOne, some findOneAndUpdate, but updateOne is safe generic
    const result = await collections.projectCol.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.projectCol.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
