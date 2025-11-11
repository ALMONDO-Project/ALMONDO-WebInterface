import { useVisualizationMode } from "../hooks/useVisualizationMode";
import DataVisualizer from "./DataVisualizer";
import GraphVisualizer from "./GraphVisualizer";

const VisualizationPanel = () => {
  const { mode, handleModeChange } = useVisualizationMode();

  return (
    <div className="flex flex-col h-full">
      <ul className="flex flex-row justify-center mt-4 bg-opacity-0">
        <div
          className={`border-b px-2 ${
            mode === "graph"
              ? "text-gray-900 border-gray-900"
              : "text-gray-500 border-gray-500"
          }`}
        >
          <li
            className="cursor-pointer"
            onClick={() => handleModeChange("graph")}
          >
            Graph View
          </li>
        </div>
        <div
          className={`border-b px-2 ${
            mode === "data"
              ? "text-gray-900 border-gray-900"
              : "text-gray-500 border-gray-500"
          }`}
        >
          <li
            className="cursor-pointer"
            onClick={() => handleModeChange("data")}
          >
            Data View
          </li>
        </div>
      </ul>
      <div className="flex-1 overflow-hidden">
          {mode === "graph" ? <GraphVisualizer /> : <DataVisualizer />}
      </div>
    </div>
  );
};

export default VisualizationPanel;
