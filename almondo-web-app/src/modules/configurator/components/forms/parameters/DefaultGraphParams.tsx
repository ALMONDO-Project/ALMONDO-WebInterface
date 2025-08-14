import { useParametersState } from "../../../hooks/useParametersState";

const DefaultGraphParams = ({ graphType }: { graphType: string }) => {
  const { parameters, handleParameterChange } = useParametersState(graphType);

  return (
    <>
      {parameters.getParams().map((parameter) => (
        <div key={parameter.label} className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            {parameter.label}
          </label>
          <input
            className={`bg-gray-50 border ${
              parameter.isValid() ? "border-gray-300" : "border-red-500"
            } text-gray-900 text-sm rounded-lg block w-full p-2.5`}
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
    </>
  );
};

export default DefaultGraphParams;
