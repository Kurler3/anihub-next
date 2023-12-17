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
    createdAt: Date
}

export interface IWatchListUser {
    userId: string
    watchlistId: number
    watchlist?: IWatchList
    user?: IUser
    role: string
    createdAt: Date
}

export interface IWatchListAnime {
    watchListId: number
    watchlist?: IWatchList
    animeId: number
    createdAt: Date
}

export interface IGetWatchlistsProps {
    q?: string
    page: number
    user: IUser
}

export interface ICreateWatchlistFormData {
    title: string
    description?: string
}

export interface ICreateWatchListUsersState {
    admins: IUser[]
    editors: IUser[]
    viewers: IUser[]
    currentType: 'admins' | 'editors' | 'viewers' | null
}

export interface ICreateWatchlistData extends ICreateWatchlistFormData {
    admins: string[]
    editors: string[]
    viewers: string[]
}
