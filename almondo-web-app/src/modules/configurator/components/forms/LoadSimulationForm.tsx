import { useSimulationsIDsState } from "../../hooks/useSimulationsIDsState";

const LoadSimulationForm = ({
  onDefaultGraphLoad,
}: {
  onDefaultGraphLoad: (graphType: string, params: [string, number][]) => void;
}) => {
  const { IDs, handleIdSelection, selectedId, handleSimulationLoad } =
    useSimulationsIDsState({onDefaultGraphLoad});

  return (
    <div className="flex flex-col items-center h-full mt-16">
      <h1 className="font-medium text-2xl">Load Simulation</h1>
      <form className="w-2/3 mt-6" onSubmit={handleSimulationLoad}>
        <label
          htmlFor="load-simulation"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Choose simulation
        </label>
        <select
          id="load-simulation"
          onChange={(e) => handleIdSelection(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          {IDs.length !== 0 ? (
            IDs.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))
          ) : (
            <option>No simulations to load</option>
          )}
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

export default LoadSimulationForm;
