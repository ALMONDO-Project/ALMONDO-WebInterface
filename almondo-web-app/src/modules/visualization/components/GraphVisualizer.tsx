import { Cosmograph } from "@cosmograph/react";
import useGraphState from "../../../stores/graphStore";
import GraphStatistics from "./GraphStatistics";

const GraphVisualizer = () => {
  const graph = useGraphState((state) => state.graph);

  return (
    <>
      <Cosmograph
        nodes={graph?.nodes}
        links={graph?.edges}
        backgroundColor="#FFFFFF"
        nodeSize={1}
        linkArrows={false}
        showDynamicLabels={false}
        renderHoveredNodeRing={false}
        hoveredNodeLabelColor={"#D3D3D3"}
      />
      {graph && <GraphStatistics graph={graph} />}
    </>
  );
};

export default GraphVisualizer;
