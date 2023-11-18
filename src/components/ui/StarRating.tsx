// StarRating.js

import React from 'react';

interface IProps {
    rating: number;
}

const StarRating = ({ rating }: IProps) => {
    const maxStars = 5;
    const normalizedRating = rating / 2; // Normalize the rating to fit a 5-star scale

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <span
                    key={i}
                    className={`cursor-pointer ${i <= normalizedRating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return <div className="flex">{renderStars()}</div>;
};

export default StarRating;