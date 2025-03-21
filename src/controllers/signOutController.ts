import { Request, Response } from "express"
import { PrismaClient } from '@prisma/client'
import { JwtPayload } from "jsonwebtoken"

const prisma = new PrismaClient();

interface ProtectedRequest extends Request {
    user?: JwtPayload;
}

export async function signOut(req: ProtectedRequest, res: Response) {
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

        res.clearCookie('token');

        res.status(200).json({message: "User signed-out successfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: `Internal server error\n\n${error}`});
    }
};
