const { collections, ObjectId } = require('../config/db');

const createTeam = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.TeamCol.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeams = async (req, res) => {
  try {
    const query = {};
    if (req.query.committee && req.query.committee !== "All") {
      query["committees.committee_name"] = { $regex: new RegExp(`^${req.query.committee}$`, "i") };
    }
    if (req.query.name) {
      query.name = { $regex: new RegExp(`^${req.query.name}$`, "i") };
    }
    const result = await collections.TeamCol.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const result = await collections.TeamCol.findOne({ _id: new ObjectId(id) });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    
    // Some routes used updateOne, some findOneAndUpdate, but updateOne is safe generic
    const result = await collections.TeamCol.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.TeamCol.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
