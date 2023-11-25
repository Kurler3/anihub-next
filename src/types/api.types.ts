import { Session } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest } from 'next'

export type NextApiRequestWithLocals = NextApiRequest & {
    locals?: {
        user: Session | null
    }
}
