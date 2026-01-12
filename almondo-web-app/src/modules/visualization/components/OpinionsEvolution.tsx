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
import type { SimulationStatus } from "../../../stores/simulationStore";
import { useRef, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OpinionsEvolution = ({ results }: { results: SimulationStatus }) => {
  const chartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const evolutionOptions = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Agents opinions evolution",
        font: {
          size: 20,
          weight: "bold" as const,
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Iteration",
          font: {
            size: 14,
          }
        },
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Opinion value",
          font: {
            size: 14,
          }
        },
      },
    },
  };

  // const sampledIterationsLabels = getSampledIterations(results.length);
  // const sampledAgents = getSampledAgentIds(Object.keys(results[0].status));
  const agents = Object.keys(results[0].status);

  const evolutionData = {
    labels: results.map((result) => result.iteration),
    datasets: agents.map((agent) => ({
      label: "",
      data: results.map((result) => Number(result.status[agent].toFixed(2))),
      borderColor:
        results[0].status[agent] < 0.33
          ? "rgba(53, 125, 176, 1)"
          : results[0].status[agent] < 0.67
          ? "rgba(24, 165, 88, 1)"
          : "rgba(206, 38, 38, 1)",
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.1,
    })),
  };

  return (
    <div className="w-5/6 p-8 border border-gray-300 rounded-xl shadow-lg/20">
      <Line ref={chartRef} options={evolutionOptions} data={evolutionData} />
    </div>
  );
};

export default OpinionsEvolution;
