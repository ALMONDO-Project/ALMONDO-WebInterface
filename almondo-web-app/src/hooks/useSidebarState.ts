import { useState } from "react";

export const useSidebarState = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const updateSidebarState = () => {
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    return {
        isOpen,
        updateSidebarState
    }
}