
import React from 'react'

type Props = {}

const LoadingPage = (props: Props) => {
    return (
        <div className='w-full h-full flexCenterCenter'>

            <span className="loading loading-spinner w-16 text-highlightedColor"></span>

        </div>
    )
}

export default LoadingPage