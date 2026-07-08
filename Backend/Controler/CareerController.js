const { collections, ObjectId } = require('../config/db');
const path = require('path');
const fs = require('fs');

const createCareer = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { title } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;
  try {
    const result = await collections.careerCol.insertOne({
      title,
      file: fileUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({
      message: "Career posting created successfully",
      career: { _id: result.insertedId, title, file: fileUrl }
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving career posting", error });
  }
};

const getCareers = async (req, res) => {
  try {
    const result = await collections.careerCol.find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching career postings", error });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid career ID" });
    }
    const career = await collections.careerCol.findOne({ _id: new ObjectId(id) });
    if (!career) {
      return res.status(404).json({ message: "Career posting not found" });
    }
    
    if (career.file && career.file.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "uploads", path.basename(career.file));
      fs.unlink(filePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("File deletion error:", err);
        }
      });
    }
    await collections.careerCol.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Career posting deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting career posting", error });
  }
};

const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid career ID" });
    }
    const career = await collections.careerCol.findOne({ _id: new ObjectId(id) });
    if (!career) {
      return res.status(404).json({ message: "Career posting not found" });
    }
    
    const { title } = req.body;
    const updateData = { title, updatedAt: new Date() };
    
    if (req.file) {
      if (career.file && career.file.startsWith("/uploads/")) {
        const oldFilePath = path.join(process.cwd(), "uploads", path.basename(career.file));
        fs.unlink(oldFilePath, (err) => {
          if (err && err.code !== "ENOENT") {
            console.error("Old file deletion error:", err);
          }
        });
      }
      updateData.file = `/uploads/${req.file.filename}`;
    }
    
    await collections.careerCol.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    res.json({ message: "Career posting updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating career posting", error });
  }
};

module.exports = {
  createCareer,
  getCareers,
  deleteCareer,
  updateCareer
};
