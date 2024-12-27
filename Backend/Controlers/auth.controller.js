import User from "../Model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).send("Something went wrong");
  }
};
