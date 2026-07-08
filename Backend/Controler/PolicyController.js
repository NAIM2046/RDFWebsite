const { collections, ObjectId } = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadPolicy = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { name } = req.body;
  const filePath = `/uploads/${req.file.filename}`;

  try {
    const result = await collections.PolicyCollection.insertOne({
      name,
      filePath,
      uploadedAt: new Date(),
    });

    res.status(200).json({
      message: "Policy uploaded successfully",
      policy: { _id: result.insertedId, name, filePath },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload policy", error });
  }
};

const getPolicies = async (req, res) => {
  try {
    const policies = await collections.PolicyCollection.find().sort({ uploadedAt: -1 }).toArray();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Failed to fetch policies:", error);
    res.status(500).json({ message: "Failed to fetch policies", error });
  }
};

const deletePolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const policy = await collections.PolicyCollection.findOne({ _id: new ObjectId(id) });

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    const filePath = path.join(process.cwd(), policy.filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("File deletion failed:", err.message);
      }
    });

    await collections.PolicyCollection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ message: "Failed to delete policy", error });
  }
};

module.exports = { uploadPolicy, getPolicies, deletePolicy };
