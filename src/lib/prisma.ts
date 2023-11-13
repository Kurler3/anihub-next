import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export const getPrismaClient = () => {
    if (prisma) return prisma
    prisma = new PrismaClient()
    return prisma
}
