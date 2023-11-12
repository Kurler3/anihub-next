import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getSupabaseRouteHandler = () => createRouteHandlerClient({ cookies })
