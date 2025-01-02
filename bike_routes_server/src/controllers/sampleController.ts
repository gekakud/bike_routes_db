import { Request, Response } from "express";
import { createSampleData } from "../services/sampleService";

export const getSample = (req: Request, res: Response): void => {
    res.status(200).json({ message: "Sample GET endpoint" });
};

export const createSample = async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const result = await createSampleData(data);

        res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error occurred" });
        }
    }
};
