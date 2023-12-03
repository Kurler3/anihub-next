import prisma from '@/lib/prisma'
import { ISearchUsersPagination, ISearchUsersResponse } from '@/types'

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            followers: true,
            following: true,
            posts: {
                include: {
                    likes: true,
                    dislikes: true,
                },
            },
            watchlists: {
                include: {
                    watchlistAnime: true,
                },
            },
            followerRequests: true,
        },
    })

    return user
}

export async function searchUsers({
    q,
    page,
}: {
    q?: string
    page?: number // Make page parameter optional
}): Promise<ISearchUsersResponse> {
    try {
        // Validate and set default values for q and page
        const searchQuery = typeof q === 'string' ? q : null
        const pageNumber = typeof page === 'number' ? page : 1 // Default to 1 if undefined

        const perPage = 10 // Adjust as needed

        // Prisma query to fetch users based on search and pagination
        const usersQuery = {
            where: searchQuery
                ? {
                      OR: [{ username: { contains: searchQuery } }, { email: { contains: searchQuery } }],
                  }
                : undefined,
            take: perPage,
            skip: perPage * (pageNumber - 1),
        }

        const users = await prisma.user.findMany(usersQuery)

        // Count total users (without pagination) for calculating pagination information
        const totalUsersCount = await prisma.user.count({
            where: searchQuery
                ? {
                      OR: [{ username: { contains: searchQuery } }, { email: { contains: searchQuery } }],
                  }
                : undefined,
        })

        // Calculate pagination information
        const lastVisiblePage = Math.ceil(totalUsersCount / perPage)
        const hasNextPage = pageNumber < lastVisiblePage

        const pagination: ISearchUsersPagination = {
            last_visible_page: lastVisiblePage,
            has_next_page: hasNextPage,
            items: {
                count: users.length,
                total: totalUsersCount,
                per_page: perPage,
            },
        }

        const apiResponse: ISearchUsersResponse = {
            users,
            pagination: pagination,
        }

        return apiResponse
    } catch (error) {
        console.error(error)
        throw new Error('Internal Server Error')
    }
}
