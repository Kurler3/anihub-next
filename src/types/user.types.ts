import { IUser } from '.'

export interface IConnectionsPageSearchParams {
    tab?: 'followers' | 'following' | 'follow_requests'
    q?: string
    page?: number
}

export interface IGetUserIncludeParams {
    followers?: boolean
    following?: boolean
    followerRequests?: boolean
    followingRequests?: boolean
}

export interface IFollow {
    followerUserId: string
    followerUser: IUserWithFollowers
    followedUser: IUserWithFollowing
    followedUserId: string
}

export interface IFollowRequest extends IFollow {
    createdAt: Date
}

export interface IUserWithFollowers extends IUser {
    followers: IFollow[]
}

export interface IUserWithFollowing extends IUser {
    following: IFollow[]
}

export interface IUserWithConnections extends IUser {
    followers: IFollow[]
    following: IFollow[]
    followerRequests: IFollowRequest[]
    followingRequests: IFollowRequest[]
}

export interface ISearchUsersPagination {
    last_visible_page: number
    has_next_page: boolean
    items: {
        count: number
        total: number
        per_page: number
    }
}
export interface ISearchUsersResponse {
    users: IUser[]
    pagination: ISearchUsersPagination
}