import { IUser } from '.'

export interface IConnectionsPageSearchParams {
    tab?: 'followers' | 'following' | 'follow_requests'
}

export interface IGetUserIncludeParams {
    followers?: boolean
    following?: boolean
    followerRequests?: boolean
}

export interface IFollow {
    followerUserId: string
    followerUser: IUserWithFollowers
    followedUser: IUser
    followedUserId: string
}

export interface IFollowRequest extends IFollow {
    createdAt: Date
}

export interface IUserWithFollowers extends IUser {
    followers: IFollow[]
}
export interface IUserWithConnections extends IUser {
    followers: IFollow[]
    following: IFollow[]
    followerRequests: IFollowRequest[]
}
