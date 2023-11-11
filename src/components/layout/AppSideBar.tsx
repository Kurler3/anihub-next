import React from 'react'
import HorizontalSeparator from '@/components/HorizontalSeparator'
import AppSideBarOption from './AppSideBarOption'
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageIcon from '@mui/icons-material/Message';
import ViewListIcon from '@mui/icons-material/ViewList';
import GitHubIcon from '@mui/icons-material/GitHub';

type Props = {}

const AppSideBar = (props: Props) => {
    return (
        <div className='w-[10%] h-100 gap-4 flexColStartStart min-w-[50px]'>

            <HorizontalSeparator />

            {/* SEARCH */}
            <AppSideBarOption
                IconComponent={SearchIcon}
                title='Search'
                urlValue='search'
            />

            {/* SEPARATOR */}
            <HorizontalSeparator />

            {/* SOCIAL */}
            <AppSideBarOption
                IconComponent={PeopleAltIcon}
                title='Social'
                urlValue='social'
            />

            {/* MESSAGES */}
            <AppSideBarOption
                IconComponent={MessageIcon}
                title='Messages'
                urlValue='messages'
            />

            {/* SEPARATOR */}
            <HorizontalSeparator />

            {/* WATCH LISTS */}
            <AppSideBarOption
                IconComponent={ViewListIcon}
                title='Watchlists'
                urlValue='watchlists'
            />

            {/* SEPARATOR */}
            <HorizontalSeparator />

            {/* MADE BY */}
            <div className='flexCenterCenter gap-2 flex-col w-[100%]'>
                <p className='text-highlightedColor text-center text-xs'>
                    Made by Miguel, 2023
                </p>

                <div className='hover:bg-bgDarkColor p-2 rounded-md transition'>
                    <a target="_blank" href="https://github.com/Kurler3" rel="noopener noreferrer">
                        <GitHubIcon className='text-sideBarIconColor' />
                    </a>

                </div>
            </div>

        </div>
    )
}

export default AppSideBar