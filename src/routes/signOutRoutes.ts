import express from "express"
import { signOut } from "../controllers/signOutController";
import { authMiddleware } from "../middleware/authorize";

const router = express.Router()

// CRUD for users
router.post("/", authMiddleware, signOut);

export default router;
