export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
            foreignKeyName: "anime_comments_parentAnimeCommentId_fkey"
            columns: ["parentAnimeCommentId"]
            isOneToOne: false
            referencedRelation: "anime_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anime_comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "anime_comments_dislikes_animeCommentId_fkey"
            columns: ["animeCommentId"]
            isOneToOne: false
            referencedRelation: "anime_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anime_comments_dislikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "anime_comments_likes_animeCommentId_fkey"
            columns: ["animeCommentId"]
            isOneToOne: false
            referencedRelation: "anime_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anime_comments_likes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          createdAt: string
          id: number
          parentCommentId: number | null
          postId: number
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          parentCommentId?: number | null
          postId: number
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          parentCommentId?: number | null
          postId?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parentCommentId_fkey"
            columns: ["parentCommentId"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_postId_fkey"
            columns: ["postId"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "comments_dislikes_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_dislikes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "comments_likes_commentId_fkey"
            columns: ["commentId"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_likes_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      follows: {
        Row: {
          followerId: string
          followingId: string
        }
        Insert: {
          followerId: string
          followingId: string
        }
        Update: {
          followerId?: string
          followingId?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_followerId_fkey"
            columns: ["followerId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_followingId_fkey"
            columns: ["followingId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
            foreignKeyName: "posts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatarUrl: string | null
          bio: string | null
          createdAt: string
          email: string
          id: string
          updatedAt: string
          username: string
        }
        Insert: {
          avatarUrl?: string | null
          bio?: string | null
          createdAt?: string
          email: string
          id: string
          updatedAt?: string
          username: string
        }
        Update: {
          avatarUrl?: string | null
          bio?: string | null
          createdAt?: string
          email?: string
          id?: string
          updatedAt?: string
          username?: string
        }
        Relationships: []
      }
      watchlist_animes: {
        Row: {
          animeId: number
          watchListId: number
        }
        Insert: {
          animeId: number
          watchListId: number
        }
        Update: {
          animeId?: number
          watchListId?: number
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_animes_watchListId_fkey"
            columns: ["watchListId"]
            isOneToOne: false
            referencedRelation: "watchlists"
            referencedColumns: ["id"]
          }
        ]
      }
      watchlist_users: {
        Row: {
          userId: string
          watchlistId: number
        }
        Insert: {
          userId: string
          watchlistId: number
        }
        Update: {
          userId?: string
          watchlistId?: number
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_users_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watchlist_users_watchlistId_fkey"
            columns: ["watchlistId"]
            isOneToOne: false
            referencedRelation: "watchlists"
            referencedColumns: ["id"]
          }
        ]
      }
      watchlists: {
        Row: {
          description: string | null
          id: number
          isPrivate: boolean
          name: string
          ownerId: string
        }
        Insert: {
          description?: string | null
          id?: number
          isPrivate: boolean
          name: string
          ownerId: string
        }
        Update: {
          description?: string | null
          id?: number
          isPrivate?: boolean
          name?: string
          ownerId?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlists_ownerId_fkey"
            columns: ["ownerId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
