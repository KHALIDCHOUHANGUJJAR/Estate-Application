import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouters } from "./Routes/user.routes.js";
import { authRouters } from "./Routes/auth.routes.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To Backend");
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

const MongoDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("mongoose error", error);
  }
};
MongoDb();

app.use("/test", UserRouters);
app.use("/auth", authRouters);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
