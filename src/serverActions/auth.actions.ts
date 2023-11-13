'use server'

import { redirect } from 'next/navigation'

export const redirectToChangePassword = async () => {
    redirect('/reset-pwd')
}
