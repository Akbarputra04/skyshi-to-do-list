import { useContext, useState } from 'react'
import { BsPencil, BsTrash } from "react-icons/bs"
import API from '../../API';
import { ListContext } from '../../screens/List';

const TodoItem = ({id, title, priority, active, setAlertShow, setIsLoading}) => {
    const priorityConfig = {
        "very-high": 'bg-danger',
        "high": 'bg-orange',
        "normal": 'bg-success',
        "low": 'bg-info',
        "very-low": 'bg-purple',
    }

    const parentContext = useContext(ListContext)

    const [show, setShow] = useState(false)

    const changeStatus = () => {
        API.patch(`todo-items/${id}`, {is_active: !active})
        .then(() => setIsLoading(true))
        .catch(err => console.log(err))
    }

    const handleClickDelete = e => {
        e.preventDefault()
        parentContext.setDeleteShow(true)
        API.get(`todo-items/${id}`)
        .then((data) => {
            parentContext.setCurrentData({id: data.data.id, title: data.data.title})
        })
    }

    const handleClickEdit = e => {
        e.preventDefault()
        parentContext.setModalShow(true)
        API.get(`todo-items/${id}`)
        .then((data) => {
            parentContext.setCurrentData({title: data.data.title, priority: data.data.priority})
        })
    }

    return (
        <div className="px-5 py-4 flex items-center justify-between bg-white rounded-xl drop-shadow-lg" data-cy="todo-item">
            <div className="flex items-center gap-3.5 md:gap-5">
                <input type="checkbox" className="checked:bg-primary md:w-5 md:h-5" checked={!active} onChange={changeStatus} data-cy="todo-item-checkbox" />
                <div className={`w-[5px] h-[5px] md:w-[9px] md:h-[9px] rounded-full ${priorityConfig[priority]}`} data-cy="todo-item-priority-indicator"></div>
                <div className={`flex items-center gap-2 md:gap-6 font-medium text-sm md:text-lg ${!active ? 'line-through' : ''} text-[#c4c4c4]`}>
                    <span data-cy="todo-item-title">{title}</span>
                    <BsPencil color="#888888" data-cy="todo-item-edit-button" onClick={handleClickEdit} />
                </div>
            </div>
            <button onClick={handleClickDelete} data-cy="todo-item-delete-button"><BsTrash/></button>
        </div>
    )
}

export default TodoItem