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

export type SignUpModalData = {
    message: string | null
    type: 'error' | 'success' | null
}
