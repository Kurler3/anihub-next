import Image from 'next/image'
import React from 'react'
import pochita from '@/images/pochita.svg';

const Footer = () => {
  return (
    <div className='flexCenterCenter w-[100%] gap-20 p-8'>

        <p className='text-white text-2xl'>
            Thank you for visiting シ
        </p>

        <Image 
            src={pochita}
            alt="Pochita"
            width={200}
            height={200}
        />

    </div>
  )
}

export default Footer