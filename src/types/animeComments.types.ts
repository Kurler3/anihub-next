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
    likes: IAnimeCommentLike[]
    dislikes: IAnimeCommentDislike[]
}

export interface IAnimeCommentLike {
    id: number
    userId: string
    animeCommentId: number
    createdAt: Date
}

export interface IAnimeCommentDislike {
    id: number
    userId: string
    animeCommentId: number
    createdAt: Date
}

export interface IAnimeCommentLikeResponse {
    commentLike: IAnimeCommentLike
    action: 'delete' | 'create'
}

export interface IAnimeCommentDislikeResponse {
    commentDislike: IAnimeCommentDislike
    action: 'delete' | 'create'
}
