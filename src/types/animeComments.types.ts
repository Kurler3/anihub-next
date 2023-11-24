import { IUser } from '.'

export interface ICreateAnimeComment {
    userId: string
    animeId: number
    episode?: number
    content: string
    parentAnimeCommentId?: number
}

export interface IAnimeComment {
    id: number
    userId: string
    animeId: number
    episode?: number
    content: string
    parentAnimeCommentId?: number
    createdAt: string
    updatedAt: string
    user: IUser
    childAnimeComments: IAnimeComment[]
}
