import { useState } from "react";

export const useSidebarState = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const updateSidebarState = () => {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    return {
        isOpen,
        updateSidebarState
    }
}