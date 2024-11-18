const connectDB = require("./db/connectDb");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const expertRoutes = require("./routes/expertRoutes");
const localRoutes = require("./routes/localRoutes");

app.use(express.json());
app.use(cookieParser());

app.use("/api/expert", expertRoutes);
app.use("/api", localRoutes);

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

const connection = async () => {
  await connectDB(mongoURI);
  app.listen(PORT, () => {
    console.log("Server Status\t\t { OK } :-:\nDB Status\t\t { OK } :-:");
  });
};

connection();
