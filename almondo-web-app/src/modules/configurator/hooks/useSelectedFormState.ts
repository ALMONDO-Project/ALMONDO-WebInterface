import { useState } from "react"

export const useSelectedFormState = () => {
    const [selected, setSelected] = useState("default");

    const handleFormChange = (name: string) => {
        setSelected(name);
    }

    return {
        selected,
        handleFormChange
    }
}