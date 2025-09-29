import useSimulationState from "../../../../stores/simulationStore";
import { useSimulationParams } from "../../hooks/useSimulationParams";
import { useSimulationsIDsState } from "../../hooks/useSimulationsIDsState";

const SimulationForm = () => {
  const { parameters, handleTypeChange, handleIterationsChange, handleSubmit, handleContinue } =
    useSimulationParams();
  const { IDs, handleIdSelection, selectedId, handleSimulationLoad } =
    useSimulationsIDsState();
  const sim_id = useSimulationState(state => state.simID)

  return (
    <div className="flex flex-col items-center h-3/4 mt-8">
      <h1 className="font-medium text-2xl">Simulation</h1>
      <h2 className="font-medium mt-8">Parameters</h2>
      <form className="w-2/3 mt-8" onSubmit={handleSubmit}>
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
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Run
          </button>
          <button
            type="button"
            disabled={sim_id === undefined}
            onClick={() => handleContinue(sim_id!)}
            className="focus:outline-none text-white bg-green-700 disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Continue
          </button>
        </div>
      </form>
      <form className="w-2/3 mt-8" onSubmit={handleSimulationLoad}>
        <label
          htmlFor="load-simulation"
          className="block mt-4 mb-2 text-base font-normal"
        >
          Choose simulation
        </label>
        <select
          id="load-simulation"
          onChange={(e) => handleIdSelection(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          {IDs.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={selectedId === ""}
            className="focus:outline-none text-white bg-green-700 disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Load
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulationForm;
