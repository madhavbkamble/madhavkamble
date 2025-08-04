const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = 4000;

// ✅ Body parser (must be before routes)
app.use(express.json());

// MongoDB Connection
const mongoURL = "mongodb+srv://madhav:system@cluster0.tudg0ig.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
const videoUploadRoute = require("./routes/uploadVideo");
const uploadRoute = require("./routes/uploads");
const auth = require("./routes/auth");

app.use("/api", videoUploadRoute);
app.use("/api", uploadRoute);
app.use("/api", auth);

// Test route
app.get("/", (req, res) => {
  res.send("API is working fine");
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
