import { BsChevronLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const Header = ({title, isHome}) => {
    const navigate = useNavigate()
    return (
        <div className="fixed top w-full px-5 py-4 md:px-56 md:py-9 bg-primary flex items-center gap-3 font-bold text-lg md:text-2xl text-white z-10">
            {!isHome && <button onClick={() => navigate(-1)}><BsChevronLeft/></button>}
            {title}
        </div>
    )
}

export default Header