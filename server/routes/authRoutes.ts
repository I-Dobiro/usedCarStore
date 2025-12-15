import express from "express";
import { register, login, getCurrentUser } from "../controllers/authController";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/me", authenticate, getCurrentUser)

export default router;