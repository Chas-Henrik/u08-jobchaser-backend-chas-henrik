import { Request, Response } from "express"
import { User } from "../types";


// CREATE
export const createUser = async (req: Request, res: Response) => {
    const user: User = req.body;

    try {

    } catch(error) {

        res.status(500).json({message: "Internal server error", error: error});
    }
};

// READ ONE
export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
}

// READ MANY
export const getUsers = async (req: Request, res: Response) => {

    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};

// UPDATE 
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const user: User = req.body;
    
    try {

    } catch(error) {
        res.status(500).json({message: "Internal server error", error: error});
    }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {

        } catch(error) {
            res.status(500).json({error: "Internal server error"});
        }
};

