import { Cosmograph } from "@cosmograph/react";
import useGraphState from "../../../stores/graphStore";

const GraphVisualizer = () => {
  const nodes = useGraphState((state) => state.nodes);
  const edges = useGraphState((state) => state.edges);

  return (
    <Cosmograph
      nodes={nodes}
      links={edges}
      backgroundColor="#FFFFFF"
      nodeSize={1}
      linkArrows={false}
      showDynamicLabels={false}
      renderHoveredNodeRing={false}
      hoveredNodeLabelColor={"#D3D3D3"}
    />
  );
};

export default GraphVisualizer;
