const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const expertRoutes = require("./routes/expertRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/expert", expertRoutes);
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

const connection = async () => {
  await connectDB(mongoURI);
  app.listen(PORT, () => {
    console.log("Server & DB is Working fine :-:");
  });
};

connection();
