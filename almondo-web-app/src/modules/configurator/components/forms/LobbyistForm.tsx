import { useLobbyistParams } from "../../hooks/useLobbyistParams";

const LobbyistForm = () => {
  const {
    parameters,
    handleBudgetChange,
    handleActiveStepsChange,
    handleModelChange,
    handleSignalCostChange,
    handleStrategyChange,
    handleModelStoreUpdate
  } = useLobbyistParams();

  return (
    <div className="flex flex-col items-center h-3/4 mt-8">
      <h1 className="font-medium text-2xl">Add Lobbyists</h1>
      <h2 className="font-medium mt-8">Parameters</h2>
      <form className="w-2/3 mt-8" onSubmit={handleModelStoreUpdate}>
        <label
          htmlFor="budget-input"
          className="block mb-2 text-base font-normal"
        >
          Budget
        </label>
        <input
          type="number"
          id="budget-input"
          min={0}
          value={parameters.B}
          onChange={(e) => handleBudgetChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
        <label
          htmlFor="signal-cost"
          className="block mt-6 mb-2 text-base font-normal"
        >
          Signal cost
        </label>
        <input
          type="number"
          id="signal-cost"
          min={0}
          value={parameters.c}
          onChange={(e) => handleSignalCostChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
        <label
          htmlFor="active-steps"
          className="block mt-6 mb-2 text-base font-normal"
        >
          Lobbyist active steps
        </label>
        <input
          type="number"
          id="active-steps"
          min={0}
          value={parameters.T}
          onChange={(e) => handleActiveStepsChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
        <label
          htmlFor="lobbyist-model"
          className="block mt-6 mb-2 text-base font-normal"
        >
          Supported model
        </label>
        <select
          id="lobbyist-model"
          defaultValue={parameters.m}
          onChange={(e) => handleModelChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
        </select>
        <label
          htmlFor="strategy-input"
          className="block mt-6 mb-2 text-base font-normal"
        >
          Upload strategy
        </label>
        <input
          type="file"
          id="strategy-input"
          onChange={(e) => handleStrategyChange(e)}
          className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
        ></input>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Add Lobbyist
          </button>
        </div>
      </form>
    </div>
  );
};

export default LobbyistForm;
