

import React from 'react'

type Props = {
    message: string;
    type?: 'error' | 'success' | 'warning';
}

const Alert = ({ message, type }: Props) => {

    let alertType = 'alert-warning';

    if (type) {
        if (type === 'error') alertType = 'alert-error';
        if (type === 'success') alertType = 'alert-success';
        if (type === 'warning') alertType = 'alert-warning';
    }

    return (
        <div className={`alert ${alertType} p-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span className='text-sm'>{message}</span>
        </div>
    )
}

export default Alert