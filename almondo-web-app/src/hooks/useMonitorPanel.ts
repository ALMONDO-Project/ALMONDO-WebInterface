import useMonitorState from "../stores/monitorStore";
import { useState } from "react"

export const useMonitorPanel = () => {
    const [isOpenPanel, setIsOpenPanel] = useState(false);
    const messages = useMonitorState(state => state.messages);
    const clearAllMessages = useMonitorState(state => state.clearMessages);

    const updateMonitorPanelState = () => {
        setIsOpenPanel(prevIsOpen => !prevIsOpen);
    }

    return {
        isOpenPanel,
        updateMonitorPanelState,
        messages,
        clearAllMessages
    }
}