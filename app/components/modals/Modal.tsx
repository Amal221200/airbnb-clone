"use client";
import { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button';
interface ModalProps {
    title: string,
    actionLabel: string,
    onSubmit: () => void,
    onClose: () => void,
    isOpen?: boolean,
    disabled?: boolean,
    body?: React.ReactElement,
    footer?: React.ReactElement,
    secondaryAction?: () => string,
    secondaryActionLabel?: string
}

const Modal: React.FC<ModalProps> = ({ title, actionLabel, onClose, onSubmit, isOpen, disabled, body, footer, secondaryAction, secondaryActionLabel }) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return
        }
        setShowModal(false);
        setTimeout(() => {
            onClose()
        }, 300)
    }, [isOpen, disabled])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return
        }
        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return null
        }
        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null
    }

    return (
        <>
            <div className="fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto xl:h-auto">
                    {/* Content */}
                    <div className={`transition duration-300 origin-[0] h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        <div className='transition h-full lg:h-auto md:h-auto border-[0] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus-within:outline-none'>
                            {/* Header */}
                            <header className='flex items-center rounded-t justify-center relative border-b-[1px] p-6'>
                                <button onClick={handleClose} type='button' className='p-1 border-0 hover:opacity-70 transition absolute left-9'>
                                    <IoMdClose size={18} />
                                </button>
                                <h3 className="text-lg font-semibold">
                                    {title}
                                </h3>
                            </header>
                            {/* Body */}
                            <main className='relative p-6 flex-auto'>
                                {body}
                            </main>

                            {/* Footer */}
                            <footer className='flex flex-col gap-2 p-6'>
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction && secondaryActionLabel && (
                                    <Button disabled={disabled} outline label={secondaryActionLabel} onClick={handleSecondaryAction} />
                                    )}
                                    <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
                                </div>
                                {footer}
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Modal