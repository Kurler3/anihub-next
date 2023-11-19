'use client'
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface MultiSelectDropdownProps {
    options: string[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const handleCheckboxChange = (option: string) => {
        if (selectedItems.includes(option)) {
            setSelectedItems(selectedItems.filter((item) => item !== option));
        } else {
            setSelectedItems([...selectedItems, option]);
        }
    };

    return (
        <div className="my-4 dropdown h-[42px]">
            <label
                tabIndex={0}
                className="h-full flex justify-between items-center text-sm font-medium text-placeholderColor bg-bgLight p-3 rounded-md text-[12px] focus:outline-none  w-48 shadow-md"
            >
                <div className="text-xs">Select genres</div>
                <ExpandMoreIcon />
            </label>

            <div className="relative dropdown-content bg-bgLight p-3 rounded-md text-[12px] focus:outline-none text-white w-48 shadow-md overflow-hidden">
                {options.map((option) => (
                    <div key={option} className="flex items-center">
                        <input
                            type="checkbox"
                            name='genre'
                            checked={selectedItems.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            className="mr-2"
                        />
                        <span>{option}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
