import express from "express"
import { signIn } from "../controllers/signInController";
import { notImplemented } from "../middleware/notImplemented";

const router = express.Router()

// CRUD for users
router.post("/", signIn);
router.get("/", notImplemented);
router.put("/", notImplemented);
router.delete("/", notImplemented);
router.patch("/", notImplemented);

export default router;