import {
  type ModelFormState,
} from "../../hooks/useModelForm";

const UniformParameters = ({
  minRange,
  maxRange,
  handleParamChange,
}: {
  minRange: number | undefined;
  maxRange: number | undefined;
  handleParamChange: (
    paramName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) => {
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <label
          htmlFor="min-range-input"
          className="block mb-2 mt-2 text-base font-normal"
        >
          Range min
        </label>
        <input
          type="number"
          id="min-range-input"
          min={0}
          max={1}
          step={0.01}
          value={minRange}
          onChange={(e) => handleParamChange("minUniformRange", e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
      </div>
      <div className="w-1/2 ms-4">
        <label
          htmlFor="max-range-input"
          className="block mb-2 mt-2 text-base font-normal"
        >
          Range max
        </label>
        <input
          type="number"
          id="max-range-input"
          min={0}
          max={1}
          step={0.01}
          value={maxRange}
          onChange={(e) => handleParamChange("maxUniformRange", e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        ></input>
      </div>
    </div>
  );
};

const UnbiasedParameters = ({
  unbiasedValue,
  handleParamChange,
}: {
  unbiasedValue: number | undefined;
  handleParamChange: (
    paramName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
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
        onChange={(e) => handleParamChange("unbiasedValue", e)}
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

const ModelForm = ({ formState }: { formState: ModelFormState }) => {
  return (
    <div className="flex flex-col items-center h-full mt-12 pb-20 overflow-y-auto 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300">
      <h1 className="font-medium text-2xl">Configure Model</h1>
        <form className="w-2/3 mt-4" onSubmit={formState.handleModelConfig}>
          <label
            htmlFor="model-seed-input"
            className="block mb-2 mt-4 text-base font-normal"
          >
            Seed
          </label>
          <input
            type="text"
            id="model-seed-input"
            value={formState.parameters.seed === undefined ? "Not specified" : String(formState.parameters.seed)}
            readOnly
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          ></input>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
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
                value={formState.parameters.optimisticProbability}
                step={0.01}
                onChange={(e) =>
                  formState.handleParameterChange("optimisticProbability", e)
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              ></input>
            </div>
            <div className="w-full md:w-1/2 md:ms-4">
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
                value={formState.parameters.pessimisticProbability}
                step={0.01}
                onChange={(e) =>
                  formState.handleParameterChange("pessimisticProbability", e)
                }
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
            value={Number(formState.parameters.lambda)}
            step={0.01}
            onChange={(e) => formState.handleParameterChange("lambda", e)}
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
            value={Number(formState.parameters.phi)}
            step={0.01}
            onChange={(e) => formState.handleParameterChange("phi", e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4"
          ></input>

          <div className="py-3 flex items-center text-base before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
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
            defaultValue={formState.parameters.statusType}
            onChange={(e) => formState.handleStatusTypeChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value={"uniform"}>Uniform</option>
            <option value={"unbiased"}>Unbiased</option>
            <option value={"gaussian_mixture"}>Gaussian mixture</option>
            <option value={"user_defined"}>User defined</option>
          </select>
          <div className="flex flex-col mt-4">
            {formState.parameters.statusType === "uniform" ? (
              <UniformParameters
                minRange={formState.parameters.minUniformRange}
                maxRange={formState.parameters.maxUniformRange}
                handleParamChange={formState.handleParameterChange}
              />
            ) : formState.parameters.statusType === "unbiased" ? (
              <UnbiasedParameters
                unbiasedValue={formState.parameters.unbiasedValue}
                handleParamChange={formState.handleParameterChange}
              />
            ) : (
              <GaussianAndUserParameters
                handleStatusChange={formState.handleStatusChange}
              />
            )}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={
                (formState.parameters.statusType === "gaussian_mixture" ||
                  formState.parameters.statusType === "user_defined") &&
                formState.parameters.status === undefined
              }
              className="focus:outline-none text-white bg-green-700 disabled:bg-gray-200 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
            >
              Configure
            </button>
          </div>
        </form>
    </div>
  );
};

export default ModelForm;
