


import React from 'react'

type Props = {
    modalId: string;
    title: string;
    children: React.ReactNode;
}

const Modal = ({ modalId, title, children }: Props) => {
    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="py-4">
                    {
                        children
                    }
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default Modal