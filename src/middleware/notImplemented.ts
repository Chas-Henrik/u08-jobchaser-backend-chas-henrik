import { Request, Response, NextFunction } from "express"

export async function notImplemented(req: Request, res: Response, next: NextFunction) {
    res.status(501).json({message: "Not Implemented"});
};
