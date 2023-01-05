import { BsExclamationTriangle } from "react-icons/bs"
import { Button } from ".."

const DeleteModal = ({show, onClose, text, isActivity = true, confirmHandler}) => {
    return (
        <div className={`fixed top-0 left-0 h-screen w-screen z-20 ${show ? 'block' : 'hidden'}`}>
            <div className="absolute top-0 left-0 h-screen w-screen bg-black/50 md:bg-black/30" onClick={onClose}>
            </div>
            <div className="h-full flex items-center justify-center" data-cy="modal-delete">
                <div className="w-9/12 md:w-4/12 p-9 bg-white flex flex-col items-center gap-10 rounded-xl drop-shadow-lg">
                    <BsExclamationTriangle size={46} className="text-danger" data-cy="modal-delete-title" />
                    <p className="font-medium text-sm md:text-lg text-center" data-cy="modal-delete-title">Apakah anda yakin menghapus {isActivity ? 'activity' : 'item'} <span className="font-bold">“{text}”?</span></p>
                    <div className="w-full flex items-center gap-2.5">
                        <Button type="secondary" text="Batal" className="flex-1 bg-secondary" onClick={onClose} cy="modal-delete-cancel-button" />
                        <Button type="danger" text="Hapus" className="flex-1" onClick={confirmHandler} cy="modal-delete-confirm-button" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal