//TODO Login type
export type LoginFormData = {
    email: string
    password: string
}

//TODO Sign up Type
export type SignUpFormData = {
    email: string
    username: string
    password: string
    confirmPassword: string
}

export interface SignUpModalData {
    message: string | null
    type: 'error' | 'success' | null
}

export interface LoginModalData extends SignUpModalData {}

export interface IUser {
    id: string
    avatarUrl: string | null
    username: string
    isProfilePublic: boolean
    email: string
    bio: string | null
    createdAt: Date
    updatedAt: Date
}
