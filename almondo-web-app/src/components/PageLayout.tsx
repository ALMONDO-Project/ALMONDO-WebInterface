import { useSidebarState } from "../hooks/useSidebarState";
import ActionButton from "./buttons/ActionButton";
import Sidebar from "./Sidebar";
import modules from "../modules/index";

const PageLayout = () => {
  const { isOpen, updateSidebarState } = useSidebarState();

  return (
    <div className="relative h-screen bg-[#F1F1EF]">
      <div className="w-full h-full">
        {modules
          .find((component) => component.name === "network visualizer")
          ?.component()}
      </div>
      <Sidebar isOpen={isOpen} />
      <ActionButton handleAction={updateSidebarState} />
    </div>
  );
};

export default PageLayout;
