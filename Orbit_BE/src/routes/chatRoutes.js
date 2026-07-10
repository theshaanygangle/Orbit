import express from "express";
import { startUserChat } from "../controllers/chatController.js";

const chatRouter = express.Router();

//Endpoints
chatRouter.post("/", startUserChat);

export default chatRouter;
