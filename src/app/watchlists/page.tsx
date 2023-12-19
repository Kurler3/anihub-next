import TextInput from '@/components/inputs/TextInput';
import Button from '@/components/ui/CustomButton';
import PaginationComponent from '@/components/ui/PaginationComponent';
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { getWatchLists } from '@/services';
import { ISearchWatchlistsParams } from '@/types';
import React from 'react'
import CreateWatchListCard from './components/CreateWatchListCard';
import WatchlistCard from './components/WatchlistCard';

interface IProps {
  searchParams: ISearchWatchlistsParams
}

const WatchlistsPage = async ({
  searchParams: {
    q,
    page,
  }
}: IProps) => {

  const currentUser = await getCurrentUser();

  const { watchlists, pagination } = await getWatchLists({
    q,
    page: page ?? 1,
    user: currentUser!,
  });

  return (
    <div className='w-full h-full flexStartStart flex-col p-4 pl-12 gap-3'>

      {/* INPUTS */}
      <form className='w-full flexCenterCenter gap-3 flex-wrap'>

        {/* SEARCH INPUT */}
        <TextInput
          name="q"
          placeholder='Search...'
          initialValue={q ?? ''}
        />

        {/* SUBMIT */}
        <Button
          title='Filter'
          type='submit'
          bgColor='highlightedColor'
          bgHoverColor='highlightedColorHover'
          paddingX='8'
          className='text-sm'
        />

      </form>

      {/* WATCHLISTS */}
      <div className='flex flex-wrap gap-4 flex-1 mt-5'>

        {/* CREATE WATCHLIST CARD */}
        <CreateWatchListCard />

        {/* WATCHLISTS CARDS */}
        {
          watchlists.map((watchlist, index) => {

            return (
              <WatchlistCard
                key={index}
                watchlist={watchlist}
                currentUserId={currentUser!.id}
              />
            )
          })
        }
      </div >

      {/* PAGINATION */}
      <PaginationComponent
        currentPage={
          page ? typeof page === 'string' ? parseInt(page) : page : 1
        }
        data={pagination}
      />

    </div >
  )
}

export default WatchlistsPage