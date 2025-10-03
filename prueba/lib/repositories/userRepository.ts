import { prisma } from "@/lib/prisma";

export const userRepository = {
    findAll: async () => prisma.user.findMany(),
    findUnique: async (id: string) => {
        return prisma.user.findUnique({ where: { id } });
    },
    create: async (data: { name: string; email: string; phone?: number }) => {
    return prisma.user.create({ data });
  },
    update: async ( id: string, data: Partial<{name: string, role: string}> ) => {
        return prisma.user.update({
            where: { id },
            data,});
    },
    delete: async (id: string) => {
        return prisma.user.delete({ where: { id } });
    }
};