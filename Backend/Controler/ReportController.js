const { collections, ObjectId } = require('../config/db');
const path = require('path');
const fs = require('fs');

const uploadReport = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { title, coverImage } = req.body;
  const filePath = `/uploads/${req.file.filename}`;

  try {
    const result = await collections.reportsCollection.insertOne({ title, filePath, coverImage, uploadedAt: new Date() });
    res.json({ message: "Report uploaded successfully!", report: { _id: result.insertedId, title, filePath } });
  } catch (error) {
    res.status(500).json({ message: "Error saving report", error });
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await collections.reportsCollection.find().toArray();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    const report = await collections.reportsCollection.findOne({ _id: new ObjectId(id) });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const filePath = path.join(process.cwd(), "uploads", path.basename(report.filePath));

    fs.unlink(filePath, async (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("File deletion error:", err);
        return res.status(500).json({ message: "Failed to delete file", error: err.message });
      }

      await collections.reportsCollection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "Report and file deleted successfully!" });
    });

  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
};

module.exports = { uploadReport, getReports, deleteReport };
