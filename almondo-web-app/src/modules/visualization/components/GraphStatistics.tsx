import { useEffect, useState } from "react";
import { type Graph } from "../../../stores/graphStore";
import useMonitorState from "../../../stores/monitorStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Metrics = {
  agents: number;
  connections: number;
  averageDegree: number;
  density: number;
  topDegreeNodes: number[][];
};

const GraphStatistics = ({ graph }: { graph: Graph }) => {
  const [metrics, setMetrics] = useState<null | Metrics>(null);
  const addMessage = useMonitorState((state) => state.addMessage);

  useEffect(() => {
    addMessage({
      type: "info",
      time: new Date(),
      message: `Fetching ${graph.type} graph metrics.`,
    });

    fetch(`${BACKEND_URL}/basic-info-graph`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        graph_type: graph.type,
        nodes: JSON.stringify(graph.nodes.map((n) => n.id)),
        edges: JSON.stringify(graph.edges.map((e) => [e.source, e.target]))
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setMetrics({
          agents: data.graph_basic_info.numNodes,
          connections: data.graph_basic_info.numEdges,
          averageDegree: data.graph_basic_info.degree,
          density: data.graph_basic_info.density.toFixed(2),
          topDegreeNodes: data.graph_basic_info.top_five_nodes,
        });

        addMessage({
          type: "success",
          time: new Date(),
          message: data.message,
        });
      })
      .catch((err) => {
        addMessage({
          type: "error",
          time: new Date(),
          message: `Error fetching network metrics: ${err}`,
        });
      });
  }, [graph]);

  return (
    <div className="p-6 bg-white/50 border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-xl font-semibold leading-none text-gray-900">
        Network Statistics
      </h1>
      <ul className="max-w-md divide-y divide-gray-200 mt-4">
        <li className="pb-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Network type
              </p>
              <p className="text-sm text-gray-500 truncate">{graph.type}</p>
            </div>
          </div>
        </li>
        <li className="pb-3 pt-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Agents
              </p>
              <p className="text-sm text-gray-500 truncate">
                {metrics?.agents}
              </p>
            </div>
          </div>
        </li>
        <li className="pb-3 pt-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Connections
              </p>
              <p className="text-sm text-gray-500 truncate">
                {metrics?.connections}
              </p>
            </div>
          </div>
        </li>
        <li className="pb-3 pt-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Average Degree
              </p>
              <p className="text-sm text-gray-500 truncate">
                {metrics?.averageDegree}
              </p>
            </div>
          </div>
        </li>
        <li className="pb-3 pt-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Density
              </p>
              <p className="text-sm text-gray-500 truncate">
                {metrics?.density}
              </p>
            </div>
          </div>
        </li>
        <li className="pt-3">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Top Degree Nodes
              </p>
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-1 pt-6 pb-2 text-center text-xs font-medium text-gray-500 uppercase"
                            >
                              Id
                            </th>
                            <th
                              scope="col"
                              className="px-1 pt-6 pb-2 text-center text-xs font-medium text-gray-500 uppercase"
                            >
                              Degree
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {metrics?.topDegreeNodes.map((node, i) => (
                            <tr key={node[0]}>
                              <td
                                className={`px-1 pt-2 ${
                                  i === metrics.topDegreeNodes.length - 1
                                    ? ""
                                    : "pb-2"
                                } whitespace-nowrap text-sm font-base text-gray-800 text-center`}
                              >
                                {node[0]}
                              </td>
                              <td
                                className={`px-1 pt-2 ${
                                  i === metrics.topDegreeNodes.length - 1
                                    ? ""
                                    : "pb-2"
                                } whitespace-nowrap text-sm font-base text-gray-800 text-center`}
                              >
                                {node[1]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GraphStatistics;
