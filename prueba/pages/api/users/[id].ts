import { userService } from "@/lib/services/userService";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

    if (req.method === "PUT") {
        const body = req.body;
        const updated = await userService.updateUser(id as string, body);
        return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
    try {
      if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const deletedUser = await userService.deleteUser(id);
      return res.status(200).json(deletedUser);
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
