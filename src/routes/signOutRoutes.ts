import express from "express"
import { signOut } from "../controllers/signOutController";
import { authSignOutMiddleware } from "../middleware/authorize";
import { notImplemented } from "../middleware/notImplemented";

const router = express.Router()

// CRUD for users
router.post("/", authSignOutMiddleware, signOut);
router.get("/", notImplemented);
router.put("/", notImplemented);
router.delete("/", notImplemented);
router.patch("/", notImplemented);

export default router;
