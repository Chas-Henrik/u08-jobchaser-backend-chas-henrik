import express from "express";
import { createFavorite, getFavorites, getFavorite, updateFavorite, deleteFavorites, deleteFavorite } from "../controllers/favoriteController"
import { authMiddleware } from "../middleware/authorize";
import { notImplemented } from "../middleware/notImplemented";
import { validateFavorite } from "../middleware/validators"

const router = express.Router();

// CRUD for favorites
router.post("/", authMiddleware, validateFavorite, createFavorite);
router.get("/", authMiddleware, getFavorites);
router.put("/", notImplemented);
router.delete("/", authMiddleware, deleteFavorites);
router.patch("/", notImplemented);

router.post("/:id", notImplemented);
router.get("/:id", authMiddleware, getFavorite);
router.put("/:id", authMiddleware, validateFavorite, updateFavorite);
router.delete("/:id", authMiddleware, deleteFavorite);
router.patch("/:id", notImplemented);

export default router;

