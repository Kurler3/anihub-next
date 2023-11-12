import { PrismaClient } from '@prisma/client'

var prisma: PrismaClient

export const getPrismaClient = () => {
    if (prisma) return prisma
    prisma = new PrismaClient()
    return prisma
}
