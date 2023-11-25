import { NextApiRequestWithLocals } from '@/types'

export async function POST(req: NextApiRequestWithLocals) {
    console.log('User: ', req.locals?.user)

    // If liking => check if like already exists
    // If exists => delete it
    // Else create a new one
    // Delete any dislikes for this commentId and userId
    //
}
