const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config() ;
app.use(express.json()) ;
app.use(cors()) ;
const port = process.env.PORT || 3000 
const compression = require("compression");
app.use(compression());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pjh5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     const silderinfo =  client.db("RDF").collection("silderinfo") ; 
     app.post("/slider", async (req, res) => {
      const { src, header, text } = req.body;
    
      // Basic validation
      if (!src || !header || !text) {
        return res.status(400).send({ error: "Missing required fields" });
      }
    
      const slider = req.body;
      try {
        const result = await silderinfo.insertOne(slider);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to insert slider" });
      }
    });
    

     app.get("/slider", async (req, res) => {
      try {
        const slider = await silderinfo.find().toArray();
        res.send(slider);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch sliders" });
      }
    });
    
    app.delete("/slider/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const query = { _id: new ObjectId(id) };
        const result = await silderinfo.deleteOne(query);
        if (result.deletedCount === 0) {
          return res.status(404).send({ error: "Slider not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to delete slider" });
      }
    });
     
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})