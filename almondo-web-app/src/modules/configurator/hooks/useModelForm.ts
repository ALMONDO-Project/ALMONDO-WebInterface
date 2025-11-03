import useMonitorState from "../../../stores/monitorStore";
import useModelStore from "../../../stores/modelStore";
import { useEffect, useState } from "react";

export type ModelParams = {
  statusType: "uniform" | "unbiased" | "gaussian_mixture" | "user_defined";
  minUniformRange: number | undefined;
  maxUniformRange: number | undefined;
  unbiasedValue: number | undefined;
  status: File | undefined;
  optimisticProbability: number;
  pessimisticProbability: number;
  lambda: number | number[];
  phi: number | number[];
  seed: number | undefined;
};

export type ModelFormState = {
  parameters: ModelParams;
  handleStatusTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleParameterChange: (
    paramName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleModelConfig: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useModelForm = () => {
  const modelSeed = useModelStore((state) => state.modelSeed);
  const [parameters, setParameters] = useState<ModelParams>({
    statusType: "uniform",
    minUniformRange: 0.1,
    maxUniformRange: 0.8,
    unbiasedValue: undefined,
    status: undefined,
    optimisticProbability: 0.01,
    pessimisticProbability: 0.99,
    lambda: 0.2,
    phi: 0.5,
    seed: modelSeed,
  });

  useEffect(() => {
    setParameters({...parameters, seed: modelSeed});
  }, [modelSeed]);

  const updateOP = useModelStore((state) => state.updateOptimisticProbability);
  const updatePP = useModelStore((state) => state.updatePessimisticProbability);
  const updateLambda = useModelStore((state) => state.updateLambda);
  const updatePhi = useModelStore((state) => state.updatePhi);
  const updateInitialStatus = useModelStore(
    (state) => state.updateInitialStatus
  );
  const addMessage = useMonitorState((state) => state.addMessage);

  const handleStatusTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;

    switch (type) {
      case "uniform":
        setParameters({
          ...parameters,
          statusType: "uniform",
          minUniformRange: 0.1,
          maxUniformRange: 0.8,
          unbiasedValue: undefined,
          status: undefined,
        });
        break;
      case "unbiased":
        setParameters({
          ...parameters,
          statusType: "unbiased",
          unbiasedValue: 0.1,
          minUniformRange: undefined,
          maxUniformRange: undefined,
          status: undefined,
        });
        break;
      case "gaussian_mixture":
        setParameters({
          ...parameters,
          statusType: "gaussian_mixture",
          minUniformRange: undefined,
          maxUniformRange: undefined,
          unbiasedValue: undefined,
        });
        break;
      case "user_defined":
        setParameters({
          ...parameters,
          statusType: "user_defined",
          minUniformRange: undefined,
          maxUniformRange: undefined,
          unbiasedValue: undefined,
        });
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, status: e.target.files![0] });
  };

  const handleParameterChange = (
    paramName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParameters({ ...parameters, [paramName]: e.target.valueAsNumber });
  };

  // const handleMinUniformRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, minUniformRange: e.target.valueAsNumber});
  // }

  // const handleMaxUniformRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, maxUniformRange: e.target.valueAsNumber});
  // }

  // const handleUnbiasedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, unbiasedValue: e.target.valueAsNumber});
  // }

  // const handleOptimisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, optimisticProbability: e.target.valueAsNumber});
  // }

  // const handlePessimisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, pessimisticProbability: e.target.valueAsNumber});
  // }

  // const handleLambdaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, lambda: e.target.valueAsNumber});
  // }

  // const handlePhiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, phi: e.target.valueAsNumber});
  // }

  // const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setParameters({...parameters, seed: e.target.valueAsNumber});
  // }

  const handleModelConfig = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const initialStatus = getInitialStatus();

    updateOP(parameters.optimisticProbability);
    updatePP(parameters.pessimisticProbability);
    updateLambda(parameters.lambda);
    updatePhi(parameters.phi);
    updateInitialStatus(initialStatus);

    addMessage({
      type: "success",
      time: new Date(),
      message: "Model successfully configured.",
    });
  };

  const getInitialStatus = () => {
    switch (parameters.statusType) {
      case "uniform":
        return {
          type: parameters.statusType,
          minRange: parameters.minUniformRange,
          maxRange: parameters.maxUniformRange,
        };
      case "unbiased":
        return {
          type: parameters.statusType,
          unbiasValue: parameters.unbiasedValue,
        };
      default:
        return {
          type: parameters.statusType,
          file: parameters.status,
        };
    }
  };

  return {
    parameters,
    handleStatusTypeChange,
    handleStatusChange,
    handleParameterChange,
    handleModelConfig,
  };
};
