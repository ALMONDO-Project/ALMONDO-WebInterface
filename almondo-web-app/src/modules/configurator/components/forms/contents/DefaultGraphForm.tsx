import { useState } from "react";
import { useParametersState } from "../../../hooks/useParametersState";
import DownloadPanel from "../../io/DownloadPanel";

const DefaultGraphForm = () => {
  const [graphType, setGraphType] = useState("Erdős-Rényi");
  const { parameters, handleParameterChange, handleSubmit } =
    useParametersState(graphType);

  const handleGraphTypeSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGraphType(e.target.value);
  };

  return (
    <>
      <form className="w-2/3 mt-4" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="graph-types" className="block mb-2 text-lg font-medium">
          Graph Type
        </label>
        <select
          onChange={(e) => handleGraphTypeSelection(e)}
          id="graph-types"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        >
          <option value="Erdős-Rényi">Erdős-Rényi</option>
          <option value="Watts-Strogatz">Watts-Strogatz</option>
          <option value="Barabási-Albert">Barabási-Albert</option>
          <option value="Complete graph">Complete graph</option>
        </select>
        <div className="py-3 flex items-center text-base before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
          Parameters
        </div>
        {parameters.getParams().map((parameter) => (
          <div key={parameter.label} className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              {parameter.label}
            </label>
            <input
              className={`bg-gray-50 border ${
                parameter.isValid() ? "border-gray-300" : "border-red-500"
              } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
              type="number"
              step={
                parameter.label === "Probability" ||
                parameter.label === "Rewiring Probability"
                  ? 0.1
                  : 1
              }
              value={parameter.value}
              onChange={(e) =>
                handleParameterChange(
                  String(parameter.label),
                  Number(e.target.value)
                )
              }
            />
            {!parameter.isValid() && (
              <p className="text-sm text-red-600 mt-2">
                {parameter.label === "Number of Agents"
                  ? "Agents number should be in the range [100, 10000]"
                  : parameter.label === "K-Neighbors"
                  ? "k should be even (k >=2) and k<<N"
                  : parameter.label === "Edges to Attach"
                  ? "edges to attach should be in the range [1, N - 1]"
                  : "probability should be in the range [0, 1]"}
              </p>
            )}
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!parameters.areParamsValid()}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Generate
          </button>
        </div>
      </form>
      <DownloadPanel />
    </>
  );
};

export default DefaultGraphForm;
