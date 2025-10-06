import { movementsRepository } from "../repositories/movementsRepository";
import { userRepository } from "../repositories/userRepository";
import { MovementWithUser } from "../types/movements";

export const movementsService = {
    getAllMovements: async (): Promise<MovementWithUser[]> => {
    return movementsRepository.findAll();
  },
    createMovement: async (data: { concept: string; amount: number; userId: string; date: Date }) => {

        const userExists = await userRepository.findUnique(data.userId);
        if (!userExists) {
            throw new Error("User not found");
        }

        return await movementsRepository.create(data);
    },
    deleteMovement: async (id: string) => {
        if (!id) throw new Error("Movement ID is required");
        return await movementsRepository.delete(id);
    }
}