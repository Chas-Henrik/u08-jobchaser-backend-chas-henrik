import { Request, Response } from "express"
import { User } from "../types";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

const prisma = new PrismaClient();

export async function signUp(req: Request, res: Response) {
    try {
        const user: User = req.body;
        
        // Check if user already exists
        const userFound = await prisma.users.findUnique({
            where: {
                email: user.email,
            },
        });

        if(userFound) {
            res.status(409).json({message: "User already exists"});
            return;
        }

        // Parameter validation
        const date = (user.dateOfBirth)? new Date(user.dateOfBirth): null;
        const currentDate = new Date();
        if(date && date > currentDate) {
            res.status(400).json({message: "Date of Birth cannot be in the future"});
            return;
        }

        // Create password hash
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)

        // Store User in DB
        user.password = hashedPassword;
        const result = await prisma.users.create({
            data: user,
        })

        res.status(201).json({message: "User created successfully", result: result});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};

