import { userRepository } from "@/lib/repositories/userRepository";

export const userService = {
    getAllUsers: async () => {
    return await userRepository.findAll();
    },
    createUser: async (data: { name: string; email: string; phone?: number }) => {
    return await userRepository.create(data);
  },
    updateUser: async (id: string, data: Partial<{ name: string; role: string }>) => {
    return await userRepository.update(id, data);
    },
    deleteUser: async (id: string) => {
        return await userRepository.delete(id);
    }
}