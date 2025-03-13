import express from "express"
import { signOut } from "../controllers/signOutController";
import { authSignOutMiddleware } from "../middleware/authorize";

const router = express.Router()

// CRUD for users
router.post("/", authSignOutMiddleware, signOut);

export default router;
