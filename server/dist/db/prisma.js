"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const config_1 = require("./config");
const globalForPrisma = globalThis;
const createPrismaClient = () => new client_1.PrismaClient({
    datasources: {
        db: {
            url: config_1.dbConfig.databaseUrl,
        },
    },
});
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
