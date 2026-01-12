import useMonitorState from "../../../stores/monitorStore";
import useModelStore from "../../../stores/modelStore";
import { useEffect, useState } from "react";
import { type Model } from "../../../stores/modelStore";
import useSimulationState from "../../../stores/simulationStore";

export type ModelFormState = {
  parameters: Model;
  handleStatusTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleParameterChange: (
    paramName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleModelConfig: (e: React.FormEvent<HTMLFormElement>) => void;
};

const defaultParams: Model = {
  optimisticProbability: 0.01,
  pessimisticProbability: 0.99,
  lambda: 0,
  phi: 0,
  initialStatus: {
    type: "uniform",
    minRange: 0,
    maxRange: 1,
  },
};

export const useModelForm = () => {
  const modelState = useModelStore((state) => state);
  const simID = useSimulationState((state) => state.simulation?.simID);
  const resetSimState = useSimulationState((state) => state.resetSimState);

  const [parameters, setParameters] = useState<Model>(defaultParams);

  useEffect(() => {
    const model = modelState.model;
    if (model) {
      setParameters(model);
    }
  }, [modelState]);

  const addMessage = useMonitorState((state) => state.addMessage);

  const handleStatusTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;

    switch (type) {
      case "uniform":
        setParameters({
          ...parameters,
          initialStatus: {
            type: "uniform",
            minRange: 0,
            maxRange: 1,
            unbiasedValue: undefined,
            statusFile: undefined,
          },
        });
        break;
      case "unbiased":
        setParameters({
          ...parameters,
          initialStatus: {
            type: "unbiased",
            unbiasedValue: 0.5,
            minRange: undefined,
            maxRange: undefined,
            statusFile: undefined,
          },
        });
        break;
      case "gaussian_mixture":
        setParameters({
          ...parameters,
          initialStatus: {
            type: "gaussian_mixture",
            minRange: undefined,
            maxRange: undefined,
            unbiasedValue: undefined,
          },
        });
        break;
      case "user_defined":
        setParameters({
          ...parameters,
          initialStatus: {
            type: "user_defined",
            minRange: undefined,
            maxRange: undefined,
            unbiasedValue: undefined,
          },
        });
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({
      ...parameters,
      initialStatus: {
        ...parameters.initialStatus,
        statusFile: e.target.files![0],
      },
    });
  };

  const handleParameterChange = (
    paramName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParameters({ ...parameters, [paramName]: e.target.valueAsNumber });
  };

  const handleModelConfig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    modelState.updateModel(parameters);

    if (simID) {
      resetSimState();
    }

    addMessage({
      type: "success",
      time: new Date(),
      message: "Model successfully configured.",
    });
  };

  return {
    parameters,
    handleStatusTypeChange,
    handleStatusChange,
    handleParameterChange,
    handleModelConfig,
  };
};
