import { requireAuth } from "@/lib/requireAuth";
import { userService } from "@/lib/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 *
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await requireAuth(req, res);
      if (!session) return

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
