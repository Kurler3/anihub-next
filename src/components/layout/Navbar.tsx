import Image from 'next/image'
import React from 'react'
import title from '@/images/title.svg'
import Link from 'next/link'
import SearchBar from '../inputs/SearchBar'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import NavbarAvatarButton from './NavbarAvatarButton'

const Navbar = async () => {

  // Get current user
  const user = await getCurrentUser();

  return (
    <div className='w-100 flex justify-between items-center'>

      {/* TITLE + SEARCH BAR */}
      <div className='flex justify-start items-center gap-8 flex-1'>

        {/* TITLE */}
        <Link href="/">
          <Image
            src={title}
            alt="Anihub"
            width={200}
            height={150}
            className='hover:bg-bgDarkColor hover:cursor-pointer pt-4 pb-2 transition rounded-md'
          />
        </Link>

        {/* Search bar */}
        <form action="/search" method="GET" className='hidden md:block'>
          <SearchBar />
        </form>


      </div>

      {/* RIGHT PART */}
      <div className='flex justify-end items-center gap-6 flex-1'>

        {/* LANGUAGE */}
        {/* <div className='flexCenterCenter cursor-pointer p-1 pl-2 rounded-md transition hover:bg-bgDarkColor text-white hidden md:flex'>
          <p>EN</p>
          <KeyboardArrowDownIcon />
        </div> */}

        {
          user && (
            <>

              {/* WELCOME MSG */}
              <h2 className='hidden md:block'>
                Welcome, <b>{user.username}</b>
              </h2>

              {/* SEPARATOR */}
              <div
                className='bg-separatorColor h-[50px] w-[2px]'
              >
              </div>



            </>

          )
        }

        {/* SETTINGS */}
        <div className='flexCenterCenter cursor-pointer p-1 rounded-md transition hover:bg-bgDarkColor'>
          <SettingsIcon className='text-white w-[28px] h-[28px]' />
        </div>


        {/* NOTIFICATIONS */}
        {
          user && <div className='flexCenterCenter cursor-pointer p-1 rounded-md transition hover:bg-bgDarkColor'>
            <NotificationsActiveIcon className='text-white w-[28px] h-[28px]' />
          </div>
        }



        {/* AVATAR */}
        {
          user ? (
            <NavbarAvatarButton user={user} />
          ) : (
            <div className='flexCenterCenter gap-2'>

              <Link href='/login'>
                <button className='p-3 px-12 text-white bg-highlightedColor rounded-md text-sm md:text-base'>
                  Login
                </button>
              </Link>

              <Link href='/sign-up'>
                <button className='p-3 px-8 text-white bg-bgLight rounded-md text-sm md:text-base'>
                  Sign up
                </button>
              </Link>


            </div>
          )
        }


      </div>


    </div>
  )
}

export default Navbar