import  {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface ProtectedRequest extends Request {
    user?: JwtPayload;
}

// Middleware 
export function authMiddleware(req: ProtectedRequest, res: Response, next: NextFunction) {
    // Get token from Authorization Bearer in request header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({message: "Un-authorized, missing or invalid web token"});
        return;
    }

    const bearerToken = authHeader.split(" ")[1];

    // Check JWT SECRET is defined
    if(!process.env.JWT_SECRET) {
        res.status(500).json({ message: "JWT SECRET is not defined"})
        return;
    }

    // Check that token is valid
    try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET) as JwtPayload
        req.user = decoded;
        console.log("req.user", req.user);
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ message: "Un-authorized, invalid token"})
    }
}