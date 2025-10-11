import { Cosmograph } from "@cosmograph/react";
import useGraphState from "../../../stores/graphStore";
import GraphStatistics from "./GraphStatistics";
import useSimulationState from "../../../stores/simulationStore";
import NodeStatistics from "./NodeStatistics";
import type { NodeStatisticsRef } from "./NodeStatistics";
import useModelStore from "../../../stores/modelStore";
import { useRef } from "react";

type Node = {
  id: string;
  x?: number;
  y?: number;
};

const GraphVisualizer = () => {
  const nodeStatsRef = useRef<NodeStatisticsRef>(null);
  const cosmographRef = useRef<React.ComponentRef<typeof Cosmograph> | null>(null);
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

  return (
    <>
      <Cosmograph
        ref={cosmographRef}
        nodes={graph?.nodes}
        links={graph?.edges}
        backgroundColor="#FFFFFF"
        nodeSize={1}
        linkArrows={false}
        showDynamicLabels={false}
        showTopLabels={false}
        showHoveredNodeLabel={false}
        hoveredNodeRingColor={"#FF9E4D"}
        onClick={(n) => handleNodeClick(n)}
      />
      <div className="z-10 absolute top-4 right-4 w-1/6 flex flex-col gap-4">
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
      </div>
    </>
  );
};

export default GraphVisualizer;
