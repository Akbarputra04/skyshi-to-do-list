import moment from "moment/moment"
import { useContext } from "react"
import { BsTrash } from "react-icons/bs"
import { Link } from "react-router-dom"
import API from "../../API"
import { HomeContext } from "../../screens/Home"

const Activity = ({id, title, date}) => {
    
    const parentContext = useContext(HomeContext)

    const handleClickDelete = e => {
        e.preventDefault()
        parentContext.setDeleteShow(true)
        API.get(`activity-groups/${id}`)
        .then((data) => {
            parentContext.setCurrentData({id: data.data.id, title: data.data.title})
        })
    }

    return (
        <Link to={`/list/${id}`} className="p-4 rounded-xl bg-white drop-shadow-lg h-[150px] md:h-[234px]" data-cy="activity-item">
            <div className="h-full flex flex-col justify-between items-start">
                <h4 className="font-bold text-sm md:text-lg" data-cy="activity-item-title">{title}</h4>
                <div className="w-full flex justify-between items-center text-[#888888]">
                    <p className="font-medium text-xs md:text-sm" data-cy="activity-item-date">{moment(date).format('LL')}</p>
                    <button onClick={handleClickDelete} data-cy="activity-item-delete-button"><BsTrash/></button>
                </div>
            </div>
        </Link>
    )
}

export default Activity