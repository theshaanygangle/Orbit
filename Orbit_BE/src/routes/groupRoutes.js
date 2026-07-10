import express from "express";
import {
  createGroup,
  mainGroupRoute,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
  leaveGroup,
  deleteGroup,
} from "../controllers/groupController.js";

const groupRouter = express.Router();

//Endpoints
groupRouter.post("/create", createGroup);

groupRouter.get("/", mainGroupRoute);

groupRouter.put("/rename", renameGroup);
groupRouter.put("/add", addUserToGroup);
groupRouter.put("/remove", removeUserFromGroup);
groupRouter.put("/leave", leaveGroup);

groupRouter.delete("/", deleteGroup);

export default groupRouter;
