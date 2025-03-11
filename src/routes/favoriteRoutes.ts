import express from "express";
import { createFavorite, getFavorites, getFavorite, updateFavorite, deleteFavorite } from "../controllers/favoriteController"
import { authMiddleware } from "../middleware/authorize";

const router = express.Router();

// CRUD for favorites
router.post("/", authMiddleware, createFavorite);
router.get("/", authMiddleware, getFavorites);
router.get("/:id", authMiddleware, getFavorite);
router.put("/:id", authMiddleware, updateFavorite);
router.delete("/:id", authMiddleware, deleteFavorite);

export default router;

