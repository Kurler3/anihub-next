import prisma from '@/lib/prisma'
import { AnimeItem, IGetWatchlistsProps, IWatchList, Pagination } from '@/types'

// Get watch lists
export const getWatchLists = async ({ q, page, user, roles }: IGetWatchlistsProps) => {
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
                            role: {
                                in: roles,
                            },
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
    const watchlists = await prisma.watchList.findMany({
        ...query,
        orderBy: {
            createdAt: 'desc',
        },
    })

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

// Get watchlist by id
export const getWatchlistById = async (id: number) => {
    return (await prisma.watchList.findUnique({
        where: {
            id,
        },
        include: {
            owner: true,
            watchlistUsers: {
                include: {
                    user: true,
                },
            },
            watchlistAnime: true,
        },
    })) as IWatchList
}

// Filter and paginate watchlist animes
export const filterAndPaginateWatchlistAnimes = (
    animeList: AnimeItem[],
    q?: string,
    page?: number,
): { filteredAnimeList: AnimeItem[]; pagination: Pagination } => {
    // Filter by search term
    const filteredAnimeList = q
        ? animeList.filter((anime) => anime.title.toLowerCase().includes(q.toLowerCase()))
        : animeList

    // Paginate
    const perPage = 10 // Number of items per page
    const totalItems = filteredAnimeList.length
    const totalPages = Math.ceil(totalItems / perPage)
    const currentPage = page || 1

    const startIdx = (currentPage - 1) * perPage
    const endIdx = startIdx + perPage
    const paginatedAnimeList = filteredAnimeList.slice(startIdx, endIdx)

    // Pagination object
    const pagination: Pagination = {
        last_visible_page: totalPages,
        has_next_page: currentPage < totalPages,
        items: {
            count: paginatedAnimeList.length,
            total: totalItems,
            per_page: perPage,
        },
    }

    return { filteredAnimeList: paginatedAnimeList, pagination }
}
