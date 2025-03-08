import { Request, Response } from "express"
import { Job } from "../types"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// CREATE
export async function createFavorite(req: Request, res: Response) {
    const favorite: Job = req.body;
    // TODO: When we have authentication in place (JWT) we'll get userId from there

    try {
        const post = await prisma.favorites.create({
            data: favorite,
        })

        res.status(201).json({message: "Post created successfully", post: post});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// READ MANY
export async function getFavorites(req: Request, res: Response) {
    const { userId } = req.body;    // TODO: replace with auth-hantering

    try {
        const favorites = await prisma.favorites.findMany({
            where: {
                user_id: {
                    equals: parseInt(userId),
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
    const { userId } = req.body;   // TODO: replace with auth-hantering
    const { id } = req.params;

    try {
        const favorite = await prisma.favorites.findUnique({
            where: {
                user_id: parseInt(userId),
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
    const favorite: Job = req.body;  // TODO: replace with auth-hantering

    try {
        const foundFavorite = await prisma.favorites.findUnique({
            where: {
                id: favorite.id,
                user_id: favorite.user_id,
            },
        });
        
        if(!foundFavorite) {
            res.status(404).json({error: "Favorite not found"});
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
    const { userId } = req.body;   // TODO: replace with auth-hantering
    const { id } = req.params;

    try {
        const foundFavorite = await prisma.favorites.findUnique({
            where: {
                id: id,
                user_id: parseInt(userId),
            },
        });
        
        if(!foundFavorite) {
            res.status(404).json({message: "Favorite not found"});
            return;
        }

        const deletedFavorite = await prisma.favorites.delete({
            where: {
                id: id,
                user_id: parseInt(userId),
            },
        })

        res.status(200).json({message: "Favorite deleted successfully", deletedFavorite: deletedFavorite});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};
