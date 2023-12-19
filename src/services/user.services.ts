import prisma from '@/lib/prisma'
import { IFullUser, ISearchUsersResponse, IUser, IUserWithConnections, IUserWithFollowing, Pagination } from '@/types'

export const getUserById = async (id: string): Promise<IFullUser | null> => {
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
                orderBy: {
                    createdAt: 'desc',
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

    return user as unknown as IFullUser
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

        const pagination: Pagination = {
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

// Get social page people
export const getSocialPagePeople = async ({
    currentUser,
}: {
    currentUser?: IUserWithConnections
}): Promise<IUser[]> => {
    let usersList: IUser[]

    if (currentUser) {
        // Extract the followed users
        const followedUsers = currentUser.following.map((following) => following.followedUser)

        // If the current user is not following at least 10 users,
        // fill in the rest with users that the current user is not following
        if (followedUsers.length < 10) {
            const remainingUsersCount = 10 - followedUsers.length
            const remainingUsers = await prisma.user.findMany({
                take: remainingUsersCount,
                where: {
                    NOT: {
                        id: {
                            in: followedUsers.map((user) => user.id),
                        },
                    },
                },
            })

            usersList = [...followedUsers, ...remainingUsers]
        } else {
            usersList = followedUsers
        }
    } else {
        // If there is no current user, get the first 10 users from the database
        usersList = await prisma.user.findMany({
            take: 10,
        })
    }

    return usersList
}
