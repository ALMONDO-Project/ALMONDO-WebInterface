import useSimulationState from "../../../stores/simulationStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OpinionsDistribution from "./OpinionsDistribution";
import OpinionsEvolution from "./OpinionsEvolution";
import Conformity from "./Conformity";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataVisualizer = () => {
  const simulation = useSimulationState((state) => state.simulation);

  return (
    <div className="flex flex-col items-center gap-y-8 overflow-y-auto h-full mt-12 pb-20">
      {simulation ? (
        <>
          <OpinionsDistribution
            results={simulation.status}
            iteration={simulation.currentIteration}
          />
          <OpinionsEvolution results={simulation.status} />
          <Conformity
            results={simulation.status}
            iteration={simulation.currentIteration}
            simId={simulation.simID}
          />
        </>
      ) : (
        <div className="flex justify-center w-full mt-16 text-lg">
          Run/Load simulation to view results.
        </div>
      )}
    </div>
  );
};

export default DataVisualizer;
