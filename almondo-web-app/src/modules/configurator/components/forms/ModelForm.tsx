import { useModelParams } from "../../hooks/useModelParams";

const UniformParameters = ({
  minRange,
  maxRange,
  handleMinChange,
  handleMaxChange,
}: {
  minRange: number | undefined;
  maxRange: number | undefined;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <label
          htmlFor="min-range-input"
          className="block mb-2 mt-2 text-base font-normal"
        >
          Uniform range minimum
        </label>
        <input
          type="number"
          id="min-range-input"
          min={0}
          max={1}
          step={0.01}
          value={minRange}
          onChange={(e) => handleMinChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
      </div>
      <div className="w-1/2 ms-4">
        <label
          htmlFor="max-range-input"
          className="block mb-2 mt-2 text-base font-normal"
        >
          Uniform range maximum
        </label>
        <input
          type="number"
          id="max-range-input"
          min={0}
          max={1}
          step={0.01}
          value={maxRange}
          onChange={(e) => handleMaxChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
      </div>
    </div>
  );
};

const UnbiasedParameters = ({
  unbiasedValue,
  handleUnbiasedChange,
}: {
  unbiasedValue: number | undefined;
  handleUnbiasedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label
        htmlFor="unbiased-value-input"
        className="block mb-2 mt-2 text-base font-normal"
      >
        Unbiased value
      </label>
      <input
        type="number"
        id="unbiased-value-input"
        min={0}
        max={1}
        value={unbiasedValue}
        onChange={(e) => handleUnbiasedChange(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      ></input>
    </>
  );
};

const GaussianAndUserParameters = ({
  handleStatusChange,
}: {
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label
        htmlFor="file-input"
        className="block mb-2 mt-2 text-base font-normal"
      >
        Upload status
      </label>
      <input
        type="file"
        id="file-input"
        onChange={(e) => handleStatusChange(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      ></input>
    </>
  );
};

const ModelForm = () => {
  const {
    parameters,
    handleLambdaChange,
    handleMaxUniformRangeChange,
    handleMinUniformRangeChange,
    handleOptimisticChange,
    handlePessimisticChange,
    handlePhiChange,
    handleSeedChange,
    handleStatusChange,
    handleStatusTypeChange,
    handleUnbiasedValueChange,
    handleModelStoreUpdate,
  } = useModelParams();

  return (
    <div className="flex flex-col items-center h-3/4 mt-8">
      <h1 className="font-medium text-2xl">Configure Model</h1>
      <h2 className="font-medium mt-8">Parameters</h2>
      <div className="w-3/4 mt-8 overflow-y-auto flex-1 min-h-0">
        <form className="w-full" onSubmit={handleModelStoreUpdate}>
          <label
            htmlFor="model-seed-input"
            className="block mb-2 mt-4 text-base font-normal"
          >
            Seed
          </label>
          <input
            type="number"
            id="model-seed-input"
            min={0}
            value={parameters.seed}
            onChange={(e) => handleSeedChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          ></input>
          <div className="flex flex-row">
            <div className="w-1/2">
              <label
                htmlFor="optimistic-probability-input"
                className="block mb-2 mt-4 text-base font-normal"
              >
                Optimistic probability
              </label>
              <input
                type="number"
                id="optimistic-probability-input"
                min={0}
                max={1}
                value={parameters.optimisticProbability}
                step={0.01}
                onChange={(e) => handleOptimisticChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              ></input>
            </div>
            <div className="w-1/2 ms-4">
              <label
                htmlFor="pessimistic-probability-input"
                className="block mb-2 mt-4 text-base font-normal"
              >
                Pessimistic probability
              </label>
              <input
                type="number"
                id="pessimistic-probability-input"
                min={0}
                max={1}
                value={parameters.pessimisticProbability}
                step={0.01}
                onChange={(e) => handlePessimisticChange(e)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              ></input>
            </div>
          </div>
          <label
            htmlFor="lambda-input"
            className="block mb-2 mt-4 text-base font-normal"
          >
            Directional Motivated Reasoning
          </label>
          <input
            type="number"
            id="lambda-input"
            min={0}
            max={1}
            value={Number(parameters.lambda)}
            step={0.01}
            onChange={(e) => handleLambdaChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          ></input>
          <label
            htmlFor="phi-input"
            className="block mb-2 mt-4 text-base font-normal"
          >
            Behavioural Bias
          </label>
          <input
            type="number"
            id="phi-input"
            min={0}
            max={1}
            value={Number(parameters.phi)}
            step={0.01}
            onChange={(e) => handlePhiChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          ></input>
          <div className="py-3 mt-4 flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
            Initial Status
          </div>
          <label
            htmlFor="initial-status-type"
            className="block mb-2 mt-4 text-base font-normal"
          >
            Initial status type
          </label>
          <select
            id="initial-status-type"
            defaultValue={parameters.statusType}
            onChange={(e) => handleStatusTypeChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value={"uniform"}>Uniform</option>
            <option value={"unbiased"}>Unbiased</option>
            <option value={"gaussian_mixture"}>Gaussian mixture</option>
            <option value={"user_defined"}>User defined</option>
          </select>
          <div className="flex flex-col mt-4">
            {parameters.statusType === "uniform" ? (
              <UniformParameters
                minRange={parameters.minUniformRange}
                maxRange={parameters.maxUniformRange}
                handleMinChange={handleMinUniformRangeChange}
                handleMaxChange={handleMaxUniformRangeChange}
              />
            ) : parameters.statusType === "unbiased" ? (
              <UnbiasedParameters
                unbiasedValue={parameters.unbiasedValue}
                handleUnbiasedChange={handleUnbiasedValueChange}
              />
            ) : (
              <GaussianAndUserParameters
                handleStatusChange={handleStatusChange}
              />
            )}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={
                (parameters.statusType === "gaussian_mixture" ||
                  parameters.statusType === "user_defined") &&
                parameters.status === undefined
              }
              className="focus:outline-none text-white bg-green-700 disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
            >
              Configure
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelForm;
