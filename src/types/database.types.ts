export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
    public: {
        Tables: {
            _prisma_migrations: {
                Row: {
                    applied_steps_count: number
                    checksum: string
                    finished_at: string | null
                    id: string
                    logs: string | null
                    migration_name: string
                    rolled_back_at: string | null
                    started_at: string
                }
                Insert: {
                    applied_steps_count?: number
                    checksum: string
                    finished_at?: string | null
                    id: string
                    logs?: string | null
                    migration_name: string
                    rolled_back_at?: string | null
                    started_at?: string
                }
                Update: {
                    applied_steps_count?: number
                    checksum?: string
                    finished_at?: string | null
                    id?: string
                    logs?: string | null
                    migration_name?: string
                    rolled_back_at?: string | null
                    started_at?: string
                }
                Relationships: []
            }
            anime_comments: {
                Row: {
                    animeId: number
                    content: string
                    createdAt: string
                    episode: number | null
                    id: number
                    parentAnimeCommentId: number | null
                    updatedAt: string
                    userId: string
                }
                Insert: {
                    animeId: number
                    content: string
                    createdAt?: string
                    episode?: number | null
                    id?: number
                    parentAnimeCommentId?: number | null
                    updatedAt?: string
                    userId: string
                }
                Update: {
                    animeId?: number
                    content?: string
                    createdAt?: string
                    episode?: number | null
                    id?: number
                    parentAnimeCommentId?: number | null
                    updatedAt?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'anime_comments_parentAnimeCommentId_fkey'
                        columns: ['parentAnimeCommentId']
                        isOneToOne: false
                        referencedRelation: 'anime_comments'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'anime_comments_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            anime_comments_dislikes: {
                Row: {
                    animeCommentId: number
                    createdAt: string
                    id: number
                    userId: string
                }
                Insert: {
                    animeCommentId: number
                    createdAt?: string
                    id?: number
                    userId: string
                }
                Update: {
                    animeCommentId?: number
                    createdAt?: string
                    id?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'anime_comments_dislikes_animeCommentId_fkey'
                        columns: ['animeCommentId']
                        isOneToOne: false
                        referencedRelation: 'anime_comments'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'anime_comments_dislikes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            anime_comments_likes: {
                Row: {
                    animeCommentId: number
                    createdAt: string
                    id: number
                    userId: string
                }
                Insert: {
                    animeCommentId: number
                    createdAt?: string
                    id?: number
                    userId: string
                }
                Update: {
                    animeCommentId?: number
                    createdAt?: string
                    id?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'anime_comments_likes_animeCommentId_fkey'
                        columns: ['animeCommentId']
                        isOneToOne: false
                        referencedRelation: 'anime_comments'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'anime_comments_likes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            anime_likes: {
                Row: {
                    animeId: string
                    id: number
                    userId: string
                }
                Insert: {
                    animeId: string
                    id?: number
                    userId: string
                }
                Update: {
                    animeId?: string
                    id?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'anime_likes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            comments: {
                Row: {
                    content: string
                    createdAt: string
                    id: number
                    parentCommentId: number | null
                    postId: number
                    updatedAt: string
                    userId: string
                }
                Insert: {
                    content: string
                    createdAt?: string
                    id?: number
                    parentCommentId?: number | null
                    postId: number
                    updatedAt?: string
                    userId: string
                }
                Update: {
                    content?: string
                    createdAt?: string
                    id?: number
                    parentCommentId?: number | null
                    postId?: number
                    updatedAt?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'comments_parentCommentId_fkey'
                        columns: ['parentCommentId']
                        isOneToOne: false
                        referencedRelation: 'comments'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'comments_postId_fkey'
                        columns: ['postId']
                        isOneToOne: false
                        referencedRelation: 'posts'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'comments_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            comments_dislikes: {
                Row: {
                    commentId: number
                    createdAt: string
                    id: number
                    userId: string
                }
                Insert: {
                    commentId: number
                    createdAt?: string
                    id?: number
                    userId: string
                }
                Update: {
                    commentId?: number
                    createdAt?: string
                    id?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'comments_dislikes_commentId_fkey'
                        columns: ['commentId']
                        isOneToOne: false
                        referencedRelation: 'comments'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'comments_dislikes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            comments_likes: {
                Row: {
                    commentId: number
                    createdAt: string
                    id: number
                    userId: string
                }
                Insert: {
                    commentId: number
                    createdAt?: string
                    id?: number
                    userId: string
                }
                Update: {
                    commentId?: number
                    createdAt?: string
                    id?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'comments_likes_commentId_fkey'
                        columns: ['commentId']
                        isOneToOne: false
                        referencedRelation: 'comments'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'comments_likes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            follow_requests: {
                Row: {
                    createdAt: string
                    followedUserId: string
                    followerUserId: string
                }
                Insert: {
                    createdAt?: string
                    followedUserId: string
                    followerUserId: string
                }
                Update: {
                    createdAt?: string
                    followedUserId?: string
                    followerUserId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'follow_requests_followedUserId_fkey'
                        columns: ['followedUserId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'follow_requests_followerUserId_fkey'
                        columns: ['followerUserId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            follows: {
                Row: {
                    followedUserId: string
                    followerUserId: string
                }
                Insert: {
                    followedUserId: string
                    followerUserId: string
                }
                Update: {
                    followedUserId?: string
                    followerUserId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'follows_followedUserId_fkey'
                        columns: ['followedUserId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'follows_followerUserId_fkey'
                        columns: ['followerUserId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            posts: {
                Row: {
                    body: string
                    createdAt: string
                    id: number
                    title: string
                    updatedAt: string
                    userId: string
                }
                Insert: {
                    body: string
                    createdAt?: string
                    id?: number
                    title: string
                    updatedAt?: string
                    userId: string
                }
                Update: {
                    body?: string
                    createdAt?: string
                    id?: number
                    title?: string
                    updatedAt?: string
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'posts_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            posts_dislikes: {
                Row: {
                    createdAt: string
                    id: number
                    postId: number
                    userId: string
                }
                Insert: {
                    createdAt?: string
                    id?: number
                    postId: number
                    userId: string
                }
                Update: {
                    createdAt?: string
                    id?: number
                    postId?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'posts_dislikes_postId_fkey'
                        columns: ['postId']
                        isOneToOne: false
                        referencedRelation: 'posts'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'posts_dislikes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            posts_likes: {
                Row: {
                    createdAt: string
                    id: number
                    postId: number
                    userId: string
                }
                Insert: {
                    createdAt?: string
                    id?: number
                    postId: number
                    userId: string
                }
                Update: {
                    createdAt?: string
                    id?: number
                    postId?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'posts_likes_postId_fkey'
                        columns: ['postId']
                        isOneToOne: false
                        referencedRelation: 'posts'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'posts_likes_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            users: {
                Row: {
                    avatarUrl: string | null
                    bio: string | null
                    createdAt: string
                    email: string
                    id: string
                    isProfilePublic: boolean
                    updatedAt: string
                    username: string
                }
                Insert: {
                    avatarUrl?: string | null
                    bio?: string | null
                    createdAt?: string
                    email: string
                    id: string
                    isProfilePublic?: boolean
                    updatedAt?: string
                    username: string
                }
                Update: {
                    avatarUrl?: string | null
                    bio?: string | null
                    createdAt?: string
                    email?: string
                    id?: string
                    isProfilePublic?: boolean
                    updatedAt?: string
                    username?: string
                }
                Relationships: []
            }
            watchlist_animes: {
                Row: {
                    animeId: string
                    animeImgUrl: string
                    createdAt: string
                    watchListId: number
                }
                Insert: {
                    animeId: string
                    animeImgUrl: string
                    createdAt?: string
                    watchListId: number
                }
                Update: {
                    animeId?: string
                    animeImgUrl?: string
                    createdAt?: string
                    watchListId?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'watchlist_animes_watchListId_fkey'
                        columns: ['watchListId']
                        isOneToOne: false
                        referencedRelation: 'watchlists'
                        referencedColumns: ['id']
                    },
                ]
            }
            watchlist_users: {
                Row: {
                    createdAt: string
                    role: string
                    userId: string
                    watchlistId: number
                }
                Insert: {
                    createdAt?: string
                    role: string
                    userId: string
                    watchlistId: number
                }
                Update: {
                    createdAt?: string
                    role?: string
                    userId?: string
                    watchlistId?: number
                }
                Relationships: [
                    {
                        foreignKeyName: 'watchlist_users_userId_fkey'
                        columns: ['userId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'watchlist_users_watchlistId_fkey'
                        columns: ['watchlistId']
                        isOneToOne: false
                        referencedRelation: 'watchlists'
                        referencedColumns: ['id']
                    },
                ]
            }
            watchlists: {
                Row: {
                    createdAt: string
                    description: string | null
                    id: number
                    name: string
                    ownerId: string
                }
                Insert: {
                    createdAt?: string
                    description?: string | null
                    id?: number
                    name: string
                    ownerId: string
                }
                Update: {
                    createdAt?: string
                    description?: string | null
                    id?: number
                    name?: string
                    ownerId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'watchlists_ownerId_fkey'
                        columns: ['ownerId']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database['public']['Tables'] & Database['public']['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
          Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
          Insert: infer I
      }
        ? I
        : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
          Update: infer U
      }
        ? U
        : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
