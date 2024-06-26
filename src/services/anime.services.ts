import { JIKAN_API_URL } from '@/lib/constants'
import {
    Genre,
    GetAnimeGenresResponse,
    IAnimeComment,
    IAnimeLike,
    AnimeItem,
    ApiResponse,
    GetAnimeApiResponse,
    ISearchAnimeParams,
} from '@/types'
import prisma from '@/lib/prisma'
import { delay } from '@/lib/utils'

export const fetchAnimeData: (endpoint: string, params?: ISearchAnimeParams) => Promise<ApiResponse> = async (
    endpoint: string,
    params?: ISearchAnimeParams,
) => {
    // Build the query string
    const queryString = !params
        ? ''
        : Object.entries(params)
              .filter(([value]) => value)
              .map(([key, value]) => {
                  if (Array.isArray(value)) {
                      return `${key}=${value.join(',')}`
                  } else {
                      return `${key}=${value}`
                  }
              })
              .join('&')
    
    const res = await fetch(`${JIKAN_API_URL}/${endpoint}?${queryString}`, { next: { revalidate: 60 * 10 } })
  
    if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(`Error ANIME FETCH: ${errorMessage}`)
    }

    return (await res.json()) as ApiResponse
}

export const getAnimeGenres: () => Promise<Genre[]> = async () => {
    let genresResponse = await fetch(`${JIKAN_API_URL}/genres/anime?limit=14`)

    if (!genresResponse.ok) {
        const error = await genresResponse.json()

        if ('type' in error && error.type === 'RateLimitException') {
            // Wait 1 sec
            await delay(1)
            genresResponse = await fetch(`${JIKAN_API_URL}/genres/anime?limit=14`)
        } else {
            throw new Error(`Error fetching anime genres: ${error}`)
        }
    }

    const genres = (await genresResponse.json()) as GetAnimeGenresResponse

    return genres.data
}

export const getTopAnime: (params?: ISearchAnimeParams) => Promise<ApiResponse> = async (
    params?: ISearchAnimeParams,
) => {
    return await fetchAnimeData('top/anime', params)
}

export const searchAnimes: (params?: ISearchAnimeParams) => Promise<ApiResponse> = async (
    params?: ISearchAnimeParams,
) => {
    if (!params) params = {}

    const paramsKeys = Object.keys(params ?? {}) as (keyof typeof params)[]

    // Check if there are keys other than 'page' and 'limit' with non-empty values
    const hasNonEmptyKeys = paramsKeys.some(
        (key) =>
            key !== 'page' &&
            key !== 'limit' &&
            params![key] &&
            (Array.isArray(params![key]) ? (params![key] as string[]).length > 0 : true),
    )

    const endpoint = hasNonEmptyKeys ? 'anime' : 'top/anime'

    // Init response
    const res = await fetchAnimeData(endpoint, params)

    return res
}

export const getManyAnimeByIds: (ids: string[]) => Promise<AnimeItem[]> = async (ids: string[]) => {
    return await Promise.all(ids.map(getAnimeById))
}

// Get anime by id
export const getAnimeById: (id: string) => Promise<AnimeItem> = async (id: string) => {
    const animeRes = await fetch(`${JIKAN_API_URL}/anime/${id}`, { next: { revalidate: 60 * 10 } })

    if (!animeRes.ok) {
        const errorMessage = await animeRes.text()

        throw new Error(`Error fetching anime ${errorMessage}`)
    }

    const anime = (await animeRes.json()) as GetAnimeApiResponse

    return anime.data
}

// Get anime comments
export const getAnimeComments = async (animeId: number, episode?: number) => {
    const animeComments = await prisma.animeComment.findMany({
        where: {
            animeId,
            episode: episode ?? null,
            parentAnimeCommentId: null, // Only get top-level comments
        },
        // include: {
        //     user: true,
        //     likes: true,
        //     dislikes: true,
        // },
        orderBy: {
            createdAt: 'desc',
        },
    })

    // For each comment, append either user is liking or disliking it and absolute likes (likes - dislikes)
    return animeComments as unknown as IAnimeComment[]
}

export const getAnimeCommentExtraData = async (animeCommentId: number) => {
    const res = await fetch(`/api/anime-comment/getExtraData?animeCommentId=${animeCommentId}`)

    if (!res.ok) throw new Error('Error while getting anime extra data')

    const extraData = await res.json()

    return extraData
}

export const getAnimeCommentChildrenComments = async (animeCommentId: number) => {
    const res = await fetch(
        `/api/anime-comment/getExtraData?animeCommentId=${animeCommentId}&fields=childAnimeComments`,
    )

    if (!res.ok) throw new Error('Error while getting anime extra data')

    const extraData = await res.json()

    return extraData
}

export const getAnimeLikes = async (animeId: string): Promise<IAnimeLike[]> => {

    try {
        const likes = await prisma.animeLike.findMany({
            where: {
                animeId,
            },
        })
    
        return likes as IAnimeLike[]   
    } catch (error) {
        console.error("Error getting anime likes", error);
        throw new Error('Error while getting anime likes')
    }
}
