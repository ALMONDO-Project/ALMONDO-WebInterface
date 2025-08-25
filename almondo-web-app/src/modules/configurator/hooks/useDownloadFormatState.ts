import download from "downloadjs";
import { useState } from "react"

export const useDownloadFormatState = () => {
    const [format, setFormat] = useState("edgelist");

    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormat(e.target.value)
    }

    const handleDownload = async () => {
        const endpoint = format === "edgelist" ? "download-edge-list" : "download-matrix";
        const response = await fetch(`http://127.0.0.1:5000/${endpoint}`);
        const blob = await response.blob();
        download(blob);
    } 

    return {
        handleDownload,
        handleFormatChange
    }
}