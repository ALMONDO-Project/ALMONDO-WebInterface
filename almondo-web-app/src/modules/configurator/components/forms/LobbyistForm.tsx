import { useLobbyistParams } from "../../hooks/useLobbyistParams";
import Lobbyists from "../lobbyists/Lobbyists";

const LobbyistForm = () => {
  const {
    parameters,
    handleSupportedModelChange,
    handleStrategyChange,
    handleParameterChange,
    handleStrategyFileChange,
    handleModelStoreUpdate,
  } = useLobbyistParams();

  return (
    <div className="flex flex-col items-center h-full mt-12 pb-20 overflow-y-auto 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      <h1 className="font-medium text-2xl">Lobbyists Configuration</h1>
      <form className="w-2/3 mt-8" onSubmit={handleModelStoreUpdate}>
        <label
          htmlFor="lobbyist-model"
          className="block mb-2 text-base font-normal"
        >
          Supported model
        </label>
        <select
          id="lobbyist-model"
          defaultValue={parameters.m}
          onChange={(e) => handleSupportedModelChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
        >
          <option value={0}>Pessimistic</option>
          <option value={1}>Optimistic</option>
        </select>

        <label
          htmlFor="lobbyist-strategy"
          className="block mb-2 text-base font-normal"
        >
          Strategy
        </label>
        <select
          id="lobbyist-strategy"
          defaultValue="random"
          onChange={(e) => handleStrategyChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
        >
          <option value="random">Random</option>
          <option value="custom">Custom</option>
        </select>

        <div className="py-3 flex items-center text-base before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
          Parameters
        </div>

        {parameters.strategy === "random" ? (
          <div key="random-parameters">
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
              onChange={(e) => handleParameterChange(e, "B")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
            ></input>
            <label
              htmlFor="signal-cost"
              className="block mb-2 text-base font-normal"
            >
              Signal cost
            </label>
            <input
              type="number"
              id="signal-cost"
              min={0}
              value={parameters.c}
              onChange={(e) => handleParameterChange(e, "c")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
            ></input>
            <label
              htmlFor="active-steps"
              className="block mb-2 text-base font-normal"
            >
              Lobbyist active steps
            </label>
            <input
              type="number"
              id="active-steps"
              min={0}
              value={parameters.T}
              onChange={(e) => handleParameterChange(e, "T")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            ></input>
          </div>
        ) : (
          <div key="custom-parameters">
            <label
              htmlFor="strategy-input"
              className="block mb-2 text-base font-normal"
            >
              Upload strategy
            </label>
            <input
              type="file"
              id="strategy-input"
              onChange={(e) => handleStrategyFileChange(e)}
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
            ></input>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={parameters.strategy === "custom" && parameters.strategyFile === undefined}
            className="focus:outline-none text-white bg-green-700 cursor-pointer hover:bg-green-800 disabled:opacity-50 disabled:pointer-events-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Add Lobbyist
          </button>
        </div>
      </form>

      <Lobbyists />
    </div>
  );
};

export default LobbyistForm;
