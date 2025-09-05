import buttonIcon from "../../assets/monitor-icon.png";

const MonitorButton = ({handleOpen} : {handleOpen: Function}) => {
    return (
        <div className="inline-block m-4 absolute bottom-0 right-0 z-20">
            <button onClick={() => handleOpen()} className="w-10 p-2 bg-zinc-300 hover:bg-zinc-400 hover:cursor-pointer border rounded-full border-none shadow-xl/20">
                <img src={buttonIcon} />
            </button>
        </div>
    )
}

export default MonitorButton;