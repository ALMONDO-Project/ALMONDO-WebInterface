import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { SimulationResults } from "../../../stores/simulationStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type StatusData = Record<string, number>;

const getDataToDisplay = (status: StatusData) => {
  const data: Record<string, number> = {};
  const percentages: Record<string, number> = {};
  let totalAgents = 0;

  for (const value of Object.values(status)) {
    const roundedValue = parseFloat(value.toFixed(2));

    if (!data[roundedValue]) {
      data[roundedValue] = 1;
    } else {
      data[roundedValue]++;
    }
    totalAgents++;
  }

  for (const [key, value] of Object.entries(data)) {
    percentages[key] = (value / totalAgents) * 100;
  }

  return percentages;
};

const OpinionsDistribution = ({ results }: { results: SimulationResults }) => {
  const percentages = getDataToDisplay(results[results.length - 1].status);

  const distributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Agents opinions distribution: iteration ${
          results[results.length - 1].iteration
        }`,
      },
    },
  };

  const labels = Object.keys(percentages).sort();

  const distributionData = {
    labels,
    datasets: [
      {
        label: "% Agents and opinions",
        data: Object.values(percentages),
        borderColor: "rgba(50, 100, 208, 1)",
        backgroundColor: "rgba(59, 130, 216, 0.64)",
      },
    ],
  };

  return (
      <div className="w-5/6 mt-8 p-8 border border-gray-300 rounded-xl shadow-lg/20">
        <Bar options={distributionOptions} data={distributionData} />
      </div>
  );
};

export default OpinionsDistribution;
