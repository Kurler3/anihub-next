import Image from 'next/image'
import React from 'react'
import title from '@/images/title.svg'
import profilePic from '@/images/profile_pic.svg'
import Link from 'next/link'
import SearchBar from '../inputs/SearchBar'
import {
  searchFormSubmit
} from '@/serverActions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Navbar = () => {
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
        <div className='flexCenterCenter cursor-pointer p-1 pl-2 rounded-md transition hover:bg-bgDarkColor text-white hidden md:block'>
          <p>EN</p>
          <KeyboardArrowDownIcon />
        </div>

        {/* SETTINGS */}
        <div className='flexCenterCenter cursor-pointer p-1 rounded-md transition hover:bg-bgDarkColor'>
          <SettingsIcon className='text-white w-[28px] h-[28px]' />
        </div>


        {/* NOTIFICATIONS */}
        <div className='flexCenterCenter cursor-pointer p-1 rounded-md transition hover:bg-bgDarkColor'>
          <NotificationsActiveIcon className='text-white w-[28px] h-[28px]' />
        </div>


        {/* AVATAR */}
        <Link href="/user/id">
          <div className='flexCenterCenter cursor-pointer p-1 rounded-md transition hover:bg-bgDarkColor'>
            <Image
              src={profilePic}
              alt="Profile Pic"
              width={55}
              height={50}
              className='rounded-full'
            />
          </div>
        </Link>

      </div>


    </div>
  )
}

export default Navbar