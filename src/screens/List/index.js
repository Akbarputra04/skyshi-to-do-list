import { useEffect, useState } from 'react';
import { BsPencil, BsPlusLg, BsChevronLeft } from 'react-icons/bs'
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../API';
import empty from '../../assets/list-empty.png'
import { Button, EmptyState, FormModal, Header, Sorter, TodoItem, Alert } from '../../components';

const List = () => {
    const navigate = useNavigate()

    const { id } = useParams();

    const priorityConfig = {
        "very-high": 1,
        "high": 2,
        "normal": 3,
        "low": 4,
        "very-low": 5,
    }

    const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState({todo_items: []})

    const [newActivityTitle, setNewActivityTitle] = useState('')

    const [modalShow, setModalShow] = useState(false)
	const [alertShow, setAlertShow] = useState(false)

    useEffect(() => {
        API.get(`activity-groups/${id}`)
        .then(res => {
            // sorting
            res.data.todo_items.sort((a, b) => priorityConfig[a.priority] - priorityConfig[b.priority])
            
            setData(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }, [isLoading])

    const saveTitle = e => {
        e.preventDefault()

        API.patch(`activity-groups/${id}`, {title: newActivityTitle})
        .then(() => setIsLoading(true))
		.catch(err => console.log(err))
        .finally(() => setNewActivityTitle(''))
    }

    const showModal = () => {
        setModalShow(true)
    }

  return (
    <>
			{/* header */}
			<Header title={data.title} />
			{/* content */}
			<div className="min-h-screen px-5 pt-24 md:px-56 md:pt-36 pb-7 h-full flex flex-col gap-6">
                <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between">
                    <div className="w-full md:w-fit flex items-center border-b border-[#D8D8D8]">
                        <div className="flex items-center gap-6">
                            <button className="hidden md:block" onClick={() => navigate(-1)}><BsChevronLeft size={24} /></button>
                            <input type="text" name="title" id="title" placeholder="New Activity Name" className="flex-1 p-2.5 font-semibold md:text-4xl focus:outline-none" value={newActivityTitle || data.title} onChange={e => setNewActivityTitle(e.target.value)} data-cy="todo-title-input" />
                        </div>
                        <label htmlFor="title" data-cy="todo-title-edit-button"><BsPencil color="#D8D8D8" onClick={newActivityTitle ? saveTitle : null} /></label>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Sorter data={data} setData={setData} />
                        <Button type="primary" icon={<BsPlusLg/>} text="Tambah" onClick={showModal} cy="todo-add-button" />
                    </div>
                </div>
                {data.todo_items.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                        {data.todo_items.map(d => (
                            <TodoItem key={d.id} id={d.id} title={d.title} priority={d.priority} active={d.is_active} setAlertShow={setAlertShow} setIsLoading={setIsLoading} />
                        ))}
                    </div>
                ) : <EmptyState image={empty} text="Buat List Item kamu" cy="todo-empty-state" /> }
			</div>
            {/* modal */}
            <FormModal show={modalShow} onClose={() => setModalShow(false)} id={id} setIsLoading={setIsLoading} />
            {/* alert */}
            <Alert show={alertShow} setShow={setAlertShow} isActivity={false} />
		</>
	)
};

export default List;
