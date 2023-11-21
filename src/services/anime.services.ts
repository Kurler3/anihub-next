import { JIKAN_API_URL } from '@/lib/constants'
import { Genre, GetAnimeGenresResponse } from '@/types'
import { ApiResponse, ISearchAnimeParams } from '../types/anime.types'

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
        throw new Error('Error fetching anime')
    }

    return (await res.json()) as ApiResponse
}

export const getAnimeGenres: () => Promise<Genre[]> = async () => {
    const genresResponse = await fetch(`${JIKAN_API_URL}/genres/anime`)

    if (!genresResponse.ok) {
        throw new Error('Error fetching anime genres')
    }

    const genres = (await genresResponse.json()) as GetAnimeGenresResponse

    return genres.data
}

export const getTopAnime: (params?: ISearchAnimeParams) => Promise<ApiResponse> = async (
    params?: ISearchAnimeParams,
) => {
    return await fetchAnimeData('top/anime', params)
}

export const searchAnimes: (params: ISearchAnimeParams) => Promise<ApiResponse> = async (
    params: ISearchAnimeParams,
) => {
    const paramsKeys = Object.keys(params) as (keyof typeof params)[]

    // Check if there are keys other than 'page' and 'limit' with non-empty values
    const hasNonEmptyKeys = paramsKeys.some(
        (key) =>
            key !== 'page' &&
            key !== 'limit' &&
            params[key] &&
            (Array.isArray(params[key]) ? (params[key] as string[]).length > 0 : true),
    )

    const endpoint = hasNonEmptyKeys ? 'anime' : 'top/anime'

    console.log(params)

    // Init response
    const res = await fetchAnimeData(endpoint, params)

    return res
}
