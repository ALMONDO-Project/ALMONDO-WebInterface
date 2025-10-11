import { useEffect, useState } from "react";
import useGraphState from "../../../stores/graphStore";
import useModelStore from "../../../stores/modelStore";
import type { SimulationResults } from "../../../stores/simulationStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
);

type ConformityData = {
  globalConformity: number;
  conformityDistribution: number[];
  kde: number[];
};

type ConformityChartData = {
  labels: string[];
  datasets: any[];
};

const gaussianKernel = (u: number): number => {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);
};

const calculateKde = (
  scores: Record<string, number>,
  points: number[],
  h: number = 0.1
): number[] => {
  const values = Object.values(scores);
  const n = values.length;
  if (n === 0) return points.map(() => 0);

  const kdeDistribution: number[] = [];

  for (const p of points) {
    let sum = 0;
    for (const x of values) {
      const u = (p - x) / h;
      sum += gaussianKernel(u);
    }

    const density = sum / (n * h);
    kdeDistribution.push(density);
  }

  return kdeDistribution;
};

const calculateDistribution = (
  nodeConformity: { [nodeId: number]: number },
  intervalPoints: number[]
): number[] => {
  const conformityValues = Object.values(nodeConformity);
  const totalAgents = conformityValues.length;
  const numIntervals = intervalPoints.length - 1;

  if (totalAgents === 0) {
    return new Array(numIntervals).fill(0);
  }

  const intervalCounts: number[] = new Array(numIntervals).fill(0);

  for (const conformity of conformityValues) {
    let intervalIndex = -1;

    for (let i = 0; i < numIntervals; i++) {
      const lowerBound = intervalPoints[i];
      const upperBound = intervalPoints[i + 1];

      if (i < numIntervals - 1) {
        if (conformity >= lowerBound && conformity < upperBound) {
          intervalIndex = i;
          break;
        }
      } else {
        if (conformity >= lowerBound && conformity <= upperBound) {
          intervalIndex = i;
          break;
        }
      }
    }

    if (intervalIndex !== -1) {
      intervalCounts[intervalIndex]++;
    }
  }

  const distribution: number[] = intervalCounts.map(
    (count) => (count / totalAgents) * 100
  );

  return distribution;
};

const Conformity = ({
  results,
  iteration = -1,
  simId,
}: {
  results: SimulationResults;
  iteration?: number;
  simId: string;
}) => {
  const optimisticProbability = useModelStore(
    (state) => state.optimisticProbability
  );
  const pessimisticProbability = useModelStore(
    (state) => state.pessimisticProbability
  );
  const graph = useGraphState((state) => state.graph);
  const [conformityDistributions, setConformityDistributions] =
    useState<ConformityChartData>({
      labels: [],
      datasets: [],
    });
  const start = -1.0;
  const end = 1.0;
  const numIntervals = 100;
  const step = (end - start) / numIntervals;

  const intervalPoints: number[] = [];
  for (let i = 0; i <= numIntervals; i++) {
    const point = i === numIntervals ? end : start + i * step;
    intervalPoints.push(point);
  }

  const distributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Conformity distributions: iteration ${
          results[results.length - 1].iteration
        }`,
        font: {
          size: 18,
          weight: "bold" as const,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Conformity Score Interval",
          font: {
            weight: "bold" as const,
          },
        },
        ticks: {
          autoSkip: true, 
          maxTicksLimit: 11 // Adjust this as needed for readability
        }
      },
      y: {
        title: {
          display: true,
          text: "% Agents",
          font: {
            weight: "bold" as const,
          },
        },
        beginAtZero: true,
      },
    },
  };

  let optimisticConformity: ConformityData;
  let pessimisticConformity: ConformityData;
  let neutralConformity: ConformityData;

  useEffect(() => {
    fetch("http://127.0.0.1:5000/conformity-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_status: results,
        iteration: iteration,
        p_o: optimisticProbability,
        p_p: pessimisticProbability,
        simulation_id: simId,
        nodes: graph?.nodes.map((n) => n.id),
        edges: graph?.edges.map((e) => [e.source, e.target]),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Data:", data);

        const newConformityDistributions: ConformityChartData = {
          labels: intervalPoints.map((p) => p.toFixed(2)),
          datasets: [],
        };

        optimisticConformity = {
          globalConformity:
            data.node_conformity.ops_label.optimistic.global_conformity.toFixed(
              2
            ),
          conformityDistribution: calculateDistribution(
            data.node_conformity.ops_label.optimistic.node_conformity,
            intervalPoints
          ),
          kde: calculateKde(
            data.node_conformity.ops_label.optimistic.node_conformity,
            intervalPoints
          ),
        };

        // push conformity distribution and kde datasets for optimistic group
        newConformityDistributions.datasets.push({
          type: "bar" as const,
          label: `Optimistic (Conformity: ${
            optimisticConformity.globalConformity
          }, agents: ${
            Object.keys(
              data.node_conformity.ops_label.optimistic.node_conformity
            ).length
          })`,
          data: optimisticConformity.conformityDistribution,
          borderColor: "rgba(54, 156, 78, 1)",
          backgroundColor: "rgba(70, 222, 56, 0.82)",
        });

        newConformityDistributions.datasets.push({
          type: "line" as const,
          label: "Optimistic KDE",
          borderColor: "rgba(70, 222, 56, 0.82)",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: optimisticConformity.kde,
        });

        pessimisticConformity = {
          globalConformity:
            data.node_conformity.ops_label.pessimistic.global_conformity.toFixed(
              2
            ),
          conformityDistribution: calculateDistribution(
            data.node_conformity.ops_label.pessimistic.node_conformity,
            intervalPoints
          ),
          kde: calculateKde(
            data.node_conformity.ops_label.pessimistic.node_conformity,
            intervalPoints
          ),
        };

        newConformityDistributions.datasets.push({
          type: "bar" as const,
          label: `Pessimistic (Conformity: ${
            pessimisticConformity.globalConformity
          }, agents: ${
            Object.keys(
              data.node_conformity.ops_label.pessimistic.node_conformity
            ).length
          })`,
          data: pessimisticConformity.conformityDistribution,
          borderColor: "rgba(149, 53, 53, 1)",
          backgroundColor: "rgba(248, 25, 25, 0.82)",
        });

        newConformityDistributions.datasets.push({
          type: "line" as const,
          label: "Pessimistic KDE",
          borderColor: "rgba(248, 25, 25, 0.82)",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: pessimisticConformity.kde,
        });

        neutralConformity = {
          globalConformity:
            data.node_conformity.ops_label.neutral.global_conformity.toFixed(2),
          conformityDistribution: calculateDistribution(
            data.node_conformity.ops_label.neutral.node_conformity,
            intervalPoints
          ),
          kde: calculateKde(
            data.node_conformity.ops_label.neutral.node_conformity,
            intervalPoints
          ),
        };

        newConformityDistributions.datasets.push({
          type: "bar" as const,
          label: `Neutral (Conformity: ${
            neutralConformity.globalConformity
          }, agents: ${
            Object.keys(data.node_conformity.ops_label.neutral.node_conformity)
              .length
          })`,
          data: neutralConformity.conformityDistribution,
          borderColor: "rgba(204, 200, 200, 1)",
          backgroundColor: "rgba(176, 176, 176, 0.82)",
        });

        newConformityDistributions.datasets.push({
          type: "line" as const,
          label: "Neutral KDE",
          borderColor: "rgba(162, 162, 162, 0.82)",
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          data: neutralConformity.kde,
        });

        setConformityDistributions(newConformityDistributions);
      })
      .catch((err) =>
        console.error("Error calculating conformity scores:", err)
      );
  }, []);

  return (
    <div className="w-5/6 mt-8 mb-8 p-8 border border-gray-300 rounded-xl shadow-lg/20">
      <Chart
        type="bar"
        options={distributionOptions}
        data={conformityDistributions}
      />
    </div>
  );
};

export default Conformity;
