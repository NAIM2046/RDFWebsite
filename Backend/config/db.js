const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ijhlwac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
const collections = {};

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    db = client.db("RDF");
    
    collections.sliderinfo = db.collection("silderinfo");
    collections.programsCol = db.collection("programs");
    collections.projectCol = db.collection("projects");
    collections.activiesCol = db.collection("activies");
    collections.TeamCol = db.collection("teams");
    collections.newsCol = db.collection("news");
    collections.photoCol = db.collection("photos");
    collections.videoCol = db.collection("videos");
    collections.eventCol = db.collection("events");
    collections.partnerCol = db.collection("partners");
    collections.adminCol = db.collection("admins");
    collections.reportsCollection = db.collection("reports");
    collections.PolicyCollection = db.collection("policys");
    collections.careerCol = db.collection("careers");
    
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  collections,
  ObjectId
};
