

import React from 'react'
import Modal from './Modal'
import { LOADING_MODAL_ID } from '@/lib/constants/common.constants'

const LoadingModal = () => {
    return (
        <Modal
            title='Loading :)'
            modalId={LOADING_MODAL_ID}
            disableClose
        >
            <div className='w-full h-full flexCenterCenter'>

                <span className="loading loading-spinner w-16 text-highlightedColor"></span>

            </div>
        </Modal>
    )
}

export default LoadingModal