import modules from "../modules/index"

const Sidebar = ({isOpen} : {isOpen: boolean}) => {
    return (
        <div className={`transition-[width] duration-500 ease-in-out absolute top-0 left-0 ${isOpen ? 'w-1/3': 'w-0'} pt-20 h-full z-10 border border-gray-300 rounded-tr-xl shadow-lg/20 bg-[#FFFFFF] overflow-hidden`}>
            <div className={`transition-[width,opacity,visibility] duration-500 ease-in-out ${isOpen ? 'w-full opacity-100 visible': 'w-0 opacity-0 invisible'} h-full flex flex-col justify-between`}>
                {modules.find(component => component.name === 'configurator')?.component()}
            </div>
        </div>
    )
}

export default Sidebar