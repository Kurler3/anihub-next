import { createUserSchema } from '@/schemas'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseRouteHandler } from '@/lib/supabase/supabase-route-handler'

export async function POST(req: NextRequest) {
    try {
        /////////////////////////////////////////////////
        // INIT SERVICES ////////////////////////////////
        /////////////////////////////////////////////////

        // const prisma = getPrismaClient()
        const supabase = getSupabaseRouteHandler()

        /////////////////////////////////////////////////
        // VALIDATE BODY ////////////////////////////////
        /////////////////////////////////////////////////

        const body = await req.json()

        // Parse incoming data
        const { email, password, username, avatarUrl } = createUserSchema.parse(body)

        //////////////////////////////////////////////////
        // CHECK IF THE USER EXISTS //////////////////////
        //////////////////////////////////////////////////

        // Check if the user already exists in your Prisma database
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        // If exists => sign out and throw error to client
        if (existingUser) {
            await supabase.auth.signOut()
            return NextResponse.json({ error: 'User with this email already exists. Please login' }, { status: 400 })
        }

        // Authenticate the user using Supabase
        const signUpResponse = await supabase.auth.signUp({
            email,
            password,
        })

        const { data: signUpData, error } = signUpResponse

        if (error) {
            console.error('Supabase error:', error.message)
            return NextResponse.json({ error: 'Failed to sign up. Please try again' }, { status: 400 })
        }

        // Create the user in your Prisma database
        await prisma.user.create({
            data: {
                id: signUpData.user?.id.toString()!, // Use the Supabase user ID as the Prisma user ID
                email,
                username,
                avatarUrl,
            },
        })

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
    } catch (error) {
        console.log(error)
        if (typeof error === 'object' && 'message' in error!) {
            console.error('Server error:', error.message)
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
