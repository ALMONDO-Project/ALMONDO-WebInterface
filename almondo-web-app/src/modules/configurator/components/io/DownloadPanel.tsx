import useGraphState from "../../../../stores/graphStore";
import { useDownloadFormatState } from "../../hooks/useDownloadFormatState";
import downloadIcon from "../../../../assets/download-icon.png";

const DownloadPanel = () => {
  const { handleDownload, handleFormatChange } = useDownloadFormatState();
  const graphNodes = useGraphState((state) => state.graph?.nodes);

  return (
    <div className="flex flex-col border rounded-xl shadow-xl w-2/3 p-4 mt-8">
      <h6 className="text-lg font-semibold">Download Graph</h6>
      <label
        htmlFor="download-formats"
        className="block mb-2 mt-4 text-sm font-medium text-gray-900"
      >
        Format
      </label>
      <div className="flex flex-row gap-x-6">
        <select
          name="downloads"
          id="download-formats"
          onChange={(e) => handleFormatChange(e)}
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        >
          <option value="edgelist">Edge List</option>
          <option value="matrix">Adjacency Matrix</option>
        </select>
        <button
          onClick={() => handleDownload()}
          disabled={graphNodes === undefined}
          className="p-2 rounded-lg border border-transparent bg-gray-700 hover:bg-gray-900 cursor-pointer focus:outline-hidden focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
        >
          <img src={downloadIcon} className="size-6" />
        </button>
      </div>
    </div>
  );
};

export default DownloadPanel;
