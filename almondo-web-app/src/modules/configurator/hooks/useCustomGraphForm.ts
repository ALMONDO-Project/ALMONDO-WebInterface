import useMonitorState from "../../../stores/monitorStore";
import useGraphState from "../../../stores/graphStore";
import { useState } from "react";
import useSimulationState from "../../../stores/simulationStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type CustomGraphFormState = {
    format: string;
    file: Blob | null;
    handleFormatSelection: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useCustomGraphForm = () => {
  const [format, setFormat] = useState("edgelist");
  const [file, setFile] = useState<Blob | null>(null);
  const updateGraph = useGraphState((state) => state.updateGraph);
  const addMessage = useMonitorState((state) => state.addMessage);
  const simID = useSimulationState((state) => state.simulation?.simID);
  const resetSimState = useSimulationState((state) => state.resetSimState);

  const handleFormatSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      type: "info",
      time: new Date(),
      message: "Generating Graph",
    });

    const formData = new FormData();

    formData.append("graphType", format);
    formData.append("uploaded_" + format, file!);

    const response = await fetch(`${BACKEND_URL}/generate-graph`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      updateGraph(format, data.nodes, data.links);

      if(simID) {
        resetSimState();
      }
    }

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message,
    });
  };

  return {
    format,
    file,
    handleFormatSelection,
    handleFileChange,
    handleSubmit
  }
};
