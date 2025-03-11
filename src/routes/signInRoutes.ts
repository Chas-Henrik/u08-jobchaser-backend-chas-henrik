import express from "express"
import { signIn } from "../controllers/signInController";

const router = express.Router()

// CRUD for users
router.post("/", signIn);

export default router;