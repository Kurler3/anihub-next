import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { IUserWithConnections, IUserWithFollowing } from '@/types';
import Image from 'next/image';
import React from 'react'
import SocialPagePosts from './components/SocialPagePosts';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import SocialPagePeople from './components/SocialPagePeople';

type Props = {
  searchParams: {
    page: number,
  }
}

const SocialPage = async ({
  searchParams: {
    page,
  }
}: Props) => {

  ///////////////////////////////////
  // DATA ///////////////////////////
  ///////////////////////////////////

  const currentUser = await getCurrentUser({
    following: true,
    followers: true,
    followerRequests: true,
    followingRequests: true,
  }) as unknown as IUserWithConnections;

  ///////////////////////////////////
  // FUNCTIONS //////////////////////
  ///////////////////////////////////

  // Handle create post
  const handleCreatePost = async (e: FormData) => {
    'use server'

    const title = e.get('title') as string;
    const body = e.get('body') as string;
    const userId = e.get('currentUserId') as string;

    try {

      await prisma.post.create({
        data: {
          userId,
          title,
          body,
        }
      })

      e.set('title', '');
      e.set('body', '');

      revalidatePath('/social')

    } catch (error) {
      console.error('Error while creating post');
    }

  }

  ///////////////////////////////////
  // RENDER /////////////////////////
  ///////////////////////////////////

  return (
    <div className='w-full flexStartCenter p-8 gap-4 h-full'>

      {/* POSTS */}
      <div className='flex-1 h-full p-4 flexStartStart flex-col gap-4'>

        <h1 className='text-xl'>
          Posts
        </h1>

        {/* ADD POST FORM */}
        {
          currentUser && (
            <form action={handleCreatePost} className='w-full flex justify-center items-start gap-2'>
              <Image
                src={currentUser.avatarUrl!}
                alt="Profile Pic"
                width={40}
                height={40}
                className='rounded-full'
              />
              <div className='flex justify-start items-center w-full flex-col gap-3'>
                <input
                  name='title'
                  className="input bg-bgLight input-ghost w-full focus:outline-none"
                  placeholder='Title'
                />
                <textarea name='body' className="textarea bg-bgLight textarea-ghost resize-none min-h-[100px] w-full focus:outline-none " placeholder="Share your thoughts..."></textarea>
              </div>
              <button type='submit' className="h-full btn bg-highlightedColor text-white hover:bg-highlightedHover">
                Send
              </button>
              <input
                type='hidden'
                name='currentUserId'
                value={currentUser.id}
                className='hidden'
              />
            </form>
          )
        }

        {/* POSTS */}
        <SocialPagePosts
          currentUser={currentUser}
          page={page}
        />

      </div>

      {/* SEPARATOR */}
      <div
        className='bg-separatorColor h-[80%] w-[2px]'
      >
      </div>

      {/* PEOPLE */}
      <SocialPagePeople
        currentUser={currentUser}
      />

    </div>
  )
}

export default SocialPage