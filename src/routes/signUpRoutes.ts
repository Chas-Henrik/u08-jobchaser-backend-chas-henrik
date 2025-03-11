import express from "express"
import { signUp } from "../controllers/signUpController";

const router = express.Router()

// CRUD for users
router.post("/", signUp);

export default router;