import { NextApiRequest, NextApiResponse } from "next";
import { movementsService } from "@/lib/services/movementsService";
import { requireAuth } from "@/lib/requireAuth";

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Endpoints para gestionar movimientos
 */

/**
 * @swagger
 * /movements:
 *   get:
 *     summary: Obtener todos los movimientos
 *     tags: [Movements]
 *     responses:
 *       200:
 *         description: Lista de movimientos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movement'
 *
 *   post:
 *     summary: Crear un nuevo movimiento
 *     tags: [Movements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovementInput'
 *     responses:
 *       201:
 *         description: Movimiento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movement'
 *       400:
 *         description: Faltan campos obligatorios
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "m1"
 *         concept:
 *           type: string
 *           example: "Compra supermercado"
 *         amount:
 *           type: number
 *           example: 150.75
 *         userId:
 *           type: string
 *           example: "u1"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-10-05T20:00:00Z"
 *
 *     MovementInput:
 *       type: object
 *       required:
 *         - concept
 *         - amount
 *         - userId
 *         - date
 *       properties:
 *         concept:
 *           type: string
 *           example: "Pago de servicios"
 *         amount:
 *           type: number
 *           example: 200.5
 *         userId:
 *           type: string
 *           example: "u1"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-10-05T20:00:00Z"
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'GET') {
        const movements = await movementsService.getAllMovements();
        return res.status(200).json(movements);
    }
    
    const session = await requireAuth(req, res);
    if (!session) return
    
    if (req.method === 'POST') {
        const { concept, amount, date, userId } = req.body;
        try{
            if (!concept || !amount || !userId || !date) {
                return res.status(400).json({ message: "Concept, amount, date and userId are required" });
            }

            const newMovement = await movementsService.createMovement({
                concept,
                amount: Number(amount),
                userId,
                date: new Date(date)
            });
            return res.status(201).json(newMovement);
        } catch (error: unknown) {
                let message = "Internal Server Error";
                if (error instanceof Error) {
                    message = error.message;
                }
                return res.status(500).json({ message });
            }           
    }
    
    return res.status(405).json({ message: "Method Not Allowed" }) // Method Not Allowed;
}