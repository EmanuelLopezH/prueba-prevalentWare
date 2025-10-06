import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {prisma} from "@/lib/prisma"
import { User } from "@prisma/client";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    },
  },
  session: {
    strategy: 'database',
    maxAge: 2 * 60 * 60,
    updateAge: 10 * 60,
    extend: {
      user: async (user : User) => {
        return {
          ...user,
          role: user.role || 'Admin'
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false
      }
    }
  }
});

export type Session = typeof auth.$Infer.Session;