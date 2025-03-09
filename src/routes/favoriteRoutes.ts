import express from "express";
import { createFavorite, getFavorites, getFavorite, updateFavorite, deleteFavorite } from "../controllers/favoriteController"

const router = express.Router();

// CRUD for favorites
router.post("/", createFavorite);
router.get("/", getFavorites);
router.get("/:id", getFavorite);
router.put("/:id", updateFavorite);
router.delete("/:id", deleteFavorite);

export default router;

