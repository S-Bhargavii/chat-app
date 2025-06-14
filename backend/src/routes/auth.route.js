import express from "express"
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router()

// what code must be executed at the signup endpoint
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;