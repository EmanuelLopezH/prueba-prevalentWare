
import { userService } from "@/lib/services/userService";
import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/requireAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const session = await requireAuth(req, res);
    if (!session) return

    if (req.method === 'GET'){
        const users = await userService.getAllUsers();
        return res.status(200).json(users);    
    }

    if (req.method === "POST") {
    try {
      const { name, email, phone } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
      }

      const newUser = await userService.createUser({
        name,
        email,
        phone: phone ? Number(phone) : undefined, // lo forzamos a número
      });

      return res.status(201).json(newUser);
    } catch (error: unknown) {
  let message = "Internal Server Error";
  if (error instanceof Error) {
    message = error.message;
  }
  return res.status(500).json({ message });
    }
  }

    return res.status(405).json({message: "Method Not Allowed"}) // Method Not Allowed
}
