import userModel from "../models/userModel.js";
import { comparedPassword, hashPassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) return res.send({ message: "name is required" });
    if (!email) return res.send({ message: "email is required" });
    if (!phone) return res.send({ message: "phone is required" });
    if (!address) return res.send({ message: "address is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Save new user
    const user = await new userModel({
      name,
      email,
      password: hashed,
      phone,
      address,
    }).save();

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "message in registration",
      message,
    });
  }
};

// post
// loginController inside authController.js

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid email or password" });
    }

    // 2. Find user
    const user = await userModel.findOne({ email }); //  you had "existingUser", but then used "user"
    if (!user) {
      return res.status(404).send({ message: "Email not registered" });
    }

    // 3. Compare password
    const match = await comparedPassword(password, user.password);
    if (!match) {
      return res.status(200).send({ message: "Incorrect password" });
    }

    // 4. Generate JWT token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_TOKEN || "defaultSecret", // fix here: use valid environment variable
      { expiresIn: "7d" }
    );

    // 5. Success response
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role
      },
      token,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "message in login",
      message,
    });
  }
};


// testController

export const testController = (req, res) => {
  res.send("test route");
};

export const isAdmins = (req, res) => {
  res.send("this is admin page");
};
