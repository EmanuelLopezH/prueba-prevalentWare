import { NextApiRequest, NextApiResponse } from "next";
import { movementsService } from "@/lib/services/movementsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "DELETE") {
        try {
            if (!id || typeof id !== "string") {
                return res.status(400).json({ message: "Invalid movement ID" });
            }
            const deletedMovement = await movementsService.deleteMovement(id);
            return res.status(200).json(deletedMovement);
        } catch (error: unknown) {
            let message = "Internal Server Error";
            if (error instanceof Error) {
                message = error.message;
            }
            return res.status(500).json({ message });
        }
    }

    return res.status(405).json({ message: "Method Not Allowed" })
}