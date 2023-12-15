import { IUser } from '.'

export interface ISearchWatchlistsParams {
    q?: string
    page?: number
}

export interface IWatchList {
    id: number
    name: string
    description: string
    ownerId: string
    owner: IUser
    watchlistUsers: IWatchListUser[]
    watchlistAnime: IWatchListAnime[]
    createdAt: string
}

export interface IWatchListUser {
    userId: string
    watchlistId: number
    watchlist?: IWatchList
    user?: IUser
    createdAt: string
}

export interface IWatchListAnime {
    watchlistId: number
    watchlist?: IWatchList
    animeId: number
    createdAt: string
}

export interface IGetWatchlistsProps {
    q?: string
    page: number
    user: IUser
}

export interface ICreateWatchlistFormData {
    title: string
    description: string
}

export interface ICreateWatchListUsersState {
    admins: IUser[]
    editors: IUser[]
    viewers: IUser[]
}
