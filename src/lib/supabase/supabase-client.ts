import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabase = createClientComponentClient({
    supabaseKey,
    supabaseUrl,
})
