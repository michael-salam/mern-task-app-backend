const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-task-app.onrender.com"],
  })
);

app.use("/api/tasks", taskRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
