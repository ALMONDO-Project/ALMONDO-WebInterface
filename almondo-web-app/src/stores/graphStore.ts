import { create } from "zustand"

type Node = {
    id: string
}

type Edge = {
    source: string,
    target: string
}

type GraphState = {
    nodes: Node[],
    edges: Edge[],
    updateNodes: (nodes: Node[]) => void,
    updateEdges: (edges: Edge[]) => void,
}

const useGraphState = create<GraphState>()((set) => ({
    nodes: [],
    edges: [],
    updateNodes: (nodes) => set(() => ({nodes: nodes})),
    updateEdges: (edges) => set(() => ({edges: edges}))
}))

export default useGraphState