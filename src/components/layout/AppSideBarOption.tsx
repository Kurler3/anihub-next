'use client'

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation'

type Props = {
    IconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    title: string;
    urlValue: string;
}



const AppSideBarOption = ({
    IconComponent,
    title,
    urlValue,
}: Props) => {

    const pathname = usePathname()
    const isActive = pathname.includes(urlValue);

  return (
    <Link href={`/${urlValue}`} className='w-[100%]'>
         <div className={
            `
                flexStartCenter gap-2 p-2 hover:bg-bgDarkColor transition w-[100%] rounded-md cursor-pointer 
                ${isActive ? 'bg-highlightedColor text-white hover:bg-highlightedColor cursor-default' : ''} 
            `
        }>
            <IconComponent className={`text-sideBarIconColor ${isActive ? 'text-white' : ''}`}/>
            <p className='text-sideBarTitleColor responsiveText hidden md:block'>
                {title}
            </p>
        </div>
    </Link>
   
  )
}

export default AppSideBarOption