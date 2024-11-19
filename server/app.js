const connectDB = require("./db/connectDb");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const expertRoutes = require("./routes/expertRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const localRoutes = require("./routes/localRoutes");
const panelRoutes = require("./routes/panelRoute");
const machineLearningRoutes = require("./routes/ML_Routes");

app.use(express.json());
app.use(cookieParser());

app.use("/api", localRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/expert", expertRoutes);
app.use("/api/panel", panelRoutes);
app.use("/api/mlr", machineLearningRoutes);

const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

const connection = async () => {
  await connectDB(mongoURI);
  app.listen(PORT, () => {
    console.log("Server Status\t\t { OK } :-:\nDB Status\t\t { OK } :-:");
  });
};

connection();
