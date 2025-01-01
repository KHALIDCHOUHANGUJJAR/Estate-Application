import User from "../Model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js"; // Ensure this is used
import TokenGenerator from "../helper/verfied.js";

const { compare, hashSync } = bcryptjs;

// Signup Controller
const signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ message: "Email already exists" });
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
      user: {
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_ENV, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Google Controller (Improved Password & Username)
const googleControler = async (req, res) => {
  try {
    const { email, userName, photo } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = bcryptjs.hashSync(
        crypto.randomBytes(8).toString("hex"),
        10
      );

      user = new User({
        userName: `${userName.toLowerCase()}_${Date.now()}`,
        email,
        password: generatedPassword,
        avatar: photo,
      });

      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_ENV, {
      expiresIn: "1h",
    });
    const { password, ...userData } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json(userData);
  } catch (error) {
    console.error("Error in Google login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// logoutcontroller
const logOutControler = async (req, res) => {
  res.status(200).send({ message: "logout successfully" });
};

// reset password controller
const reSetpasswordControler = async (req, res) => {
  const token = TokenGenerator();
  console.log(token);
  res.send({ message: "chlgiya" });
};

export {
  signup,
  loginControler,
  logOutControler,
  reSetpasswordControler,
  googleControler,
};
