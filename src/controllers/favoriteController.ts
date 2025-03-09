import { Request, Response } from "express"
import { Job } from "../types"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// CREATE
export async function createFavorite(req: Request, res: Response) {
    const favorite: Job = req.body;
    let userId: number;
    // TODO: When we have authentication in place (JWT) we'll get userId from there

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);
        favorite.user_id = userId;

        const favoriteFound = await prisma.favorites.findUnique({
            where: {
                id: favorite.id,
                user_id: favorite.user_id,
            },
        });

        if(favoriteFound) {
            res.status(409).json({message: "Favorite already exists"});
            return;
        }

        const result = await prisma.favorites.create({
            data: favorite,
        })

        res.status(201).json({message: "Favorite created successfully", result: result});
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

        const favorites = await prisma.favorites.findMany({
            where: {
                user_id: {
                    equals: userId,
                },
            },
        })
        if (favorites.length === 0) {
            res.status(404).json({message: "Favorites not found"});
            return;
        }
        res.status(200).json({message: "Favorites fetched successfully", favorites: favorites});
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

        const favorite = await prisma.favorites.findUnique({
            where: {
                user_id: userId,
                id: id,
            },
        });

        if(!favorite) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        res.status(200).json({message: "Favorite fetched successfully", favorite: favorite})
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// UPDATE
export async function updateFavorite(req: Request, res: Response) {
    const favorite: Job = req.body;
    let userId: number;         // TODO: replace with auth-hantering

    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);
        favorite.user_id = userId;

        const foundFavorite = await prisma.favorites.findUnique({
            where: {
                id: favorite.id,
                user_id: userId,
            },
        });
        
        if(!foundFavorite) {
            res.status(404).json({error: "Favorite not found"});
            return;
        }
        if(favorite.id !== foundFavorite.id) {
            res.status(400).json({message: "Id cannot be updated"});
            return;
        }

        const updatedFavorite = await prisma.favorites.update({
            where: {
                id: favorite.id,
                user_id: favorite.user_id,
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

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({message: "Missing or invalid web token"});
            return;
        }

        userId = parseInt(authHeader.split(" ")[1]);

        const foundFavorite = await prisma.favorites.findUnique({
            where: {
                id: id,
                user_id: userId,
            },
        });
        
        if(!foundFavorite) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        const deletedFavorite = await prisma.favorites.delete({
            where: {
                id: id,
                user_id: userId,
            },
        })

        res.status(200).json({message: "Favorite deleted successfully", deletedFavorite: deletedFavorite});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};
