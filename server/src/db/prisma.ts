import { PrismaClient } from "@prisma/client";
import { dbConfig } from "./config";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: dbConfig.databaseUrl,
      },
    },
  });

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type PrismaClientInstance = PrismaClient;
