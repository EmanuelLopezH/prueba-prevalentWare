
import { userService } from "@/lib/services/userService";
import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/requireAuth";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Campos requeridos faltantes (name, email)
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "u1"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           example: "juan@example.com"
 *         phone:
 *           type: number
 *           example: 3001234567
 *
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: "María Gómez"
 *         email:
 *           type: string
 *           example: "maria@example.com"
 *         phone:
 *           type: number
 *           example: 3209876543
 */

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
