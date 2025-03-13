import  {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface ProtectedRequest extends Request {
    user?: JwtPayload;
}

// Middleware 
export function authMiddleware(req: ProtectedRequest, res: Response, next: NextFunction) {
    // Check that req.cookies is defined
    if (!req.cookies) {
        res.status(401).json({message: "Un-authorized, missing Cookies header"});
        return;
    }

    const token = req.cookies.token;

    if(!token) {
        res.status(401).json({ message: "Un-authorized, missing or invalid JSON Web token"});
        return;
    }

    // Check JWT SECRET is defined
    if(!process.env.JWT_SECRET) {
        res.status(500).json({ message: "JWT SECRET is not defined"})
        return;
    }

    // Check that token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
        req.user = decoded;
        console.log("req.user", req.user);
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ message: "Un-authorized, invalid token"})
    }
}

export function authSignOutMiddleware(req: ProtectedRequest, res: Response, next: NextFunction) {
    // Check that req.cookies is defined
    if (!req.cookies) {
        res.status(401).json({message: "Un-authorized, missing Cookies header"});
        return;
    }

    // Get JWT from Cookies header
    const token = req.cookies.token;

    // Check if user is already signed out
    if(!token) {
        res.status(200).json({message: "User signed-out successfully"});
        return;
    }

    // Check JWT SECRET is defined
    if(!process.env.JWT_SECRET) {
        res.status(500).json({ message: "JWT SECRET is not defined"})
        return;
    }

    // Check that token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
        req.user = decoded;
        console.log("req.user", req.user);
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ message: "Un-authorized, invalid token"})
    }
}