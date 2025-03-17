const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
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
     const sliderinfo =  client.db("RDF").collection("silderinfo") ; 
     const programsCol=  client.db("RDF").collection("programs") ; 
     const projectCol=  client.db("RDF").collection("projects") ; 
     const activiesCol=  client.db("RDF").collection("activies") ; 
     const TeamCol=  client.db("RDF").collection("teams") ; 
     const newsCol=  client.db("RDF").collection("news") ; 
     const photoCol=  client.db("RDF").collection("photos") ; 
     const videoCol=  client.db("RDF").collection("videos") ; 
     const eventCol=  client.db("RDF").collection("events") ; 
     const partnerCol=  client.db("RDF").collection("partners") ; 
     const adminCol=  client.db("RDF").collection("admins") ; 

// middleware function 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  // Extract token from Bearer header
 // console.log(token) ;

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified; // Store admin info in request
    next(); // Move to the next middleware
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};


     // admin login api 
     app.post("/admin/reg" , async(req , res)=>{

           const {email , password} = req.body ;
           const salt = await bcrypt.genSalt(10);
           const hashedPassword = await bcrypt.hash(password, salt);
           const result =  await adminCol.insertOne({email , password: hashedPassword}) ;
           res.send(result) ;

     })

     app.post("/admin/login" , async(req, res)=>{
      const { email, password } = req.body;

      try {
        const admin = await adminCol.findOne({ email });
        if (!admin) return res.status(401).json({ message: "Invalid email or password" });
    
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    
        // Generate JWT Token
        const token = jwt.sign(
          { adminId: admin._id, email: admin.email },
          process.env.JWT_SECRET, // Secret key
          { expiresIn: "10h" } // Token expiration time
        );
    
        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ message: "Login failed" });
      }
     })

       // slider api start ;
     app.post("/slider", verifyToken, async (req, res) => {
      const { src, header, text } = req.body;
    
      // Basic validation
      if (!src || !header || !text) {
        return res.status(400).send({ error: "Missing required fields" });
      }
    
      const slider = req.body;
      try {
        const result = await sliderinfo.insertOne(slider);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to insert slider" });
      }
    });
    

     app.get("/slider",  async (req, res) => {
      try {
        const slider = await sliderinfo.find().toArray();
        res.send(slider);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch sliders" });
      }
    });
    
    app.delete("/slider/:id", verifyToken, async (req, res) => {
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
       // slider api end----------------- ; 

       // programs api start ; 
    app.post("/programs" ,verifyToken , async(req , res)=>{
      const program = req.body ; 
      const result =  await programsCol.insertOne(program) ; 
      res.send(result) ;
    })
    app.get("/programs" , async(req , res) =>{
      const result =  await programsCol.find().toArray() ;
      res.send(result) ;
    })
    app.delete("/programs/:id" , verifyToken, async(req , res) =>{
      const id = req.params.id ; 
      const quary = {_id : new ObjectId(id)} ;
      const result =  await programsCol.deleteOne(quary) ;
      res.send(result) ;
    } )
      // programs api end --------- ; 
     // projects apii start ; 
     app.post("/projects" , verifyToken,async(req , res) =>{
          const project = req.body ; 
          const result = await projectCol.insertOne(project) ; 
          res.send(result) ;
     })
     app.get("/projects" , async(req , res) =>{
      const result = await projectCol.find().toArray() ;
      res.send(result) ;
     })
   
     app.delete("/projects/:id" , verifyToken, async(req , res) =>{
      const id =  req.params.id ; 
      console.log(id) ;
      const quary =  {_id: new ObjectId(id)} ; 
      const result = await projectCol.deleteOne(quary) ;
      res.send(result) ;
     })
      // project api end---------------- ; 

      // active api start 

      app.post("/activities" , verifyToken , async(req , res) =>{
        const activies =  req.body ; 
        const result =  await activiesCol.insertOne(activies) ;
        res.send(result) ;
      })
      app.get("/activities" , async(req , res) =>{
        const result =  await activiesCol.find().toArray() ;
        res.send(result) ;
      })
      app.delete("/activities/:id" , verifyToken , async(req , res) =>{
        const id = req.params.id ; 
        const  quary  = {_id : new ObjectId(id)} ; 
        const result = await activiesCol.deleteOne(quary) ; 
      
      })

      // active api end-----------------
      // teams api start 

      app.post("/teams" , verifyToken , async(req , res) =>{
        const team = req.body ; 
        const result =  await TeamCol.insertOne(team) ; 
        res.send(result) ;

      })
      app.get("/teams" , async(req, res)=>{
        const result = await TeamCol.find().toArray() ; 
        res.send(result) ; 
      } )
      app.delete("/teams/:id" , verifyToken , async(req , res) =>{
           const id =  req.params.id ; 
           const quary = {_id : new ObjectId(id)} ; 
           const result = await TeamCol.deleteOne(quary) ; 
           res.send(result) ;
      })
      

      // teams api end------
      // news api start 
      app.post("/news" , verifyToken , async(req , res) =>{
        const news = req.body ; 
        const result =  await newsCol.insertOne(news) ; 
        res.send(result) ;

      })
      app.get("/news" , async(req, res)=>{
        const result = await newsCol.find().toArray() ; 
        res.send(result) ; 
      } )
      app.delete("/news/:id" , verifyToken , async(req , res) =>{
           const id =  req.params.id ; 
           const quary = {_id : new ObjectId(id)} ; 
           const result = await newsCol.deleteOne(quary) ; 
           res.send(result) ;
      })

      // news api end----------
      // photo api start 
      app.post("/photos" , verifyToken, async(req , res) =>{
        const photo = req.body ; 
        const result =  await photoCol.insertOne(photo) ; 
        res.send(result) ;

      })
      app.get("/photos" , async(req, res)=>{
        const result = await photoCol.find().toArray() ; 
        res.send(result) ; 
      } )
      app.delete("/photos/:id" ,verifyToken, async(req , res) =>{
           const id =  req.params.id ; 
           const quary = {_id : new ObjectId(id)} ; 
           const result = await photoCol.deleteOne(quary) ; 
           res.send(result) ;
      })

      // photo api end---------

      // video api start 
      app.post("/video" , verifyToken , async(req , res) =>{
        const video = req.body ; 
        const result =  await videoCol.insertOne(video) ; 
        res.send(result) ;

      })
      app.get("/video" , async(req, res)=>{
        const result = await videoCol.find().toArray() ; 
        res.send(result) ; 
      } )
      app.delete("/video/:id" , verifyToken , async(req , res) =>{
           const id =  req.params.id ; 
           const quary = {_id : new ObjectId(id)} ; 
           const result = await videoCol.deleteOne(quary) ; 
           res.send(result) ;
      })

      // video api end-----
      // event api start 
      app.post("/event" , verifyToken , async(req , res) =>{
        const event = req.body ; 
        const result =  await eventCol.insertOne(event) ; 
        res.send(result) ;

      })
      app.get("/event" ,  async(req, res)=>{
        const result = await eventCol.find().toArray() ; 
        res.send(result) ; 
      } )
      app.delete("/event/:id" , verifyToken , async(req , res) =>{
           const id =  req.params.id ; 
           const quary = {_id : new ObjectId(id)} ; 
           const result = await eventCol.deleteOne(quary) ; 
           res.send(result) ;
      })

      // event api end----

      //partner api start 
      app.post("/partner" ,verifyToken , async(req , res) =>{
        const partner = req.body ; 
        const result =  await partnerCol.insertOne(partner) ; 
        res.send(result) ;

      })
      app.get("/partner" , async(req, res)=>{
        const result = await partnerCol.find().toArray() ; 
        res.send(result) ; 
      } )
      app.delete("/partner/:id" , verifyToken , async(req , res) =>{
           const id =  req.params.id ; 
           const quary = {_id : new ObjectId(id)} ; 
           const result = await partnerCol.deleteOne(quary) ; 
           res.send(result) ;
      })


      // partner api end ----------
      //admin api  ;

     
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
module.exports = app ;