import { Request, Response } from "express"
import { User, Job } from "../types"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// CREATE
export async function createFavorite(req: Request, res: Response) {
    const { userId, ...job }: { userId: number, job: Job } = req.body;
    // TODO: When we have authentication in place (JWT) we'll get userId from there

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};

// READ MANY
export async function getFavorites(req: Request, res: Response) {
    const { userId } = req.body;    // TODO: replace with auth-hantering

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};

// READ ONE
export async function getFavorite(req: Request, res: Response) {
    const { userId } = req.body;   // TODO: replace with auth-hantering
    const { id } = req.params;

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};

// UPDATE
export async function updateFavorite(req: Request, res: Response) {
    const { userId, ...job }: { userId: number, job: Job } = req.body;
    const { id } = req.params;   // TODO: replace with auth-hantering

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};

// DELETE
export async function deleteFavorite(req: Request, res: Response) {
    const { userId } = req.body;   // TODO: replace with auth-hantering
    const { id } = req.params;

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};
