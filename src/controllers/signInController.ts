import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

function createJWT(id: string, email: string, secret: string): string {
    return jwt.sign(
        {id: id, email: email},
        secret,
        { expiresIn: "24h" }
    ) 
}

export async function signIn(req: Request, res: Response) {
    try {
        const {email, password} = req.body;
    
        // Check that user exists
        const dbUser = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
    
        if(!dbUser) {
            res.status(404).json({ message: "User not found"})
            return;
        }
    
        // Check that password hash matches the hash in the database 
        const isPasswordValid = await bcrypt.compare(password, dbUser.password)
    
        if(!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials"});
            return;
        }

        // Check that JWT_SECRET is defined
        if(!process.env.JWT_SECRET) {
            res.status(500).json({ message: "JWT SECRET is not defined"})
            return;
        }

        // Create a JWT (JSON Web Token) for Authorized User
        const token = createJWT(dbUser.id, dbUser.email, process.env.JWT_SECRET);
        console.log(token);

        res.cookie('token', token, {
            maxAge: 15 * 60 * 1000, // 15 minutes
            httpOnly: true,     // Prevents client-side JavaScript from accessing the cookie
            secure: false,      // Ensures the browser only sends the cookie over HTTPS (disabled)
            sameSite: 'strict', // Protects against cross-site request forgery attacks
        });

        res.status(200).json({message: "User signed-in successfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};
