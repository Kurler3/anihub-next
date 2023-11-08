import Image from 'next/image'
import React from 'react'
import title from '@/images/title.svg'
import Link from 'next/link'
import SearchBar from './SearchBar'
import {
  searchFormSubmit
} from '@/serverActions';

const Navbar = () => {
  return (
    <div className='w-100 flex justify-start items-center'>

        {/* TITLE + SEARCH BAR */}
        <div>

          {/* TITLE */}
          <Link href="/">
              <Image 
                  src={title}
                  alt="Anihub"
                  width={200}
                  height={150}
                  className='hover:bg-bgDarkColor hover:cursor-pointer pt-4 pb-2 transition rounded'
              />
          </Link>

          {/* Search bar */}
          <SearchBar serverAction={searchFormSubmit}/>

        </div>
        

    </div>
  )
}

export default Navbar