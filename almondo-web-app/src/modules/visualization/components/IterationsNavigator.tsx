import toBeginningIcon from "../../../assets/first-icon.png";
import toPreviousIcon from "../../../assets/previous-icon.png";
import toNextIcon from "../../../assets/next-icon.png";
import toEndIcon from "../../../assets/last-icon.png";
import useSimulationState from "../../../stores/simulationStore";

const IterationsNavigator = () => {
  const simulation = useSimulationState((state) => state.simulation!);
  const updateCurrentIteration = useSimulationState(
    (state) => state.updateCurrentIteration
  );
  const totalIterations = simulation.status.length - 1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateCurrentIteration(Number(e.target.value));
  };

  const handleNavigateNext = () => {
    updateCurrentIteration(++simulation.currentIteration);
  };

  const handleNavigatePrevious = () => {
    updateCurrentIteration(--simulation.currentIteration);
  };

  const handleNavigateToFirst = () => {
    updateCurrentIteration(1);
  };

  const handleNavigateToLast = () => {
    updateCurrentIteration(totalIterations);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-x-4 md:gap-x-10 p-2 md:p-4 bg-white/50 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex gap-x-2">
        <button
          onClick={() => handleNavigateToFirst()}
          disabled={simulation.currentIteration === 1}
          className="size-10 p-2 bg-zinc-300 hover:bg-zinc-400 disabled:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer rounded-full shadow-sm"
        >
          <img src={toBeginningIcon} />
        </button>
        <button
          onClick={() => handleNavigatePrevious()}
          disabled={simulation.currentIteration === 1}
          className="size-10 p-2 bg-zinc-300 hover:bg-zinc-400 disabled:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer rounded-full shadow-sm"
        >
          <img src={toPreviousIcon} />
        </button>
      </div>

      <div className="flex items-center whitespace-nowrap">
        <input
          type="number"
          className="py-1 md:py-2 px-2 md:px-3 w-auto min-w-[3ch] max-w-[8ch] border border-gray-200 rounded-lg text-xs md:text-sm text-center"
          min={1}
          max={totalIterations}
          value={simulation.currentIteration}
          onChange={(e) => handleInputChange(e)}
        />{" "}
        <span className="text-gray-600 ml-1 md:ml-2 text-xs md:text-base">/ {totalIterations}</span>
      </div>

      <div className="flex gap-x-2">
        <button
          onClick={() => handleNavigateNext()}
          disabled={simulation.currentIteration === totalIterations}
          className="size-10 p-2 bg-zinc-300 hover:bg-zinc-400 disabled:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer rounded-full shadow-sm"
        >
          <img src={toNextIcon} />
        </button>
        <button
          onClick={() => handleNavigateToLast()}
          disabled={simulation.currentIteration === totalIterations}
          className="size-10 p-2 bg-zinc-300 hover:bg-zinc-400 disabled:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer rounded-full shadow-sm"
        >
          <img src={toEndIcon} />
        </button>
      </div>
    </div>
  );
};

export default IterationsNavigator;
