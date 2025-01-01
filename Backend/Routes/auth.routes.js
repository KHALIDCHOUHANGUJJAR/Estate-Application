import express from "express";
import {
  signup,
  loginControler,
  logOutControler,
  reSetpasswordControler,
  googleControler,
} from "../Controlers/auth.controller.js";

export const authRouters = express.Router();

authRouters.post("/signup", signup);
authRouters.post("/login", loginControler);
authRouters.post("/Logout", logOutControler);
authRouters.post("/reset", reSetpasswordControler);
authRouters.post("/google", googleControler);
