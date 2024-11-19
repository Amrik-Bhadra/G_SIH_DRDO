const express = require("express");
const mongoose = require("mongoose");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://relevancysync:yncZKIP3CQPj54ZZ@cluster0.fqcm6.mongodb.net/db4drdo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/files", fileRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
