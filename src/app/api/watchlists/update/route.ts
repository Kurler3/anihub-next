import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { updateWatchlistSchema } from '@/schemas'
import { getWatchlistById } from '@/services'
import { IUpdateWatchlistData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
    // Get current user
    const user = await getCurrentUser()

    // If not logged in => unauthorized
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

    // Get body
    const body = await req.json()

    // Init new watchlist
    let newWatchlist: IUpdateWatchlistData

    try {
        // Parse schema
        newWatchlist = updateWatchlistSchema.parse(body)
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
    }

    // Get the original watchlist
    const watchlist = await getWatchlistById(newWatchlist.id)

    if (!watchlist) return NextResponse.json({ message: 'Watchlist not found' }, { status: 404 })

    // Check that this user is admin in this watchlist
    const isAdmin =
        watchlist.watchlistUsers.find(
            (watchlistUser) => watchlistUser.userId === user.id && watchlistUser.role === 'admin',
        ) !== undefined

    if (!isAdmin) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

    try {
        // Update watchlist
        await prisma.watchList.update({
            where: {
                id: watchlist.id,
            },
            data: {
                name: newWatchlist.title,
                description: newWatchlist.description,
            },
        })

        ////////////////////////////////////////////////////////////////////////////////////////
        // Find out which users need to be added/removed to the watchlist users. ///////////////
        ////////////////////////////////////////////////////////////////////////////////////////

        // Get previous watchlist users
        const previousWatchlistUsers = watchlist.watchlistUsers

        // Previous watchlist users ids
        const previousWatchlistUsersIdsToRoleMap = previousWatchlistUsers.reduce(
            (pv: { [key: string]: string }, cu) => {
                pv[cu.userId] = cu.role

                return pv
            },
            {},
        )

        // Get the user ids from the previous watchlist users
        const previousWatchlistUsersIds = Object.keys(previousWatchlistUsersIdsToRoleMap)

        // Init watchlist users promises
        const watchlistUsersPromises = []

        //////////////////////////////////
        // WATCHLIST USERS TO DELETE /////
        //////////////////////////////////

        // Map from new watchlist users to their role
        const newWatchlistUsersToRoleMap: { [key: string]: string } = {}

        newWatchlist.admins.forEach((userId) => {
            newWatchlistUsersToRoleMap[userId] = 'admin'
        })
        newWatchlist.editors.forEach((userId) => {
            newWatchlistUsersToRoleMap[userId] = 'editor'
        })
        newWatchlist.viewers.forEach((userId) => {
            newWatchlistUsersToRoleMap[userId] = 'viewer'
        })

        const allNewWatchlistUserIds = Object.keys(newWatchlistUsersToRoleMap)

        // Get ids that are in previous watchlist but not in new watchlist
        const idsToDelete = previousWatchlistUsersIds.filter(
            (userId) => !allNewWatchlistUserIds.includes(userId) && userId !== user.id,
        )

        if (idsToDelete.length > 0) {
            watchlistUsersPromises.push(
                prisma.watchListUser.deleteMany({
                    where: {
                        userId: {
                            in: idsToDelete,
                        },
                    },
                }),
            )
        }

        //////////////////////////////////
        // WATCHLIST USERS TO ADD ////////
        //////////////////////////////////

        // Get ids that are in new watchlist but not in previous watchlist
        const userIdsToAdd = allNewWatchlistUserIds.filter((userId) => !previousWatchlistUsersIds.includes(userId))

        if (userIdsToAdd.length > 0) {
            userIdsToAdd.forEach((userId) => {
                const role = newWatchlistUsersToRoleMap[userId]

                watchlistUsersPromises.push(
                    prisma.watchListUser.create({
                        data: {
                            userId,
                            watchlistId: watchlist.id,
                            role,
                        },
                    }),
                )
            })
        }

        //////////////////////////////////
        // WATCHLIST USERS TO UPDATE /////
        //////////////////////////////////

        // Get ids that are in both previous and new watchlist
        const idsToUpdate = allNewWatchlistUserIds.filter(
            (userId) => previousWatchlistUsersIds.includes(userId) && user.id !== userId,
        )

        if (idsToUpdate.length > 0) {
            idsToUpdate.forEach((userId) => {
                const oldRole = previousWatchlistUsersIdsToRoleMap[userId]
                const newRole = newWatchlistUsersToRoleMap[userId]

                // If not the same => update
                if (oldRole !== newRole) {
                    watchlistUsersPromises.push(
                        prisma.watchListUser.update({
                            where: {
                                userId_watchlistId: {
                                    userId,
                                    watchlistId: watchlist.id,
                                },
                            },
                            data: {
                                role: newRole,
                            },
                        }),
                    )
                }
            })
        }

        //////////////////////////////////
        // LAUNCH ALL PROMISES ///////////
        //////////////////////////////////

        await Promise.all(watchlistUsersPromises)
    } catch (error) {
        console.error('Error while updating watchlist...', error)

        return NextResponse.json({ message: 'Error while updating watchlist' }, { status: 400 })
    }

    // Return res
    return NextResponse.json({ message: 'Watchlist created' }, { status: 200 })
}
