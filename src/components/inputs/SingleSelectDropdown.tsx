'use client'
import { SelectOption } from '@/types';
import { useMemo, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface IProps {
    formInputName: string;
    options: SelectOption[];
    placeholderText: string;
    type: string;
    defaultOption?: string;
}

const SingleSelectDropdown = ({ formInputName, options, placeholderText, defaultOption }: IProps) => {

    const defaultSelectedOption = defaultOption ? options.find((option) => option.id === defaultOption) ?? null : null;

    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(defaultSelectedOption);

    const handleRadioChange = (option: SelectOption) => {
        setSelectedOption(option);
    };

    const displayText = useMemo(() => {
        return selectedOption ? selectedOption.name : placeholderText;
    }, [placeholderText, selectedOption]);

    const handleClearSelection = () => {
        setSelectedOption(null);
    };

    return (
        <div className='dropdown w-48'>
            <div
                tabIndex={0}
                className={` flexCenterCenter bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-placeholderColor w-full shadow-sm ${selectedOption ? 'fullHighlightedShadow' : ''
                    } transition `}
            >
                <div className='w-full flex justify-between items-center'>
                    <div>{displayText}</div>
                    <ExpandMoreIcon className='text-sm' />
                </div>
            </div>
            <div tabIndex={0} className='dropdown-content z-[1] p-2 shadow rounded-box bg-bgLight mt-2 flex flex-col text-sm'>
                {/* Clear Selection Button */}
                {selectedOption && (
                    <div className='flex items-center py-2 px-4'>
                        <button
                            type='button'
                            className='text-placeholderColor hover:text-highlightedHover transition'
                            onClick={handleClearSelection}
                        >
                            Clear Selection
                        </button>
                    </div>
                )}

                {/* OPTIONS */}
                {options.map((option) => {
                    const isSelected = selectedOption?.id === option.id;

                    return (
                        <div key={option.id} className='flex items-center py-2 px-4'>
                            <input
                                type='radio'
                                name={formInputName}
                                className='mr-2'
                                id={option.id}
                                value={option.id}
                                checked={isSelected}
                                onChange={() => handleRadioChange(option)}
                            />
                            <label htmlFor={option.id} className='text-placeholderColor hover:text-highlightedHover transition'>
                                {option.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SingleSelectDropdown;
