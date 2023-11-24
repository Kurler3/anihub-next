export interface ICreateAnimeComment {
    userId: string
    animeId: number
    episode?: number
    content: string
    // Parent comment
    parentAnimeCommentId?: number
}
