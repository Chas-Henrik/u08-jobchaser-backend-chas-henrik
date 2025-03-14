import express from "express"
import { signUp } from "../controllers/signUpController";
import { notImplemented } from "../middleware/notImplemented";

const router = express.Router()

// CRUD for users
router.post("/", signUp);
router.get("/", notImplemented);
router.put("/", notImplemented);
router.delete("/", notImplemented);
router.patch("/", notImplemented);

export default router;