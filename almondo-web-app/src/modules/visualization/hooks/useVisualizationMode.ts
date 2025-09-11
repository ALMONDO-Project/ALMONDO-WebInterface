import { useState } from "react"

export const useVisualizationMode = () => {
    const [mode, setMode] = useState("graph");

    const handleModeChange = (mode: string) => {
        setMode(mode);
    }

    return {
        mode,
        handleModeChange
    }
}