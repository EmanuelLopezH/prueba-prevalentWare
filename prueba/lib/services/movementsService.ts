import { movementsRepository } from "../repositories/movementsRepository";
import { userRepository } from "../repositories/userRepository";

export const movementsService = {
    getAllMovements: async () => {
        return await movementsRepository.findAll();
    },
    createMovement: async (data: { concept: string; amount: number; userId: string }) => {

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