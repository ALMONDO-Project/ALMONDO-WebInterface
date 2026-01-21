import useSimulationState from "../../../../stores/simulationStore";
import { type SimulationFormState } from "../../hooks/useSimulationForm";

const SimulationForm = ({formState} : {formState: SimulationFormState}) => {
  const { parameters, handleTypeChange, handleIterationsChange, handleRun, handleContinue } = formState;
  const simID = useSimulationState(state => state.simulation?.simID);

  return (
    <div className="flex flex-col items-center h-full mt-12 pb-20 overflow-y-auto 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <h1 className="font-medium text-2xl">Simulation</h1>
      <h2 className="font-medium mt-8">Parameters</h2>
      <form className="w-2/3 mt-8" onSubmit={handleRun}>
        <label
          htmlFor="simulation-type"
          className="block mb-2 text-base font-normal"
        >
          Simulation Type
        </label>
        <select
          id="simulation-type"
          defaultValue={parameters.simulationType}
          onChange={(e) => handleTypeChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value={"iteration-bunch"}>Iteration Bunch</option>
          <option value={"steady-state"}>Steady State</option>
        </select>
        {parameters.simulationType === "iteration-bunch" ? (
          <div className="h-24">
            <label
              htmlFor="iterations-input"
              className="block mb-2 mt-4 text-base font-normal"
            >
              Iterations
            </label>
            <input
              type="number"
              id="iterations-input"
              min={10}
              value={parameters.iterations}
              onChange={(e) => handleIterationsChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            ></input>
          </div>
        ) : (
          <div className="h-24"></div>
        )}
        <div className="flex justify-center gap-x-2 mt-8">
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 cursor-pointer disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Run
          </button>
          <button
            type="button"
            disabled={simID === undefined}
            onClick={() => handleContinue(simID!)}
            className="focus:outline-none text-white bg-green-700 cursor-pointer disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulationForm;
