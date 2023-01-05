const index = ({image, text, cy}) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center gap-6" cy={cy}>
            <img src={image} alt="empty state" />
            <p className="font-semibold text-center">{text}</p>
        </div>
    )
}

export default index