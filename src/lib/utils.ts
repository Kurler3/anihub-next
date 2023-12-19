import { type ClassValue, clsx } from 'clsx'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { BASE_PROTOCOL, BASE_URL } from './constants'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Get random value from primitive type array
export function getRandomValueFromArray<T>(arr: T[]): T | undefined {
    if (arr.length === 0) {
        return undefined // Return undefined for an empty array
    }

    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

// Open modal
export function openModal(modalId: string) {
    ;(document.getElementById(modalId)! as HTMLDialogElement).showModal()
}

// Close modal
export function closeModal(modalId: string) {
    ;(document.getElementById(modalId)! as HTMLDialogElement).close()
}

export const delay = (s: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, 1000 * s))

export const handleError = (error: unknown, msg?: string) => {
    console.error('Error...', error)
    redirect(`/error?message=${msg}`)
}

export const getFullURL = (url: string) => {
    return `${BASE_PROTOCOL}://${BASE_URL}${url}`
}
