import { useSidebarState } from "../hooks/useSidebarState";
import ActionButton from "./buttons/ActionButton";
import Sidebar from "./Sidebar";
import modules from "../modules/index";
import MonitorButton from "./buttons/MonitorButton";
import { useMonitorPanel } from "../hooks/useMonitorPanel";
import MonitorPanel from "./MonitorPanel";

const PageLayout = () => {
  const { isOpen, updateSidebarState } = useSidebarState();
  const {isOpenPanel, updateMonitorPanelState, messages, clearAllMessages} = useMonitorPanel();

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="absolute inset-0 overflow-y-auto">
        {modules
          .find((component) => component.name === "visualizer")
          ?.component()}
      </div>
      <Sidebar isOpen={isOpen} />
      <MonitorPanel isOpenPanel={isOpenPanel} messages={messages} handleClear={clearAllMessages}/>
      <ActionButton handleAction={updateSidebarState} />
      <MonitorButton handleOpen={updateMonitorPanelState}/>
    </div>
  );
};

export default PageLayout;
