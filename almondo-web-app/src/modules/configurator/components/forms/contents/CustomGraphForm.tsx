import useMonitorState from "../../../../../stores/monitorStore";
import useGraphState from "../../../../../stores/graphStore";
import { useState, type ChangeEvent, type FormEvent } from "react";

const CustomGraphForm = () => {
  const [format, setFormat] = useState("edgelist");
  const [file, setFile] = useState<Blob | null>(null);
  const updateGraph = useGraphState(state => state.updateGraph);
  const addMessage = useMonitorState(state => state.addMessage);

  const handleFormatSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0])
  } 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      type: "info",
      time: new Date(),
      message: "Generating Graph"
    });

    const formData = new FormData();
    formData.append("graphType", format === "edgelist" ? "edgelist" : "adjacency_matrix");
    const filename = format === "edgelist" ? "uploaded_edgelist" : "uploaded_adjacency_matrix";
    formData.append(filename, file!);

    const response = await fetch("http://127.0.0.1:5000/generate-graph", {
        method: "POST",
        body: formData,
    });

    const data = await response.json();

    if(response.ok) {
        updateGraph(format, data.nodes, data.links);
    }

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message
    })
  }
  
  return (
    <form className="w-2/3 mt-4" onSubmit={handleSubmit}>
      <label htmlFor="upload-format" className="block mb-2 text-lg font-medium">
        Upload Format
      </label>
      <select
        onChange={(e) => handleFormatSelection(e)}
        id="upload-format"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      >
        <option value="edgelist">Edge List</option>
        <option value="matrix">Adjacency matrix</option>
      </select>
      <label className="block mt-4 mb-2 text-lg font-medium">
        Upload {format === "edgelist" ? "Edge List" : "Adjacency Matrix"}
      </label>
      <input
        type="file"
        onChange={(e) => handleFileChange(e)}
        accept={format === "edgelist" ? ".edgelist" : ".csv"}
        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm file:bg-gray-50 
            file:border-0
            file:me-4
            file:py-3 file:px-4
            cursor-pointer"
      />
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={file === null}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8"
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default CustomGraphForm;
