import { useEffect, useState } from 'react'
import { BsCheck, BsX } from "react-icons/bs"
import { Button } from ".."
import Select from 'react-select'
import API from '../../API';

const FormModal = ({show, onClose, id, data, setIsLoading}) => {
    const options = [
        { value: 'very-high', label: 'Very High', color: '#ED4C5C' },
        { value: 'high', label: 'High', color: '#F8A541' },
        { value: 'normal', label: 'Normal', color: '#00A790' },
        { value: 'low', label: 'Low', color: '#428BC1' },
        { value: 'very-low', label: 'Very Low', color: '#8942C1' },
      ]

    const dot = (size = 14, color = 'transparent', isSelected) => ({
        alignItems: 'center',
        display: 'flex',
        background: 'none',
        color: 'black',
      
        ':before': {
          backgroundColor: color,
          borderRadius: "50%",
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: size,
          width: size,
        },

        ':after': {
          content: isSelected ? '"✓"' : '""',
          display: 'block',
          marginLeft: 'auto',
          color: '#4a4a4a',
        },
      });
      
      const optionStyle: StylesConfig<ColourOption> = {
        control: (styles) => ({ ...styles, marginTop: 12, backgroundColor: 'white' }),
        input: (styles) => ({ ...styles, ...dot() }),
        option: (styles, { data, isSelected }) => ({ ...styles, ...dot(14, data.color, isSelected) }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(8, data.color) }),
      };

      const [form, setForm] = useState({name: data?.title || '', priority: data ? options.find(o => o.value === data.priority) : options[0]})

      const createItem = () => {
        API.post('todo-items', {
            activity_group_id: id,
            title: form.name,
            priority: form.priority.value
        })
		.then(() => {
            setForm({name: '', priority: options[0]})
            onClose()
        })
		.catch(err => console.log(err))
        .finally(() => setIsLoading(true))
      }

      const editItem = () => {
        API.patch(`todo-items/${id}`, {
            title: form.name,
            priority: form.priority.value
        })
		.then(() => {
            setForm({name: '', priority: options[0]})
            onClose()
        })
		.catch(err => console.log(err))
        .finally(() => setIsLoading(true))
      }

    return (
        <div className={`fixed top-0 left-0 h-screen w-screen z-20 ${show ? 'block' : 'hidden'}`}>
            <div className="absolute top-0 left-0 h-screen w-screen bg-black/50" onClick={onClose}>
            </div>
            <div className="h-full flex items-center justify-center">
                <div className="w-8/12 md:w-4/12 bg-white rounded-xl drop-shadow-lg" data-cy="modal-add">
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
                    <label className="block">
                        <span className="block text-[10px] md:text-xs font-semibold" data-cy="modal-add-priority-title">PRIORITY</span>
                        <Select
                            name="priority"
                            defaultValue={form.priority}
                            options={options}
                            styles={optionStyle}
                            className="md:w-fit md:text-base"
                            onChange={val => setForm({...form, priority: val})}
                            data-cy="modal-add-priority-input"
                        />
                    </label>
                    </div>
                    <div className="px-5 py-4 border-t border-[#e5e5e5] flex justify-end">
                        <Button type="primary" text="Simpan" className="md:px-9" disabled={!form.name} onClick={data ? editItem : createItem} data-cy="modal-add-button" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormModal