const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config() ;

const port = process.env.PORT || 3000 
const compression = require("compression");
const SSLCommerzPayment = require('sslcommerz-lts') ;
const multer = require('multer') ;
const path = require('path')
const fs = require('fs');



app.use(express.json()) ;
app.use(cors()) ;
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
     const reportsCollection=  client.db("RDF").collection("reports") ; 
     const PolicyCollection=  client.db("RDF").collection("policys") ; 
     const CertificationCollection=  client.db("RDF").collection("certifications") ; 

// middleware function 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  // Extract token from Bearer header
  console.log(token) ;

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

// report upload 
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage })
// upload a Certifications document (pdf)

// ...existing code...

// Upload a Certifications document (PDF)
app.post("/api/admin/certification-upload",   async (req, res) => {
  console.log("Call")
 console.log(req.body)

  const { name , filePath } = req.body;
  console.log(name , filePath) ;
 

  try {
    const result = await CertificationCollection.insertOne({
      name,
      filePath,
      uploadedAt: new Date(),
    });

    res.status(200).json({
      message: "Certification uploaded successfully",
      certification: { _id: result.insertedId, name, filePath },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload certification", error });
  }
});

// Get all certifications
app.get("/api/admin/certifications", async (req, res) => {
  try {
    const certifications = await CertificationCollection.find().sort({ uploadedAt: -1 }).toArray();
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certifications", error });
  }
});

// Delete a certification
app.delete("/api/admin/certifications/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const certification = await CertificationCollection.findOne({ _id: new ObjectId(id) });

    if (!certification) {
      return res.status(404).json({ message: "Certification not found" });
    }

    

    await CertificationCollection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: "Certification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete certification", error });
  }
});

// ...existing code...



// Upload a policy document (PDF)
app.post("/api/admin/policy-upload", verifyToken, upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { name } = req.body;
  console.log(name)
  const filePath = `/uploads/${req.file.filename}`;

  try {
    const result = await PolicyCollection.insertOne({
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
});

app.get("/api/admin/policies",  async (req, res) => {
  try {
    const policies = await PolicyCollection.find().sort({ uploadedAt: -1 }).toArray();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Failed to fetch policies:", error);
    res.status(500).json({ message: "Failed to fetch policies", error });
  }
});

app.delete("/api/admin/policies/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the policy document
    const policy = await PolicyCollection.findOne({ _id: new ObjectId(id) });

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Delete the file from disk
    const filePath = path.join(process.cwd(), policy.filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("File deletion failed:", err.message);
      }
    });

    // Delete the document from the database
    await PolicyCollection.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ message: "Failed to delete policy", error });
  }
});
// report post : 

app.post("/upload",verifyToken, upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { title , coverImage } = req.body;
  const filePath = `/uploads/${req.file.filename}`;

  try {
    const result = await reportsCollection.insertOne({ title, filePath,coverImage, uploadedAt: new Date() });
    res.json({ message: "Report uploaded successfully!", report: { _id: result.insertedId, title, filePath } });
  } catch (error) {
    res.status(500).json({ message: "Error saving report", error });
  }
});
app.get("/reports", async (req, res) => {
  try {
    const reports = await reportsCollection.find().toArray();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
});


// Delete Report

app.delete("/report/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid report ID" });
    }

    // First, find the report to get the file path
    const report = await reportsCollection.findOne({ _id: new ObjectId(id) });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Delete the file from the uploads folder
    const filePath = path.join(__dirname, "uploads", path.basename(report.filePath)); // Safely resolve path

    fs.unlink(filePath, async (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("File deletion error:", err);
        return res.status(500).json({ message: "Failed to delete file", error: err.message });
      }

      // File deleted (or didn't exist) — now delete from DB
      await reportsCollection.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: "Report and file deleted successfully!" });
    });

  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Error deleting report", error: error.message });
  }
});


const __dirname = path.resolve(); // Fix __dirname in CommonJS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



     // admin login api 
     app.post("/admin/reg" , verifyToken, async(req , res)=>{

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

     app.get("/admin/find" ,verifyToken, async(req, res)=>{
      const result = await adminCol.find().toArray();
      res.send(result);
     })
     app.delete("/admin/:id",verifyToken , async(req , res)=>{
       const id =  req.params.id ; 
       const quary = {_id : new ObjectId(id)} ; 
       const result = await adminCol.deleteOne(quary) ;
       res.send(result) ;
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
        const result = await sliderinfo.deleteOne(query);
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

    app.put("/programs/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProgram = req.body;
    
    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid program ID" });
    }
    
    const query = { _id: new ObjectId(id) };
    
    // Create update object with $set operator
    const updateDoc = {
      $set: {
        title: updatedProgram.title,
        description: updatedProgram.description,
        focus: updatedProgram.focus,
        images: updatedProgram.images,
        videoId: updatedProgram.videoId,
        updatedAt: new Date() // Add timestamp for last update
      }
    };
    
    // Options to return the updated document
    const options = { returnOriginal: false };
    
    const result = await programsCol.updateOne(query, updateDoc, options);
    
    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Program not found" });
    }
    
    res.send(result);
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});
      // programs api end --------- ; 
     // projects apii start ; 
     

// Create project
app.post("/projects", verifyToken, async (req, res) => {
    try {
        const project = {
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        const result = await projectCol.insertOne(project);
        res.json({
            message: "Project created successfully",
            insertedId: result.insertedId
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all projects
app.get("/projects", async (req, res) => {
    try {
        const result = await projectCol.find().toArray();
        res.json(result);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get single project by ID
app.get("/projects/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }
        
        const query = { _id: new ObjectId(id) };
        const result = await projectCol.findOne(query);
        
        if (!result) {
            return res.status(404).json({ error: "Project not found" });
        }
        
        res.json(result);
        
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update project
app.put("/projects/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const updatedProject = req.body;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }
        
        const query = { _id: new ObjectId(id) };
        
        const updateDoc = {
            $set: {
                name: updatedProject.name,
                programName: updatedProject.programName,
                donor: updatedProject.donor,
                budget: updatedProject.budget,
                startDate: updatedProject.startDate,
                endDate: updatedProject.endDate,
                projectState: updatedProject.projectState,
                implementingAreas: updatedProject.implementingAreas,
                directBeneficiaries: updatedProject.directBeneficiaries,
                indirectBeneficiaries: updatedProject.indirectBeneficiaries,
                projectGoal: updatedProject.projectGoal,
                majorInterventions: updatedProject.majorInterventions,
                projectResults: updatedProject.projectResults,
                projectCompletionReport: updatedProject.projectCompletionReport,
                remarks: updatedProject.remarks,
                images: updatedProject.images,
                video: updatedProject.video,
                activitiesID: updatedProject.activitiesID,
                projectSummary: updatedProject.projectSummary,
                updatedAt: new Date()
            }
        };
        
        const options = { returnOriginal: false };
        
        const result = await projectCol.findOneAndUpdate(query, updateDoc, options);
        console.log(result)
        
        // if (!result.value) {
        //     return res.status(404).json({ error: "Project not found" });
        // }
        
        res.json({
            message: "Project updated successfully",
            modifiedCount: 1,
            project: result.value
        });
        
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete project
app.delete("/projects/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }
        
        const query = { _id: new ObjectId(id) };
        const result = await projectCol.deleteOne(query);
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Project not found" });
        }
        
        res.json({
            message: "Project deleted successfully",
            deletedCount: result.deletedCount
        });
        
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
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
      app.patch('/teams/:id' , async(req , res) => {
        try{
        const {id} =  req.params ; 
        console.log(id) ;
        const updateData =  req.body ; 
        const quary = {_id : new ObjectId(id)} ;
        const result =  await TeamCol.updateOne(quary , {$set: updateData}) ;
         if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Team member not found" });
    } 
        res.status(200).json({message: "Team member updated successfully", result});

        } catch(err){
          console.error("Error updating team member:", err);
    res.status(500).json({ message: "Internal server error" });
        }

      })
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

      app.patch('/news/:id', verifyToken, async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await newsCol.updateOne(query, { $set: updateData });
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ message: "News updated successfully", result });
      });

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
      //payment api  ;

      app.post("/api/payment", async (req, res) => {
        
        const { amount, name, email,donationType } = req.body;
      
        const tran_id = "txn_" + new Date().getTime();
        
        const data = {
          total_amount: amount,
          currency: "BDT",
          tran_id: tran_id,
          success_url: `${process.env.SERVER_URL}/api/payment/success/${tran_id}`,
          fail_url: `${process.env.SERVER_URL}/api/payment/fail/${tran_id}`,
          cancel_url: `${process.env.SERVER_URL}/api/payment/cancel/${tran_id}`,
          ipn_url: `${process.env.SERVER_URL}/api/payment/ipn`,
          shipping_method: "No",
          product_name: "Donation",
          product_category: "Charity",
          product_profile: "general",
          cus_name: name,
          cus_email: email,
          cus_add1: "Dhaka",
          cus_phone: "01700000000",
        };
      
        const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false);
      
        sslcz.init(data).then(apiResponse => {
          let GatewayPageURL = apiResponse.GatewayPageURL;
          res.json({ GatewayPageURL });
        }).catch(error => {
          console.error("SSLCommerz Error:", error);
          res.status(500).json({ error: "Payment initiation failed." });
        });
      });
      
      app.post("/api/payment/success/:tran_id", (req, res) => {
        const { tran_id } = req.params;
      
        // You can update your database here (e.g., mark payment as completed)
        console.log(`Payment successful for Transaction ID: ${tran_id}`);
      
        // Redirect to the frontend success page with transaction details
        res.redirect(`${process.env.FRONTEND_URL}/payment-success?tran_id=${tran_id}`);
      });
      
      
      app.post("/api/payment/fail/:tran_id", (req, res) => {
        res.json({ message: "Payment Failed", transactionId: req.params.tran_id });
      });
      
      app.post("/api/payment/cancel/:tran_id", (req, res) => {
        res.json({ message: "Payment Cancelled", transactionId: req.params.tran_id });
      });
      
      app.post("/api/payment/ipn", (req, res) => {
        console.log("IPN Received:", req.body);
        res.json({ message: "IPN received successfully" });
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
