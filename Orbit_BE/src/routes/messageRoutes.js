import express from "express";
import {
  sendMessage,
  getAllMessages,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/", getAllMessages);

export default messageRouter;
