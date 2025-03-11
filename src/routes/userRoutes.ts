import express from "express"
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authorize";

const router = express.Router()

// CRUD for users
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
