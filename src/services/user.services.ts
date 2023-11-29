import prisma from "@/lib/prisma"



export const getUserById = async (id: string) => {

    const user = await prisma.user.findUnique({
        where: {
            id,
        }
    })

    return user;

}