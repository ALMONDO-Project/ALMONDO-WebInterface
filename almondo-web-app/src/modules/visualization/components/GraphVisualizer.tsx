import { Cosmograph } from "@cosmograph/react";
import useGraphState from "../../../stores/graphStore";
import GraphStatistics from "./GraphStatistics";
import useSimulationState from "../../../stores/simulationStore";
import NodeStatistics from "./NodeStatistics";
import type { NodeStatisticsRef } from "./NodeStatistics";
import useModelStore from "../../../stores/modelStore";
import { useRef } from "react";
import centerIcon from "../../../assets/center-icon.png";
import IterationsNavigator from "./IterationsNavigator";

type Node = {
  id: string;
  x?: number;
  y?: number;
};

const GraphVisualizer = () => {
  const nodeStatsRef = useRef<NodeStatisticsRef>(null);
  const cosmographRef = useRef<React.ComponentRef<typeof Cosmograph> | null>(
    null,
  );
  const graph = useGraphState((state) => state.graph);
  const simulation = useSimulationState((state) => state.simulation);
  const modelState = useModelStore((state) => state);

  const handleNodeClick = (n: Node | undefined) => {
    if (n) {
      nodeStatsRef.current?.updateNodeId(n.id);
      cosmographRef.current?.selectNode(n);
    } else {
      nodeStatsRef.current?.updateNodeId(n);
      cosmographRef.current?.unselectNodes();
    }
  };

  const computeOpinionColor = (nodeId: string, iteration: number) => {
    if (simulation) {
      const simStatus = simulation.status;
      const nodeOpinion = simStatus[iteration].status[nodeId];

      if (nodeOpinion < 0.33) {
        const blueShades = [
          "#191970",
          "#4169E1",
          "#1E90FF",
          "#00BFFF",
          "#87CEEB",
          "#ADD8E6",
          "#B0E0E6",
        ];

        const index = Math.min(
          Math.floor(nodeOpinion / 0.05),
          blueShades.length - 1,
        );
        return blueShades[index];
      } else if (nodeOpinion < 0.67) {
        const greenShades = [
          "#2F4F2F",
          "#228B22",
          "#32CD32",
          "#00FF00",
          "#7FFF00",
          "#ADFF2F",
          "#9ACD32",
        ];
        const index = Math.min(
          Math.floor((nodeOpinion - 0.33) / 0.05),
          greenShades.length - 1,
        );
        return greenShades[index];
      } else {
        const redShades = [
          "#8B0000",
          "#A52A2A",
          "#B22222",
          "#DC143C",
          "#FF0000",
          "#FF4500",
          "#FF6347",
        ];

        const index = Math.min(
          Math.floor((nodeOpinion - 0.67) / 0.05),
          redShades.length - 1,
        );
        return redShades[index];
      }
    }
    return "#b3b3b3";
  };

  return (
    <div className="relative w-full h-full">
      {graph && (
        <Cosmograph
          ref={cosmographRef}
          nodes={graph?.nodes}
          links={graph?.edges}
          backgroundColor="#FFFFFF"
          nodeColor={
            simulation
              ? (n) => computeOpinionColor(n.id, simulation.currentIteration)
              : "#8b8a8a"
          }
          nodeSize={0.5}
          linkArrows={false}
          showDynamicLabels={false}
          showTopLabels={false}
          showHoveredNodeLabel={false}
          hoveredNodeRingColor={"#FF9E4D"}
          onClick={(n) => handleNodeClick(n)}
        />
      )}
      <div className="z-10 absolute top-4 left-4 md:top-auto md:bottom-4 md:left-4 p-3 md:p-6 bg-white/50 border border-gray-200 rounded-lg shadow-sm">
        <h1 className="ext-base md:text-xl font-semibold leading-none text-gray-900 mb-2 md:mb-4">
          Current simulation
        </h1>
        {simulation ? (
          <p className="text-xs md:text-sm font-medium text-gray-500">
            {simulation.simID}
          </p>
        ) : (
          <p className="text-xs md:text-sm font-medium text-gray-500">
            No simulation loaded or run
          </p>
        )}
      </div>
      <div
        className="z-10 absolute top-12 right-4 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col gap-4 max-h-[calc(100vh-8rem)] overflow-y-auto pb-26
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:none]
        [scrollbar-width:none]
      "
      >
        {graph && (
          <>
            <GraphStatistics graph={graph} />
            {simulation && (
              <NodeStatistics
                ref={nodeStatsRef}
                simId={simulation.simID}
                simResults={simulation.status}
                iteration={simulation.currentIteration}
                optimisticProbability={modelState.model!.optimisticProbability}
                pessimisticProbability={
                  modelState.model!.pessimisticProbability
                }
                graph={graph!}
              />
            )}
            <div className="flex justify-end">
              <button
                onClick={() => cosmographRef.current?.fitView()}
                className="size-12 p-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50"
              >
                <img src={centerIcon} />
              </button>
            </div>
          </>
        )}
        {simulation && <IterationsNavigator />}
      </div>
    </div>
  );
};

export default GraphVisualizer;
