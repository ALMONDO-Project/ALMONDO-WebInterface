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
  const results = useSimulationState((state) => state.results);
  const simId = useSimulationState((state) => state.simID);

  return (
    <div className="flex flex-col items-center overflow-y-auto h-full">
      {results ? (
        <>
          <OpinionsDistribution results={results} />
          <OpinionsEvolution results={results} />
          <Conformity results={results} simId={simId!} />
        </>
      ) : (
        <div className="flex justify-center w-full mt-16 text-lg">Run/Load simulation to view results.</div>
      )}
    </div>
  );
};

export default DataVisualizer;
