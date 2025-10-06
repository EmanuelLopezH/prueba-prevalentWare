import {prisma} from "@/lib/prisma";
import { MovementWithUser } from "../types/movements";

export const movementsRepository = {
    findAll: async (): Promise<MovementWithUser[]> => prisma.movements.findMany({
        include: { user: true },
        orderBy: { date: 'desc' }
    }),
    create: async (data: { concept: string; amount: number; userId: string; date: Date}) => {
        return prisma.movements.create({ data: {
            concept: data.concept,
            amount: data.amount,
            date: data.date,
            userId: data.userId
        },
            include: { user: true }
         });
    },
    delete: async (id: string) => {
        return prisma.movements.delete({ where: { id } });
    }
}