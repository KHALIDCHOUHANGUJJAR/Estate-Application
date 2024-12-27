import express from "express";
import { signup } from "../Controlers/auth.controller.js";

export const authRouters = express.Router();

authRouters.post("/signup", signup);
