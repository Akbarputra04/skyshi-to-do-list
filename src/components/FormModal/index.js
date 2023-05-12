import { useEffect, useState } from 'react'
import { BsCheck, BsDot, BsX } from "react-icons/bs"
import { Button } from ".."
import Select from 'react-select'
import API from '../../API';

const FormModal = ({show, onClose, id, data, setIsLoading}) => {
    const [open, setOpen] = useState(false)

      const togglePriorityList = () => {
        setOpen(!open)
    }

      const [form, setForm] = useState({name: data?.title || '', priority: data?.priority || 'very-high'})

      const createItem = () => {
        API.post('todo-items', {
            activity_group_id: id,
            title: form.name,
            priority: form.priority
        })
		.then(() => {
            setForm({name: '', priority: 'very-high'})
            onClose()
        })
		.catch(err => console.log(err))
        .finally(() => setIsLoading(true))
      }

      const editItem = () => {
        API.patch(`todo-items/${id}`, {
            title: form.name,
            priority: form.priority
        })
		.then(() => {
            setForm({name: '', priority: 'very-high'})
            onClose()
        })
		.catch(err => console.log(err))
        .finally(() => setIsLoading(true))
      }

    return (
        <>
            <div className={`absolute top-0 left-0 h-screen w-screen bg-black/50 z-20 ${show ? 'block' : 'hidden'}`} onClick={onClose}>
            </div>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8/12 md:w-4/12 bg-white rounded-xl drop-shadow-lg z-20 ${show ? 'block' : 'hidden'}`} data-cy="modal-add">
                <div className="px-5 py-4 border-b border-[#e5e5e5] flex items-center justify-between font-semibold text-base md:text-lg" data-cy="modal-add-title">
                    {data ? 'Sunting' : 'Tambah'} List Item
                    <BsX color="#e5e5e5" size="18" onClick={onClose} data-cy="modal-add-close-button" />
                </div>
                <div className="px-5 py-6 flex flex-col gap-6">
                <label className="block">
                    <span className="block text-[10px] md:text-xs font-semibold" data-cy="modal-add-name-title">NAMA LIST ITEM</span>
                    <input type="text" name="name" placeholder="Tambahkan nama list item" className="mt-3 block w-full px-3 py-2 bg-white border border-[#e5e5e5] rounded-md text-sm md:text-base shadow-sm placeholder-[#a4a4a4]
                    focus:outline-none focus:border-primary
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-danger invalid:text-danger
                    focus:invalid:border-danger focus:invalid:ring-danger
                    " value={form.name} onChange={e => setForm({...form, name: e.target.value})} data-cy="modal-add-name-input" />
                </label>
                <label className="block" data-cy="modal-add-priority-dropdown">
                    <span className="block text-[10px] md:text-xs font-semibold" data-cy="modal-add-priority-title">PRIORITY</span>
                    <input type="text" name="name" placeholder="Pilih priority" className="mt-3 block w-full px-3 py-2 bg-white border border-[#e5e5e5] rounded-md text-sm md:text-base shadow-sm placeholder-[#a4a4a4]
                    focus:outline-none focus:border-primary
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-danger invalid:text-danger
                    focus:invalid:border-danger focus:invalid:ring-danger
                    " value={form.priority} contentEditable={false} onClick={togglePriorityList} data-cy="modal-add-name-input" />
                    <div className={`absolute w-max bg-white drop-shadow-lg rounded z-10 mt-3 ${!open ? 'hidden' : 'block'} `} data-cy="modal-add-priority-item">
                        <button onClick={() => {setForm({...form, priority : 'very-high'}); togglePriorityList()}} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-latest">
                            <div className="flex items-center gap-3 text-xs md:text-base">
                                <BsDot style={{transform: 'scale(5)'}} color="#ED4C5C" />
                                Very High
                            </div>
                            <BsCheck color="#4a4a4a" className={`ml-3 ${form.priority === 'very-high' ? 'opacity-1' : 'opacity-0'}`} />
                        </button>
                        <button onClick={() => {setForm({...form, priority : 'high'}); togglePriorityList()}} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-latest">
                            <div className="flex items-center gap-3 text-xs md:text-base">
                                <BsDot style={{transform: 'scale(5)'}} color="#F8A541" />
                                High
                            </div>
                            <BsCheck color="#4a4a4a" className={`ml-3 ${form.priority === 'high' ? 'opacity-1' : 'opacity-0'}`} />
                        </button>
                        <button onClick={() => {setForm({...form, priority : 'normal'}); togglePriorityList()}} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-latest">
                            <div className="flex items-center gap-3 text-xs md:text-base">
                                <BsDot style={{transform: 'scale(5)'}} color="#00A790" />
                                Normal
                            </div>
                            <BsCheck color="#4a4a4a" className={`ml-3 ${form.priority === 'normal' ? 'opacity-1' : 'opacity-0'}`} />
                        </button>
                        <button onClick={() => {setForm({...form, priority : 'low'}); togglePriorityList()}} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-latest">
                            <div className="flex items-center gap-3 text-xs md:text-base">
                                <BsDot style={{transform: 'scale(5)'}} color="#428BC1" />
                                Low
                            </div>
                            <BsCheck color="#4a4a4a" className={`ml-3 ${form.priority === 'low' ? 'opacity-1' : 'opacity-0'}`} />
                        </button>
                        <button onClick={() => {setForm({...form, priority : 'very-low'}); togglePriorityList()}} className="w-full px-4 py-2.5 flex items-center justify-between border-b border-[#e5e5e5]" data-cy="sort-selection-latest">
                            <div className="flex items-center gap-3 text-xs md:text-base">
                                <BsDot style={{transform: 'scale(5)'}} color="#8942C1" />
                                Very Low
                            </div>
                            <BsCheck color="#4a4a4a" className={`ml-3 ${form.priority === 'very-low' ? 'opacity-1' : 'opacity-0'}`} />
                        </button>
                    </div>
                    {/* <Select
                        name="priority"
                        defaultValue={form.priority}
                        options={options}
                        styles={optionStyle}
                        className="md:w-fit md:text-base"
                        onChange={val => setForm({...form, priority: val})}
                    /> */}
                </label>
                </div>
                <div className="px-5 py-4 border-t border-[#e5e5e5] flex justify-end">
                    <Button type="primary" text="Simpan" className="md:px-9" disabled={!form.name} onClick={data ? editItem : createItem} cy="modal-add-save-button" />
                </div>
            </div>
        </>
    )
}

export default FormModal