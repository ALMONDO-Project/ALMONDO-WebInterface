import { Cosmograph } from "@cosmograph/react";
import useGraphState from "../../../stores/graphStore";
import GraphStatistics from "./GraphStatistics";
import useSimulationState from "../../../stores/simulationStore";
import NodeStatistics from "./NodeStatistics";
import type { NodeStatisticsRef } from "./NodeStatistics";
import useModelStore from "../../../stores/modelStore";
import { useRef } from "react";
import centerIcon from "../../../assets/center-icon.png";

type Node = {
  id: string;
  x?: number;
  y?: number;
};

const GraphVisualizer = () => {
  const nodeStatsRef = useRef<NodeStatisticsRef>(null);
  const cosmographRef = useRef<React.ComponentRef<typeof Cosmograph> | null>(
    null
  );
  const graph = useGraphState((state) => state.graph);
  const simId = useSimulationState((state) => state.simID);
  const results = useSimulationState((state) => state.results);
  const op = useModelStore((state) => state.optimisticProbability);
  const pp = useModelStore((state) => state.pessimisticProbability);

  const handleNodeClick = (n: Node | undefined) => {
    if (n) {
      nodeStatsRef.current?.updateNodeId(n.id);
      cosmographRef.current?.selectNode(n);
    } else {
      nodeStatsRef.current?.updateNodeId(n);
      cosmographRef.current?.unselectNodes();
    }
  };

  const computeOpinionColor = (nodeId: string) => {
    if (results) {
      const nodeOpinion = results[results.length - 1].status[nodeId];

      return nodeOpinion > 0.66
        ? "#F87C63"
        : nodeOpinion >= 0.33
        ? "#63F87C"
        : "#7C63F8";
    }
    return "#b3b3b3";
  };

  return (
    <div className="relative w-full h-full">
      <Cosmograph
        ref={cosmographRef}
        nodes={graph?.nodes}
        links={graph?.edges}
        backgroundColor="#FFFFFF"
        nodeColor={(n) => computeOpinionColor(n.id)}
        nodeSize={0.5}
        linkArrows={false}
        showDynamicLabels={false}
        showTopLabels={false}
        showHoveredNodeLabel={false}
        hoveredNodeRingColor={"#FF9E4D"}
        onClick={(n) => handleNodeClick(n)}
      />
      <div className="z-10 absolute top-12 right-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col gap-4">
        {graph && <GraphStatistics graph={graph} />}
        {simId && (
          <NodeStatistics
            ref={nodeStatsRef}
            simId={simId}
            simResults={results!}
            optimisticProbability={op}
            pessimisticProbability={pp}
            graph={graph!}
          />
        )}
        {graph && (
          <div className="flex justify-end">
            <button
              onClick={() => cosmographRef.current?.fitView()}
              className="size-12 p-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50"
            >
              <img src={centerIcon} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
