import { JIKAN_API_URL } from '@/lib/constants'
import { Genre, GetAnimeGenresResponse } from '@/types'

export const getAnimeGenres: () => Promise<Genre[]> = async () => {
    const genresResponse = await fetch(`${JIKAN_API_URL}/genres/anime`)

    if (!genresResponse.ok) {
        throw new Error('Error fetching anime genres')
    }

    const genres = (await genresResponse.json()) as GetAnimeGenresResponse

    return genres.data
}

export const searchAnimes = () => {}
