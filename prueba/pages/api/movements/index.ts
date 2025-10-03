/**
 * @swagger
 * /api/movements:
 *   get:
 *     summary: Obtiene todos los movimientos
 *     responses:
 *       200:
 *         description: Lista de movimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movement'
 *   post:
 *     summary: Crea un nuevo movimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovementInput'
 *     responses:
 *       201:
 *         description: Movimiento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movement'
 *       400:
 *         description: Datos inválidos
 */

import { NextApiRequest, NextApiResponse } from "next";
import { movementsService } from "@/lib/services/movementsService";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const movements = await movementsService.getAllMovements();
        return res.status(200).json(movements);
    }

    if (req.method === 'POST') {
        const { concept, amount, userId } = req.body;
        try{
            if (!concept || !amount || !userId) {
                return res.status(400).json({ message: "Concept, amount, date and userId are required" });
            }

            const newMovement = await movementsService.createMovement({
                concept,
                amount: Number(amount),
                userId
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