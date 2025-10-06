import { Prisma } from "@prisma/client";

export type MovementWithUser = Prisma.MovementsGetPayload<{
    include: { user: true }
}>;