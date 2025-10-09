import useGraphState from "../../../../stores/graphStore";
import { useDownloadFormatState } from "../../hooks/useDownloadFormatState";

const DownloadPanel = () => {
  const { handleDownload, handleFormatChange } = useDownloadFormatState();
  const graphNodes = useGraphState((state) => state.graph?.nodes);

  return (
    <div className="flex flex-col items-center border rounded-xl shadow-xl w-2/3 p-4 mt-8 ">
      <label
        htmlFor="download-formats"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Download Format
      </label>
      <select
        name="downloads"
        id="download-formats"
        onChange={(e) => handleFormatChange(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-8"
      >
        <option value="edgelist">Edge List</option>
        <option value="matrix">Adjacency Matrix</option>
      </select>
      <button
        onClick={() => handleDownload()}
        disabled={graphNodes === undefined}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-700 disabled:bg-gray-400 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-800"
      >
        Download
      </button>
    </div>
  );
};

export default DownloadPanel;
