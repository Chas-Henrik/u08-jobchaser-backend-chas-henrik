import express from "express"
import { getUser, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authorize";

const router = express.Router()

// CRUD for users
router.get("/", authMiddleware, getUser);
router.put("/", authMiddleware, updateUser);
router.delete("/", authMiddleware, deleteUser);

export default router;
