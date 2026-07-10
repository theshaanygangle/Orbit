import express from "express";
import { getUserFromUserID } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUserFromUserID);

export default userRouter;
