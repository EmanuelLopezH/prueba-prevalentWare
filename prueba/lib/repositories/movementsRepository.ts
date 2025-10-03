import {prisma} from "@/lib/prisma";

export const movementsRepository = {
    findAll: async () => prisma.movements.findMany(),
    create: async (data: { concept: string; amount: number; userId: string }) => {
        return prisma.movements.create({ data,
            include: { user: true }
         });
    },
    delete: async (id: string) => {
        return prisma.movements.delete({ where: { id } });
    }
}