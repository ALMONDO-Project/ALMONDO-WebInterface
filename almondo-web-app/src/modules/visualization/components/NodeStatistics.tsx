import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { SimulationStatus } from "@/stores/simulationStore";
import type { Graph } from "../../../stores/graphStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface NodeStatisticsProps {
  simId: string;
  iteration?: number;
  simResults: SimulationStatus;
  optimisticProbability: number;
  pessimisticProbability: number;
  graph: Graph;
}

export interface NodeStatisticsRef {
  updateNodeId: (nodeId: string | undefined) => void;
}

type NodeStatistics = {
  id: string;
  centrality: number;
  opinion: number;
  label: string;
};

const NodeStatistics = forwardRef<NodeStatisticsRef, NodeStatisticsProps>(
  (props, ref) => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(
      undefined
    );
    const [nodeInfo, setNodeInfo] = useState<NodeStatistics | null>(null);

    useEffect(() => {
      if (selectedNodeId) {
        fetch(`${BACKEND_URL}/basic-info-node`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            node_id: selectedNodeId,
            system_status: props.simResults,
            p_o: props.optimisticProbability,
            p_p: props.pessimisticProbability,
            simulation_id: props.simId,
            iteration: props.iteration,
            graph_type: props.graph.type,
            nodes: JSON.stringify(props.graph.nodes.map((n) => n.id)),
            edges: JSON.stringify(
              props.graph.edges.map((e) => [e.source, e.target])
            ),
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then((data) => {
            console.log("node data:", data);
            setNodeInfo({
              id: data.node_info.node_id,
              centrality: data.node_info.node_degree_centrality.toFixed(2),
              opinion: data.node_info.opinion.toFixed(4),
              label: data.node_info.label
            });
          })
          .catch((err) => console.error("Error fetching node stats", err));
      } else {
        setNodeInfo(null);
      }
    }, [selectedNodeId]);

    useImperativeHandle(ref, () => ({
      updateNodeId: (nodeId: string | undefined) => {
        setSelectedNodeId(nodeId);
      },
    }));

    return (
      <div className="p-6 bg-white/50 border border-gray-200 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold leading-none text-gray-900">
          Agent Statistics
        </h1>
        {nodeInfo ? (
          <ul className="max-w-md divide-y divide-gray-200 mt-4">
            <li className="pb-3">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Agent ID
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {nodeInfo.id}
                  </p>
                </div>
              </div>
            </li>
            <li className="pb-3 pt-3">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Centrality Degree
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {nodeInfo.centrality}
                  </p>
                </div>
              </div>
            </li>
            <li className="pt-3">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Agent Opinion
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {nodeInfo.opinion} ({nodeInfo.label})
                  </p>
                </div>
              </div>
            </li>
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">
            No agent selected.
            <br /> Select an agent to show its statistics.
          </p>
        )}
      </div>
    );
  }
);

export default NodeStatistics;
