export interface IPost {
    body: string
    createdAt: string
    id: number
    title: string
    updatedAt: string
    userId: string
    likes: IPostLike[]
    dislikes: IPostDislike[]
}

export interface IPostLike {
    id: string
    userId: string
    postId: string
    createdAt: string
}

export interface IPostDislike extends IPostLike {}
