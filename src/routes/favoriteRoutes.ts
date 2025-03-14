import express from "express";
import { createFavorite, getFavorites, getFavorite, updateFavorite, deleteFavorite } from "../controllers/favoriteController"
import { authMiddleware } from "../middleware/authorize";
import { notImplemented } from "../middleware/notImplemented";

const router = express.Router();

// CRUD for favorites
router.post("/", authMiddleware, createFavorite);
router.get("/", authMiddleware, getFavorites);
router.put("/", notImplemented);
router.delete("/", notImplemented);
router.patch("/", notImplemented);

router.post("/:id", notImplemented);
router.get("/:id", authMiddleware, getFavorite);
router.put("/:id", authMiddleware, updateFavorite);
router.delete("/:id", authMiddleware, deleteFavorite);
router.patch("/:id", notImplemented);

export default router;

