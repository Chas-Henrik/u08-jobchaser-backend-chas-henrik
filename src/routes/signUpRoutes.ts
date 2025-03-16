import express from "express"
import { signUp } from "../controllers/signUpController";
import { notImplemented } from "../middleware/notImplemented";
import { validateUser } from "../middleware/validators"

const router = express.Router()

// CRUD for users
router.post("/", validateUser, signUp);
router.get("/", notImplemented);
router.put("/", notImplemented);
router.delete("/", notImplemented);
router.patch("/", notImplemented);

export default router;