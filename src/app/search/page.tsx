
import MultiSelectDropdown from '@/components/inputs/MultiDropdownInput'
import SingleSelectDropdown from '@/components/inputs/SingleSelectDropdown'
import TextInput from '@/components/inputs/TextInput'
import Button from '@/components/ui/Button'
import { ANIME_STATUS, ANIME_TYPES, SEASONS } from '@/lib/constants'
import { getSearchAnimeOptions } from '@/lib/functions'
import { getAnimeGenres, searchAnimes } from '@/services'
import { ISearchAnimeParams } from '@/types'
import React from 'react'

interface IProps {
  searchParams: ISearchAnimeParams;
}

const SearchPage = async ({
  searchParams,
}: IProps) => {

  searchParams.page = 10;

  const {
    data,
    pagination,
  } = await searchAnimes(searchParams);

  // Get genres
  const animeGenres = (await getAnimeGenres()).slice(0, 14).map((genre) => {
    return {
      id: String(genre.mal_id),
      name: genre.name,
    }
  });

  const seasonOptions = getSearchAnimeOptions(SEASONS);

  const animeTypeOptions = getSearchAnimeOptions(ANIME_TYPES);

  const animeStatusOptions = getSearchAnimeOptions(ANIME_STATUS);

  return (
    <div className='w-full h-full flexStartStart flex-col p-4 gap-3'>

      {/* TITLE */}
      <h1 className='text-xl'>Search</h1>

      {/* INPUTS */}
      <form className='w-full flexStartCenter gap-3 flex-wrap'>

        {/* SEARCH INPUT */}
        <TextInput
          name="q"
          placeholder='Search...'
          initialValue={searchParams.q ?? ''}
        />

        {/* GENRES */}
        <MultiSelectDropdown
          options={animeGenres}
          formInputName='genre'
          placeholderText='Select genres'
          type='genre'
          defaultOptions={searchParams.genre ?? []}
        />

        {/* SEASON */}
        <MultiSelectDropdown
          options={seasonOptions}
          formInputName='season'
          placeholderText='Select seasons'
          type='season'
          defaultOptions={searchParams.season ?? []}
        />

        {/* TYPE (radio) */}
        <SingleSelectDropdown
          options={animeTypeOptions}
          formInputName='type'
          placeholderText='Select type'
          type='type'
          defaultOption={searchParams.type}
        />

        {/* STATUS (radio) */}
        <SingleSelectDropdown
          options={animeStatusOptions}
          formInputName='status'
          placeholderText='Select status'
          type='status'
          defaultOption={searchParams.status}
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

      {/* ITEM COUNT */}
      <span className='text-sm'>
        {pagination.items.total} Items
      </span>

      {/* RESULTS */}

      {/* PAGINATION */}

    </div>
  )
}

export default SearchPage