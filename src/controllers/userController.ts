import { Request, Response } from "express"
import { User } from "../types";
import { PrismaClient } from '@prisma/client'
import { JwtPayload } from "jsonwebtoken"

const prisma = new PrismaClient();

interface ProtectedRequest extends Request {
    user?: JwtPayload;
}

// READ MANY
export async function getUsers(req: Request, res: Response) {

    try {
        const users = await prisma.users.findMany();

        res.status(200).json(users);
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

// READ ONE
export async function getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id,
            },
        });

        if(!user) {
            res.status(401).json({message: "User not found"});
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
    const { id } = req.params; 
    const user: User = req.body;
    
    try {
        // Assure that req.user is defined
        if(!req.user) {
            res.status(500).json({message: "req.user is not defined"});
            return;
        }

        // Don't allow user to update other users
        if(req.user.id !== id) {
            res.status(403).json({message: "Forbidden"});
            return;
        }

        // Find user to update
        const foundUser = await prisma.users.findUnique({
            where: {
                id: id,
            },
        });

        if(!foundUser) {
            res.status(401).json({message: "User not found"});
            return;
        }

        // Validate user data
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

        // Update user
        const updatedUser = await prisma.users.update({
            where: {
                id: id,
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
        const { id } = req.params;

        try {
            // Assure that req.user is defined
            if(!req.user) {
                res.status(500).json({message: "req.user is not defined"});
                return;
            }

            // Don't allow user to delete other users
            if(req.user.id !== id) {
                res.status(403).json({message: "Forbidden"});
                return;
            }

            // Find user to delete
            const foundUser = await prisma.users.findUnique({
                where: {
                    id: id,
                },
            });
            
            if(!foundUser) {
                res.status(401).json({message: "User not found"});
                return;
            }

            // Delete user
            const deletedUser = await prisma.users.delete({
                where: {
                    id: id,
                },
            })
    
            res.status(200).json({message: "User deleted successfully", deletedUser: deletedUser});
        } catch(error) {
            console.error(error);
            res.status(500).json({message: `Internal server error\n\n${error}`});
        }
};

