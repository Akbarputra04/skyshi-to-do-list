const index = ({icon, text, type, className, disabled, onClick, cy}) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`px-3.5 py-3 bg-${type} ${disabled ? 'opacity-20' : ''} rounded-full flex gap-1.5 md:gap-2 items-center justify-center font-semibold text-xs md:text-lg text-${type === 'secondary' ? 'black' : 'white'} ${className}`} data-cy={cy}>
            {icon}
            {text}
        </button>
    )
}

export default index