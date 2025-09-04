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
  seed: number;
};

export const useModelParams = () => {
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
    seed: 42,
  });

  const modelState = useModelStore(state => state);
  const updateOP = useModelStore(state => state.updateOptimisticProbability);
  const updatePP = useModelStore(state => state.updatePessimisticProbability);
  const updateSeed = useModelStore(state => state.updateSeed);
  const updateLambda = useModelStore(state => state.updateLambda);
  const updatePhi = useModelStore(state => state.updatePhi);
  const updateInitialStatus = useModelStore(state => state.updateInitialStatus);

  useEffect(() => console.log("Model state:\n", modelState), [modelState]);

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

  const handleMinUniformRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, minUniformRange: e.target.valueAsNumber});
  }

  const handleMaxUniformRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, maxUniformRange: e.target.valueAsNumber});
  }

  const handleUnbiasedValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, unbiasedValue: e.target.valueAsNumber});
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, status: e.target.files![0]});
  }

  const handleOptimisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, optimisticProbability: e.target.valueAsNumber});
  }

  const handlePessimisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, pessimisticProbability: e.target.valueAsNumber});
  }

  const handleLambdaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, lambda: e.target.valueAsNumber});
  }

  const handlePhiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, phi: e.target.valueAsNumber});
  }

  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({...parameters, seed: e.target.valueAsNumber});
  }

  const handleModelStoreUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const initialStatus = getInitialStatus();

    updateSeed(parameters.seed);
    updateOP(parameters.optimisticProbability);
    updatePP(parameters.pessimisticProbability);
    updateLambda(parameters.lambda);
    updatePhi(parameters.phi);
    updateInitialStatus(initialStatus);

    console.log("Model Updated");
  }

  const getInitialStatus = () => {
    switch(parameters.statusType) {
      case "uniform":
        return {
          type: parameters.statusType,
          minRange: parameters.minUniformRange,
          maxRange: parameters.maxUniformRange
        }
      case "unbiased":
        return {
          type: parameters.statusType,
          unbiasValue: parameters.unbiasedValue
        }
      default:
        return {
          type: parameters.statusType,
          file: parameters.status
        }
    }
  }

  return {
    parameters,
    handleStatusTypeChange,
    handleMinUniformRangeChange,
    handleMaxUniformRangeChange,
    handleUnbiasedValueChange,
    handleStatusChange,
    handleOptimisticChange,
    handlePessimisticChange,
    handleLambdaChange,
    handlePhiChange,
    handleSeedChange,
    handleModelStoreUpdate
  }
};
