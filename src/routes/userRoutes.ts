import express from "express"
import { getUser, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authorize";
import { notImplemented } from "../middleware/notImplemented";
import { validateUser } from "../middleware/validators"

const router = express.Router()

// CRUD for users
router.post("/", notImplemented);
router.get("/", authMiddleware, getUser);
router.put("/", authMiddleware, validateUser, updateUser);
router.delete("/", authMiddleware, deleteUser);
router.patch("/", notImplemented);

export default router;
