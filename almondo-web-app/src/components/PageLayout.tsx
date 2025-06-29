import { useSidebarState } from "../hooks/useSidebarState"
import ActionButton from "./buttons/ActionButton"
import Sidebar from "./Sidebar";

const PageLayout = () => {
    const {isOpen, updateSidebarState} = useSidebarState();

    return (
        <div className="relative h-screen bg-[#F1F1EF]">
            <Sidebar isOpen={isOpen} />
            <ActionButton handleAction={updateSidebarState}/>
        </div>
    )
}

export default PageLayout