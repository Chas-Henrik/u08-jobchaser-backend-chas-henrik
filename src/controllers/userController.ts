import { Request, Response } from "express"
import { User } from "../types";
import { PrismaClient } from '@prisma/client'
import { JwtPayload } from "jsonwebtoken"
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

const prisma = new PrismaClient();

interface ProtectedRequest extends Request {
    user?: JwtPayload;
}

// READ ONE
export async function getUser(req: ProtectedRequest, res: Response) {
    try {
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Find user
        const user = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }

        res.status(200).json(user);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
}

// UPDATE 
export async function updateUser(req: ProtectedRequest, res: Response) {
    const user: User = req.body;
    
    try {
        // Validate user object
        if(!user) {
            res.status(400).json({message: "User object is required"});
            return;
        }
        
        // Check if req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Find user to update
        const foundUser = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if(!foundUser) {
            res.status(404).json({message: "User not found"});
            return;
        }

        // Parameter validation
        if(user.email !== foundUser.email) {
            res.status(400).json({message: "Update of 'email' is not allowed"});
            return;
        }

        const date = (user.dateOfBirth)? new Date(user.dateOfBirth): null;
        const currentDate = new Date();
        if(date && date > currentDate) {
            res.status(400).json({message: "Date of Birth cannot be in the future"});
            return;
        }

        // Create password hash
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)

        // Update password hash
        user.password = hashedPassword;

        // Update user
        const updatedUser = await prisma.users.update({
            where: {
                id: req.user.id,
            },
            data: user,
        })

        res.status(200).json({message: "User updated successfully", updatedUser: updatedUser});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

// DELETE
export async function deleteUser(req: ProtectedRequest, res: Response) {
        try {
            // Check if req.user is defined
            if(!req.user) {
                res.status(500).json({message: "req.user is not defined"});
                return;
            }

            // Find user to delete
            const foundUser = await prisma.users.findUnique({
                where: {
                    id: req.user.id,
                },
            });

            if(!foundUser) {
                res.status(404).json({message: "User not found"});
                return;
            }

            // Delete user
            const deletedUser = await prisma.users.delete({
                where: {
                    id: req.user.id,
                },
            })

            res.status(200).json({message: "User deleted successfully", deletedUser: deletedUser});
        } catch(error) {
            console.error(error);
            res.status(500).json({message: `Internal server error\n\n${error}`});
        }
};

