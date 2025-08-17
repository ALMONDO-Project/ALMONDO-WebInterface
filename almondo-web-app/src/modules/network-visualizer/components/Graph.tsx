import { useEffect } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/style.css";
import useGraphState from "../../../stores/graphStore";
import random from 'graphology-layout/random';
const sigmaStyle = { height: "100%", width: "100%" };

// Component that load the graph
const LoadGraph = () => {
  const loadGraph = useLoadGraph();
  const nodes = useGraphState((store) => store.nodes);
  const edges = useGraphState((store) => store.edges);
  const { positions, assign } = useLayoutForceAtlas2();

  useEffect(() => {
    const graph = new Graph();

    nodes.forEach((n) => graph.addNode(n.id, { x:0, y:0, size: 15, color: "#447fdeff" }));
    edges.forEach((e) => graph.addEdge(e.source, e.target));
    
    random.assign(graph);

    loadGraph(graph);

    assign();
  }, [loadGraph, assign, positions, nodes, edges]);

  return null;
};

// Component that display the graph
const DisplayGraph = () => {
  return (
    <SigmaContainer style={sigmaStyle}>
      <LoadGraph />
    </SigmaContainer>
  );
};

export default DisplayGraph;
