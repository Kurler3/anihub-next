
import MultiSelectDropdown from '@/components/inputs/MultiDropdownInput'
import TextInput from '@/components/inputs/TextInput'
import Button from '@/components/ui/Button'
import React from 'react'

type Props = {}

const SearchPage = (props: Props) => {
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
          options={['Comedy', 'Action']}
        />

        {/* SUBMIT */}
        <Button
          title='Filter'
          type='submit'
          bgColor='highlightedColor'
          bgHoverColor='highlightedColorHover'
          paddingX='8'
        />

      </form>

      {/* RESULTS */}

      {/* PAGINATION */}

    </div>
  )
}

export default SearchPage