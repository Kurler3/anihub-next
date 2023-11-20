'use client'

import { SelectOption } from '@/types';
import { useMemo, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
    formInputName: string;
    options: SelectOption[];
    placeholderText: string;
    type: string;
    defaultOptions: string[];
}

const MultiSelectDropdown = ({ formInputName, options, placeholderText, type, defaultOptions }: IProps) => {

    const defaultSelectedOptions = useMemo(() => {

        const result = [];

        for (const selectedOption of defaultOptions) {
            const optionFound = options.find((option) => option.id === selectedOption);
            if (optionFound) {
                result.push(optionFound);
            }
        }

        return result;
    }, [defaultOptions, options])

    //////////////////////////////////
    // STATE /////////////////////////
    //////////////////////////////////

    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(defaultSelectedOptions);

    //////////////////////////////////
    // FUNCTIONS /////////////////////
    //////////////////////////////////

    const handleCheckboxChange: (option: SelectOption) => void = (option: SelectOption) => {

        const isSelected = selectedOptions.find((selectedOption) => selectedOption.id === option.id)

        if (isSelected) {
            setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    // const handleSelectUnselectAll = () => {

    //     setSelectedOptions((prevSelectedOptions) => {
    //         return prevSelectedOptions.length > 0 ? [] : options;
    //     })

    // }

    const displayText = useMemo(() => {

        if (selectedOptions.length > 1) {
            return `${selectedOptions.length} ${type}s selected`;
        } else if (selectedOptions.length === 1) {
            return selectedOptions[0].name;
        } else return placeholderText;

    }, [placeholderText, selectedOptions, type])


    /////////////////////////////
    // RENDER ///////////////////
    /////////////////////////////

    return (
        <div className='dropdown w-48'>
            <div
                tabIndex={0}
                className={` flexCenterCenter bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-placeholderColor w-full shadow-sm ${selectedOptions.length > 0 ? 'fullHighlightedShadow' : ''} transition `}
            >
                <div className='w-full flex justify-between items-center'>

                    <div>
                        {displayText}
                    </div>

                    <ExpandMoreIcon className='text-sm' />
                </div>


            </div>
            <div
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow rounded-box bg-bgLight mt-2 flex flex-col text-sm"
            >

                {/* SELECT / UNSELECT ALL */}
                {/* <div className="flex items-center py-2 px-4">
                    <input
                        type="checkbox"
                        name={formInputName}
                        className="mr-2"
                        id={`${type}_select_all`}
                        value=''
                        checked={selectedOptions.length === options.length}
                        onChange={handleSelectUnselectAll}
                    />
                    <label htmlFor={`${type}_select_all`} className="text-placeholderColor hover:text-highlightedHover transition">
                        Select all {type}s
                    </label>
                </div> */}

                {/* OPTIONS */}
                {options.map((option) => {

                    const isSelected = selectedOptions.find((item) => item.id === option.id) !== undefined;

                    return (
                        <div key={option.id} className="flex items-center py-2 px-4">
                            <input
                                type="checkbox"
                                name={formInputName}
                                className="mr-2"
                                id={option.id}
                                value={option.id}
                                checked={isSelected}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <label htmlFor={option.id} className="text-placeholderColor hover:text-highlightedHover transition">
                                {option.name}
                            </label>
                        </div>
                    )

                })}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
