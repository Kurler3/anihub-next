import { IPostCommentDislike, IPostCommentLike } from '@/types'

export const isUserLikePostComment = (postLikes?: IPostCommentLike[], userId?: string) => {
    if (!userId || !postLikes) return false
    const likeFound = postLikes.find((like) => like.userId === userId)
    return likeFound !== undefined
}
export const isUserDislikePostComment = (postDislikes?: IPostCommentDislike[], userId?: string) => {
    if (!userId || !postDislikes) return false
    const likeFound = postDislikes.find((dislike) => dislike.userId === userId)
    return likeFound !== undefined
}
