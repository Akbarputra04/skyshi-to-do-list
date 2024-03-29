import { createContext, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs'
import API from '../../API';
import empty from '../../assets/home-empty.png'
import { ActivityCard, Alert, Button, DeleteModal, EmptyState, Header } from '../../components';

export const HomeContext = createContext({
	setDeleteShow: (state) => {},
	setCurrentData: (state) => {},
})

const Home = () => {

	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [currentData, setCurrentData] = useState({})

	const [alertShow, setAlertShow] = useState(false)
	const [deleteShow, setDeleteShow] = useState(false)

	useEffect(() => {
		API.get('activity-groups?email=email@mail.com')
			.then(res => setData(res.data.data))
			.catch(err => console.log(err))
			.finally(() => setIsLoading(false))
	}, [isLoading])

	const createActivity = () => {
		API.post('activity-groups', {
			title: "New Activity",
    		email: "email@mail.com"
		})
		.then(() => setIsLoading(true))
		.catch(err => console.log(err))
	}

	const deleteActivity = () => {
        API.delete(`activity-groups/${currentData.id}`)
        .then(() => {
            setDeleteShow(false)
            setAlertShow(true)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(true))
    }

  return (
    <HomeContext.Provider value={{setDeleteShow, setCurrentData}}>
			{/* header */}
			<Header title="TO DO LIST APP" isHome />
			{/* content */}
			<div className="min-h-screen px-5 pt-24 md:px-56 md:pt-36 pb-7 h-full flex flex-col gap-9">
				<div className="flex justify-between items-center">
					<h1 className="font-bold md:text-4xl" data-cy="activity-title">Activity</h1>
					<Button type="primary" icon={<BsPlusLg/>} text="Tambah" onClick={createActivity} cy="activity-add-button" />
				</div>
				{data.length > 0 ? (
					<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
						{data.map(d => (
							<ActivityCard key={d.id} id={d.id} title={d.title} date={d.updated_at} setAlertShow={setAlertShow} setIsLoading={setIsLoading} />
						))}
					</div>
				) : <EmptyState image={empty} text="Buat activity pertamamu" cy="activity-empty-state" />}
			</div>
			{/* delete modal */}
            <DeleteModal show={deleteShow} onClose={() => setDeleteShow(false)} text={currentData.title} confirmHandler={deleteActivity} />
            {/* alert */}
            <Alert show={alertShow} setShow={setAlertShow} />
		</HomeContext.Provider>
	)
};

export default Home;
