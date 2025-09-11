import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { SimulationResults } from "../../../stores/simulationStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getSampledIterations = (totalIterations: number) => {
  if (totalIterations <= 0) {
    return [];
  }

  const SAMPLE_PERCENTAGE = 0.1;
  let desiredSamples = Math.floor(totalIterations * SAMPLE_PERCENTAGE);

  const minSamples = Math.min(10, totalIterations);
  if (desiredSamples < minSamples) {
    desiredSamples = minSamples;
  }

  const sampledIterations: Set<number> = new Set();

  sampledIterations.add(0);
  sampledIterations.add(totalIterations - 1);

  const stepSize = Math.floor(totalIterations / desiredSamples);

  for (let i = stepSize; i < totalIterations - 1; i += stepSize) {
    sampledIterations.add(i);
  }

  const result = Array.from(sampledIterations).sort((a, b) => a - b);

  return result;
};

const getSampledAgentIds = (agentIds: string[]) => {
  if (agentIds.length <= 0) {
    return [];
  }

  const SAMPLE_PERCENTAGE = 0.1;
  let desiredSamples = Math.floor(agentIds.length * SAMPLE_PERCENTAGE);
  const minSamples = Math.min(10, agentIds.length);

  if (desiredSamples < minSamples) {
    desiredSamples = minSamples;
  }

  if (desiredSamples >= agentIds.length) {
    return [...agentIds];
  }

  const sampledIds = [];
  const originalIds = [...agentIds];

  while (sampledIds.length < desiredSamples) {
    const randomIndex = Math.floor(Math.random() * originalIds.length);
    const selectedId = originalIds.splice(randomIndex, 1)[0];
    sampledIds.push(selectedId);
  }

  return sampledIds;
};

const OpinionsEvolution = ({ results }: { results: SimulationResults }) => {
  const evolutionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Agents opinions evolution",
      },
    },
  };

  const sampledIterationsLabels = getSampledIterations(results.length);
  const sampledAgents = getSampledAgentIds(Object.keys(results[0].status));

  const evolutionData = {
    labels: sampledIterationsLabels,
    datasets: sampledAgents.map((agent) => ({
      label: `Agent ${agent}`,
      data: results
        .filter((status) => sampledIterationsLabels.includes(status.iteration))
        .map((s) => s.status[agent].toFixed(2)),
      borderColor:
        results[0].status[agent] < 0.33
          ? "rgba(53, 125, 176, 1)"
          : results[0].status[agent] < 0.67
          ? "rgba(24, 165, 88, 1)"
          : "rgba(206, 38, 38, 1)",
      tension: 0.1,
    })),
  };

  return (
    <div className="w-5/6 mt-8 p-8 border border-gray-300 rounded-xl shadow-lg/20">
      <Line options={evolutionOptions} data={evolutionData} />
    </div>
  );
};

export default OpinionsEvolution;
