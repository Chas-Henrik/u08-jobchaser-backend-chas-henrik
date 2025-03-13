import { Request, Response } from "express"
import { Favorite } from "../types"
import { PrismaClient } from '@prisma/client'
import jwt, { JwtPayload } from "jsonwebtoken"

const prisma = new PrismaClient();

interface ProtectedRequest extends Request {
    user?: JwtPayload;
}

// CREATE
export async function createFavorite(req: ProtectedRequest, res: Response) {
    const favorite: Favorite = req.body;

    try {
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Check that user exists
        const userFound = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!userFound) {
            res.status(401).json({message: "User not found"});
            return;
        }

        // Parameter validation
        if(!favorite) {
            res.status(400).json({message: "Favorite object is required"});
            return;
        }

        if(!favorite.id) {
            res.status(400).json({message: "Favorite 'id' is required"});
            return;
        }
        
        // Check if favorite already exists for user
        const usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: req.user.id,
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
                user_id: req.user.id,
                favorite_id: favorite.id,
            },
        });

        res.status(201).json({message: "Favorite created successfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

// READ MANY
export async function getFavorites(req: ProtectedRequest, res: Response) {
    try {
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Check that user exists
        const userFound = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!userFound) {
            res.status(401).json({message: "User not found"});
            return;
        }
        
        // Get all favorites mappings for user
        const usersFavoritesFound = await prisma.users_favorites.findMany({
            where: {
                user_id: {
                    equals: req.user.id,
                },
            },
        });

        // Get all favorites for user
        const favoritesFound = await prisma.favorites.findMany({
            where: {
                id: {
                    in: usersFavoritesFound.map(favorite => favorite.favorite_id),
                },
            },
        });

        res.status(200).json(favoritesFound);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

// READ ONE
export async function getFavorite(req: ProtectedRequest, res: Response) {
    const { id } = req.params;

    try {
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Check that user exists
        const userFound = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!userFound) {
            res.status(401).json({message: "User not found"});
            return;
        }

        // Get favorite mapping for user
        const usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: req.user.id,
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
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

// UPDATE
export async function updateFavorite(req: ProtectedRequest, res: Response) {
    const favorite: Favorite = req.body;
    const { id } = req.params;
    try {
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Check that user exists
        const userFound = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!userFound) {
            res.status(401).json({message: "User not found"});
            return;
        }

        // Parameter validation
        if(!favorite) {
            res.status(400).json({message: "Favorite object is required"});
            return;
        }

        if(!favorite.id) {
            res.status(400).json({message: "Favorite 'id' is required"});
            return;
        }

        // Get favorite mapping for user
        const usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: req.user.id,
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
            res.status(400).json({message: "Update of 'id' is not allowed"});
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
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

// DELETE
export async function deleteFavorite(req: ProtectedRequest, res: Response) {
    const { id } = req.params;

    try {
        let usersFavoritesFound;
        
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Check that user exists
        const userFound = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!userFound) {
            res.status(401).json({message: "User not found"});
            return;
        }

        // Check if favorite already exists for user
        usersFavoritesFound = await prisma.users_favorites.findFirst({
            where: {
                user_id: req.user.id,
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
                user_id: req.user.id,
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
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};
