const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { collections, ObjectId } = require('../config/db');

const registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const result = await collections.adminCol.insertOne({ email, password: hashedPassword });
  res.send(result);
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await collections.adminCol.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

const getAdmins = async (req, res) => {
  const result = await collections.adminCol.find().toArray();
  res.send(result);
};

const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await collections.adminCol.deleteOne(query);
  res.send(result);
};

module.exports = { registerAdmin, loginAdmin, getAdmins, deleteAdmin };
