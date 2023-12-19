import { IUser, Pagination } from '.'

export interface IPost {
    body: string
    createdAt: string
    id: number
    title: string
    updatedAt: string
    userId: string
    likes: IPostLike[]
    dislikes: IPostDislike[]
    user: IUser
    comments: IPostComment[]
}

export interface IPostComment {
    id: string
    userId: string
    postId: string
    createdAt: string
    content: string
    user: IUser
    childComments?: IPostComment[]
    likes?: IPostCommentLike[]
    dislikes?: IPostCommentDislike[]
}

export interface IPostLike {
    id: string
    userId: string
    postId: string
    createdAt: string
}

export interface IPostDislike extends IPostLike {}

export interface IPostCommentLike {
    id: string
    userId: string
    commentId: string
    createdAt: string
}

export interface IPostCommentDislike extends IPostCommentLike {}

export interface IPostCommentLikeResponse {
    commentLike: IPostCommentLike
    action: 'delete' | 'create'
}

export interface IPostCommentDislikeResponse {
    commentDislike: IPostCommentDislike
    action: 'delete' | 'create'
}

export interface IUpdatePostComment {
    newCommentContent: string
    commentId: number
}

export interface IGetSocialPagePosts {
    posts: IPost[]
    pagination: Pagination
}
