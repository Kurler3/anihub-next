// prisma.ts
import { PrismaClient } from '@prisma/client'

interface IGlobal {
    prisma?: PrismaClient
}

let prisma: PrismaClient

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient()
// } else {
    if (!(global as IGlobal).prisma) {
        ;(global as IGlobal).prisma = new PrismaClient()
    }
    prisma = (global as IGlobal).prisma!
// }

// async function cleanup() {
//     if (process.env.NODE_ENV !== 'production') {
//         await prisma.$disconnect()
//     }
// }

// process.on('beforeExit', cleanup)
// process.on('SIGINT', cleanup)

export default prisma
