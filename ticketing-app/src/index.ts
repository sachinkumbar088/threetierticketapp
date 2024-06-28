import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/ticketing-app", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
