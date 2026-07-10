import express, { response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../models/userModel.js";

dotenv.config();

//Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Credentials",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }

    // Create New User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const users = new userModel({ name, email, password: hashedPassword });
    await users.save();

    //Generate Token
    const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    // Send token using cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Registration Done
    res.json({
      success: true,
      message: "User got Registered!",
      // optional — to see token in Postman for debugging
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Missing Credentials!",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid User!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong Password!",
      });
    }

    //Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    // Send token using cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "Logged In!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return res.json({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const me = async (req, res) => {
  const user = await user.findById(req.params.id).select("-password");
  try {
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
