import { NextApiRequest, NextApiResponse } from "next";
import { movementsService } from "@/lib/services/movementsService";
import { requireAuth } from "@/lib/requireAuth";

/**
 * @swagger
 * /movements/{id}:
 *   delete:
 *     summary: Eliminar un movimiento por ID
 *     tags: [Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del movimiento a eliminar
 *     responses:
 *       200:
 *         description: Movimiento eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movement'
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