import express from "express";
import { logout, me } from "../controllers/authController.js"; // ✅ make sure this path exists
import { userAuthMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.get("/logout", userAuthMiddleware, logout);
authRouter.get("/me", userAuthMiddleware, me);

export default authRouter;
