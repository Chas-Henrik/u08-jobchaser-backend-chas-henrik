import { Request, Response } from "express"
import { User } from "../types";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// CREATE
export async function createUser(req: Request, res: Response) {
    const user: User = req.body;
    try {
        const userFound = await prisma.users.findUnique({
            where: {
                email: user.email,
            },
        });

        if(userFound) {
            res.status(409).json({message: "User already exists"});
            return;
        }

        const date = (user.dateOfBirth)? new Date(user.dateOfBirth): null;
        const currentDate = new Date();
        if(date && date > currentDate) {
            res.status(400).json({message: "Date of birth cannot be in the future"});
            return;
        }

        const result = await prisma.users.create({
            data: user,
        })

        res.status(201).json({message: "User created successfully", result: result});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// READ MANY
export async function getUsers(req: Request, res: Response) {

    try {
        const users = await prisma.users.findMany();

        res.status(200).json({message: "Users fetched successfully", users: users});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// READ ONE
export async function getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if(!user) {
            res.status(404).json({message: "User not found"});
            return;
        }

        res.status(200).json({message: "User fetched successfully", user: user});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
}

// UPDATE 
export async function updateUser(req: Request, res: Response) {
    const { id } = req.params; 
    const user: User = req.body;
    
    try {
        const foundUser = await prisma.users.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        
        if(!foundUser) {
            res.status(404).json({message: "User not found"});
            return;
        }
        if(user.email !== foundUser.email) {
            res.status(400).json({message: "Email cannot be updated"});
            return;
        }
        const date = (user.dateOfBirth)? new Date(user.dateOfBirth): null;
        const currentDate = new Date();
        if(date && date > currentDate) {
            res.status(400).json({message: "Date of birth cannot be in the future"});
            return;
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: parseInt(id),
            },
            data: user,
        })

        res.status(200).json({message: "User updated successfully", updatedUser: updatedUser});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
    }
};

// DELETE
export async function deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const foundUser = await prisma.users.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            
            if(!foundUser) {
                res.status(404).json({message: "User not found"});
                return;
            }

            const deletedUser = await prisma.users.delete({
                where: {
                    id: parseInt(id),
                },
            })
    
            res.status(200).json({message: "User deleted successfully", deletedUser: deletedUser});
        } catch(error) {
            console.error(error);
            res.status(500).json({message: `Internal server error\n${(error as Error).name}`, error: error});
        }
};

