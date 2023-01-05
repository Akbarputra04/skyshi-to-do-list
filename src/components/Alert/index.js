import { useEffect, useState } from "react"
import { BsExclamationCircle } from "react-icons/bs"

const Alert = ({show, setShow, isActivity = true}) => {    
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }, [show])

    return (
        <div className={`fixed bottom-5 left-0 w-full flex justify-center z-20 ${show ? 'block' : 'hidden'}`}>
            <div className="w-8/12 px-6 py-4 flex items-center gap-2.5 bg-white rounded-xl drop-shadow-lg">
                <BsExclamationCircle size={18} className="text-success" data-cy="modal-information-icon" />
                <p className="font-medium text-sm" data-cy="modal-information-title">{isActivity ? 'Activity' : 'Item'} berhasil dihapus</p>
            </div>
        </div>
    )
}

export default Alert