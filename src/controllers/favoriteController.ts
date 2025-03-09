import { Request, Response } from "express"
import { Favorite } from "../types"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// CREATE
export async function createFavorite(req: Request, res: Response) {
    const favorite: Favorite = req.body;
    let userId: number;
    // TODO: When we have authentication in place (JWT) we'll get userId from there

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);
        
        // Check if favorite already exists for user
        const usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: userId,
                favorite_id: favorite.id,
            },
        });

        if(usersFavoritesFound) {
            res.status(409).json({message: "Favorite already exists"});
            return;
        }

        // Check if favorite already exists in favorites table
        const favoriteFound = await prisma.favorites.findUnique({
            where: {
                id: favorite.id,
            },
        });

        // Add favorite to favorite table (if not already there)
        if(!favoriteFound) {
            await prisma.favorites.create({
                data: favorite,
            });
        }

        // Add favorite to user
        await prisma.users_favorites.create({
            data: {
                user_id: userId,
                favorite_id: favorite.id,
            },
        });

        res.status(201).json({message: "Favorite created successfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// READ MANY
export async function getFavorites(req: Request, res: Response) {
    let userId: number;

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);

        // Get all favorites mappings for user
        const usersFavoritesFound = await prisma.users_favorites.findMany({
            where: {
                user_id: {
                    equals: userId,
                },
            },
        })

        if (usersFavoritesFound.length === 0) {
            res.status(404).json({message: "Favorites not found"});
            return;
        }

        // Get all favorites for user
        const favoritesFound = await prisma.favorites.findMany({
            where: {
                id: {
                    in: usersFavoritesFound.map(favorite => favorite.favorite_id),
                },
            },
        })

        res.status(200).json(favoritesFound);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// READ ONE
export async function getFavorite(req: Request, res: Response) {
    let userId: number;         // TODO: replace with auth-hantering
    const { id } = req.params;

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);

        // Get favorite mapping for user
        const usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: userId,
                favorite_id: id,
            },
        });

        if(!usersFavoritesFound) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        // Get favorite for user
        const favoriteFound = await prisma.favorites.findFirst({
            where: {
                id: id,
            },
        })

        if(!favoriteFound) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        res.status(200).json(favoriteFound)
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// UPDATE
export async function updateFavorite(req: Request, res: Response) {
    const favorite: Favorite = req.body;
    let userId: number;         // TODO: replace with auth-hantering
    const { id } = req.params;
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);

        // Get favorite mapping for user
        const usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: userId,
                favorite_id: id,
            },
        });

        if(!usersFavoritesFound) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        // Get favorite for user
        const favoriteFound = await prisma.favorites.findFirst({
            where: {
                id: id,
            },
        })

        if(!favoriteFound) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        if(favorite.id !== favoriteFound.id) {
            res.status(400).json({message: "Id cannot be updated"});
            return;
        }

        // Update favorite (ISSUE: This updates favorite for other users as well)
        const updatedFavorite = await prisma.favorites.update({
            where: {
                id: id,
            },
            data: favorite,
        })

        res.status(200).json({message: "Favorite updated successfully", updatedFavorite: updatedFavorite});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// DELETE
export async function deleteFavorite(req: Request, res: Response) {
    const { id } = req.params;
    let userId: number;         // TODO: replace with auth-hantering

    try {
        const authHeader = req.headers.authorization
        let usersFavoritesFound;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);

        // Check if favorite already exists for user
        usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: userId,
                favorite_id: id,
            },
        });
        
        if(!usersFavoritesFound) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        // Delete users_favorites entry
        await prisma.users_favorites.deleteMany({
            where: {
                user_id: userId,
                favorite_id: id,
            },
        });

        // Check if favorite is still in use by other users
        usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                favorite_id: id,
            },
        });

        if(!usersFavoritesFound) {
            // Delete favorite entry
            await prisma.favorites.delete({
                where: {
                    id: id,
                },
            });
        }

        res.status(200).json({message: "Favorite deleted successfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};
