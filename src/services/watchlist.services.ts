import prisma from '@/lib/prisma'
import { IGetWatchlistsProps, IWatchList } from '@/types'

// Get watch lists
export const getWatchLists = async ({ q, page, user }: IGetWatchlistsProps) => {
    const perPage = 10 // Adjust as needed

    // Build the base query
    const query = {
        where: {
            OR: [
                {
                    ownerId: user.id,
                },
                {
                    watchlistUsers: {
                        some: {
                            userId: user.id,
                        },
                    },
                },
            ],
            ...(q
                ? {
                      name: {
                          contains: q,
                      },
                  }
                : {}),
        },
        include: {
            watchlistUsers: {
                include: {
                    user: true,
                },
            },
            watchlistAnime: true,
            owner: true,
        },
        skip: (page - 1) * perPage,
        take: perPage + 1,
    }

    // Get the watchlists
    const watchlists = await prisma.watchList.findMany(query)

    // Determine pagination details
    const hasNextPage = watchlists.length > perPage
    const lastVisiblePage = hasNextPage ? page! : page || 1 // If there's a next page, the current page is the last visible page

    // Remove the extra item used for determining next page
    if (hasNextPage) {
        watchlists.pop()
    }

    // Pagination
    const pagination = {
        last_visible_page: lastVisiblePage,
        has_next_page: hasNextPage,
        items: {
            count: watchlists.length,
            total: watchlists.length,
            per_page: perPage,
        },
    }

    // Return
    return {
        watchlists: watchlists as IWatchList[],
        pagination,
    }
}
