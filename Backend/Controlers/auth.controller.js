import User from "../Model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import TokenGenerator from "../helper/verfied.js";

const { compare, hashSync } = bcryptjs;

const signup = async (req, res, next) => {
  try {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userNameExist = await User.findOne({ userName });
    if (userNameExist) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = hashSync(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in signup:", error);

    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginControler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_ENV);
    console.log(token);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const logOutControler = async (req, res) => {
  res.status(200).send({ message: "logout successfully" });
};

const reSetpasswordControler = async (req, res) => {
  const token = TokenGenerator();
  console.log(token);
  res.send({ message: "chlgiya" });
};

export { signup, loginControler, logOutControler, reSetpasswordControler };
