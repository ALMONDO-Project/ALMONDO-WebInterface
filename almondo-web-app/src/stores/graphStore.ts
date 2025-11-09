import { create } from "zustand";

type Node = {
  id: string;
};

type Edge = {
  source: string;
  target: string;
};

export type Graph = {
  type: string;
  parameters: [string, number][];
  nodes: Node[];
  edges: Edge[];
};

type GraphState = {
  graph: Graph | null;
  updateGraph: (
    type: string,
    nodes: Node[],
    edges: Edge[],
    parameters?: [string, number][],
  ) => void;
};

const useGraphState = create<GraphState>()((set) => ({
  graph: null,
  updateGraph: (type, nodes, edges, parameters = []) =>
    set(() => ({
      graph: {
        type: type,
        nodes: nodes,
        edges: edges,
        parameters: parameters,
      },
    })),
}));

export default useGraphState;
