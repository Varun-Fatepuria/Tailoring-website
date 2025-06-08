const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 20 * 60 * 1000, httpOnly: true } 
}));

mongoose.connect("mongodb://127.0.0.1:27017/projectDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

//added by varun 
const measurementRoutes = require('./routes/measurements');
app.use('/api/measurements', measurementRoutes);
const customizationsRoute = require('./routes/customizations');
app.use('/api/customizations', customizationsRoute);
const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
