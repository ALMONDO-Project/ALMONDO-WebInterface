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
import { initializeProbabilityIntervals, updateAgentCounts } from "../logic/opinionsDistributionsUtils";
import { useRef, useEffect } from "react";

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
  let intervals = initializeProbabilityIntervals(50);
  const probabilities = Object.values(status);
  const totalAgents = probabilities.length;

  intervals = updateAgentCounts(intervals, Object.values(status));

  for(const interval of intervals) {
    interval.agentCount = (interval.agentCount / totalAgents) * 100; 
  }

  return intervals;
};

const OpinionsDistribution = ({ results }: { results: SimulationResults }) => {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const intervals = getDataToDisplay(results[results.length - 1].status);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const distributionOptions = {
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

  const labels = intervals.map(interval => interval.start.toFixed(2) + " - " + interval.end.toFixed(2));

  const distributionData = {
    labels,
    datasets: [
      {
        label: "% Agents",
        data: intervals.map(interval => interval.agentCount),
        borderColor: "rgba(50, 100, 208, 1)",
        backgroundColor: "rgba(59, 130, 216, 0.64)",
      },
    ],
  };

  return (
      <div className="w-5/6 p-8 border border-gray-300 rounded-xl shadow-lg/20">
        <Bar ref={chartRef} options={distributionOptions} data={distributionData} />
      </div>
  );
};

export default OpinionsDistribution;
