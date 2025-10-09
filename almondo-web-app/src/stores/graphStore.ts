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
  nodes: Node[];
  edges: Edge[];
};

type GraphState = {
  graph: Graph | null;
  updateGraph: (type: string, nodes: Node[], edges: Edge[]) => void;
};

const useGraphState = create<GraphState>()((set) => ({
  graph: null,
  updateGraph: (type, nodes, edges) =>
    set(() => ({
      graph: {
        type: type,
        nodes: nodes,
        edges: edges,
      },
    })),
}));

export default useGraphState;
