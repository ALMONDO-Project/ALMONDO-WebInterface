import download from "downloadjs";
import { useState } from "react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useDownloadFormatState = () => {
    const [format, setFormat] = useState("edgelist");

    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormat(e.target.value)
    }

    const handleDownload = async () => {
        const endpoint = format === "edgelist" ? "download-edge-list" : "download-matrix";
        const response = await fetch(`${BACKEND_URL}/${endpoint}`);
        const blob = await response.blob();
        download(blob);
    }

    return {
        handleDownload,
        handleFormatChange
    }
}