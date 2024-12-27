import express from "express";
import { test } from "../Controlers/User.controller.js";

export const UserRouters = express.Router();

UserRouters.get("/", test);
