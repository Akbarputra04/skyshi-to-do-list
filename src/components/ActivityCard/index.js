import moment from "moment/moment"
import { useState } from "react"
import { BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"
import API from "../../API"
import Alert from "../Alert"
import DeleteModal from "../DeleteModal"

const Activity = ({id, title, date, setAlertShow, setIsLoading}) => {
    
    const [show, setShow] = useState(false)

    const deleteActivity = () => {
        API.delete(`activity-groups/${id}`)
        .then(() => {
            setShow(false)
            setAlertShow(true)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(true))
    }

    return (
        <>
            <Link to={`/list/${id}`} className="p-4 rounded-xl bg-white drop-shadow-lg h-[150px] md:h-[234px]" data-cy="activity-item">
                <div className="h-full flex flex-col justify-between items-start">
                    <h4 className="font-bold text-sm md:text-lg" data-cy="activity-item-title">{title}</h4>
                    <div className="w-full flex justify-between items-center text-[#888888]">
                        <p className="font-medium text-xs md:text-sm" data-cy="activity-item-date">{moment(date).format('LL')}</p>
                        <button onClick={e => {e.preventDefault();setShow(true)}} data-cy="activity-item-delete-button"><BsTrash/></button>
                    </div>
                </div>
            </Link>
            {/* modal */}
            <DeleteModal show={show} onClose={() => setShow(false)} text={title} confirmHandler={deleteActivity} />
        </>
    )
}

export default Activity