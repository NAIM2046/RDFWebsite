const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require("compression");
require('dotenv').config();

const { connectDB } = require('./config/db');

// Import routers
const AdminRoute = require('./Router/AdminRoute');
const PolicyRoute = require('./Router/PolicyRoute');
const ReportRoute = require('./Router/ReportRoute');
const SliderRoute = require('./Router/SliderRoute');
const ProgramRoute = require('./Router/ProgramRoute');
const ProjectRoute = require('./Router/ProjectRoute');
const ActivityRoute = require('./Router/ActivityRoute');
const TeamRoute = require('./Router/TeamRoute');
const NewsRoute = require('./Router/NewsRoute');
const PhotoRoute = require('./Router/PhotoRoute');
const VideoRoute = require('./Router/VideoRoute');
const EventRoute = require('./Router/EventRoute');
const PartnerRoute = require('./Router/PartnerRoute');
const PaymentRoute = require('./Router/PaymentRoute');
const EmailSentRoute = require('./Router/EmailSentRoute');
const CareerRoute = require('./Router/CareerRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  "https://rdfbd.org",
  "https://www.rdfbd.org",
  "http://localhost:5173"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(compression());

const __dirname_resolved = path.resolve();
const fs = require('fs');
app.get("/uploads/:filename", (req, res, next) => {
  const filePath = path.join(__dirname_resolved, "uploads", req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.redirect(`https://api.rdfbd.org/uploads/${encodeURIComponent(req.params.filename)}`);
  }
  next();
});
app.use("/uploads", express.static(path.join(__dirname_resolved, "uploads")));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Mount routes
app.use("/api/email", EmailSentRoute);
app.use("/admin", AdminRoute);
app.use("/api/admin", PolicyRoute);
app.use("/", ReportRoute);
app.use("/slider", SliderRoute);
app.use("/programs", ProgramRoute);
app.use("/projects", ProjectRoute);
app.use("/activities", ActivityRoute);
app.use("/teams", TeamRoute);
app.use("/news", NewsRoute);
app.use("/photos", PhotoRoute);
app.use("/video", VideoRoute);
app.use("/event", EventRoute);
app.use("/partner", PartnerRoute);
app.use("/api/payment", PaymentRoute);
app.use("/career", CareerRoute);

// Initialize DB and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}).catch(console.dir);
