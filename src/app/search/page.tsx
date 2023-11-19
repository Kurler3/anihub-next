
import MultiSelectDropdown from '@/components/inputs/MultiDropdownInput'
import TextInput from '@/components/inputs/TextInput'
import Button from '@/components/ui/Button'
import { ANIME_STATUS, ANIME_TYPES, SEASONS } from '@/lib/constants'
import { getSearchAnimeOptions } from '@/lib/functions'
import { getAnimeGenres } from '@/services'
import React from 'react'

const SearchPage = async () => {

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
        />

        {/* GENRES */}
        <MultiSelectDropdown
          options={animeGenres}
          formInputName='genre'
          placeholderText='Select genres'
          type='genre'
        />

        {/* SEASON */}
        <MultiSelectDropdown
          options={seasonOptions}
          formInputName='season'
          placeholderText='Select seasons'
          type='season'
        />

        {/* TYPE (radio) */}

        {/* STATUS (radio) */}

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

      {/* RESULTS */}

      {/* PAGINATION */}

    </div>
  )
}

export default SearchPage