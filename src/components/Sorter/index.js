import { useState } from "react"
import { BsArrowDownUp, BsCheck, BsSortAlphaDown, BsSortAlphaUp, BsSortDown, BsSortUp } from "react-icons/bs"

const Sorter = ({data, setData}) => {
    const [open, setOpen] = useState(false)

    const toggleSortList = () => {
        setOpen(!open)
    }

    const [sorting, setSorting] = useState()

    const sortItem = type => {
        setSorting(type)
        setOpen(false)
        if (type === 0) {
            setData({...data, todo_items: data.todo_items.sort((a, b) => b.id - a.id)})
        }
        if (type === 1) {
            setData({...data, todo_items: data.todo_items.sort((a, b) => a.id - b.id)})
        }
        if (type === 2) {
            setData({...data, todo_items: data.todo_items.sort((a, b) => a.title - b.title)})
        }
        if (type === 3) {
            setData({...data, todo_items: data.todo_items.sort((a, b) => b.title - a.title)})
        }
        if (type === 4) {
            setData({...data, todo_items: data.todo_items.sort((a, b) => b.is_active - a.is_active)})
        }
    }

    return (
        <div className="relative">
            <button onClick={toggleSortList} className="px-3 py-3 border rounded-full flex gap-1.5 items-center font-semibold text-xs text-[#888888]" data-cy="todo-sort-button">
                <BsArrowDownUp className="md:w-6 md:h-6" />
            </button>
            <div className={`absolute right-0 w-max bg-white drop-shadow-lg rounded z-10 mt-3 ${!open ? 'hidden' : 'block'} `}>
                <button onClick={() => sortItem(0)} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-latest">
                    <div className="flex items-center gap-3 text-xs md:text-base">
                        <BsSortDown className="text-primary" />
                        Terbaru
                    </div>
                    <BsCheck color="#4a4a4a" className={`ml-3 ${sorting === 0 ? 'opacity-1' : 'opacity-0'}`} />
                </button>
                <button onClick={() => sortItem(1)} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-oldest">
                    <div className="flex items-center gap-3 text-xs md:text-base">
                        <BsSortUp className="text-primary" />
                        Terlama
                    </div>
                    <BsCheck color="#4a4a4a" className={`ml-3 ${sorting === 1 ? 'opacity-1' : 'opacity-0'}`} />
                </button>
                <button onClick={() => sortItem(2)} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-az">
                    <div className="flex items-center gap-3 text-xs md:text-base">
                        <BsSortAlphaUp className="text-primary" />
                        A-Z
                    </div>
                    <BsCheck color="#4a4a4a" className={`ml-3 ${sorting === 2 ? 'opacity-1' : 'opacity-0'}`} />
                </button>
                <button onClick={() => sortItem(3)} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-za">
                    <div className="flex items-center gap-3 text-xs md:text-base">
                        <BsSortAlphaDown className="text-primary" />
                        Z-A
                    </div>
                    <BsCheck color="#4a4a4a" className={`ml-3 ${sorting === 3 ? 'opacity-1' : 'opacity-0'}`} />
                </button>
                <button onClick={() => sortItem(4)} className="w-full px-4 py-2.5 flex items-center justify-between" data-cy="sort-selection-not-finished">
                    <div className="flex items-center gap-3 text-xs md:text-base">
                        <BsArrowDownUp className="text-primary" />
                        Belum Selesai
                    </div>
                    <BsCheck color="#4a4a4a" className={`ml-3 ${sorting === 4 ? 'opacity-1' : 'opacity-0'}`} />
                </button>
            </div>
        </div>
    )
}

export default Sorter