import useMonitorState from "../../../stores/monitorStore";
import useModelStore from "../../../stores/modelStore";
import { useState } from "react";
import useSimulationState from "../../../stores/simulationStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Parameters = {
  simulationType: string;
  iterations: number | undefined;
};

export const useSimulationParams = () => {
  const [parameters, setParameters] = useState<Parameters>({
    simulationType: "iteration-bunch",
    iterations: 100,
  });

  const modelState = useModelStore((state) => state);
  const addMessage = useMonitorState((state) => state.addMessage);
  const updateSimulationResults = useSimulationState(
    (state) => state.updateResults
  );
  const updateSimId = useSimulationState((state) => state.updateSimID);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const iterations = e.target.value === "steady-state" ? undefined : 100;
    setParameters({ simulationType: e.target.value, iterations: iterations });
  };

  const handleIterationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, iterations: e.target.valueAsNumber });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      type: "info",
      time: new Date(),
      message: `Running ${parameters.simulationType} simulation.`,
    });

    const formData = new FormData();
    formData.append("po", modelState.optimisticProbability.toString());
    formData.append("po", modelState.pessimisticProbability.toString());

    const initialStatus = modelState.initialStatus!;
    formData.append("initialStatus", initialStatus.type);

    switch (initialStatus.type) {
      case "uniform":
        formData.append(
          "minRangeUniformDistribution",
          initialStatus.minRange!.toString()
        );
        formData.append(
          "maxRangeUniformDistribution",
          initialStatus.maxRange!.toString()
        );
        break;
      case "unbiased":
        formData.append("unbiasedValue", initialStatus.unbiasValue!.toString());
        break;
      default:
        formData.append("status", initialStatus.file!);
    }

    formData.append("lambdaValue", modelState.lambda!.toString());
    formData.append("phiValue", modelState.phi!.toString());
    formData.append("modelSeed", modelState.modelSeed.toString());
    formData.append(
      "n_lobbyists",
      modelState.lobbyistsState.numberOfLobbyists.toString()
    );
    formData.append(
      "lobbyists_data",
      JSON.stringify(modelState.lobbyistsState.data)
    );

    modelState.lobbyistsState.data.forEach((ld) => {
      if (ld.strategy !== undefined)
        formData.append(ld.strategy[0], ld.strategy[1]);
    });

    formData.append("runSimulationOption", parameters.simulationType);
    if (parameters.iterations !== undefined)
      formData.append("iterations", parameters.iterations.toString());

    const response = await fetch(`${BACKEND_URL}/run-simulation`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message,
    });

    updateSimId(data.simulation_id);
    updateSimulationResults(data.sim_results);
  };

  const handleContinue = async (sim_id: string) => {
    addMessage({
      type: "info",
      time: new Date(),
      message: `Continue simulation: ${sim_id}`,
    });

    const formData = new FormData();

    formData.append("simulation_id", sim_id);
    formData.append("runSimulationOption", parameters.simulationType);
    if (parameters.iterations !== undefined)
      formData.append("iterations", String(parameters.iterations));

    const response = await fetch(`${BACKEND_URL}/continue-simulation`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message,
    });

    updateSimulationResults(data.sim_results);
  };

  return {
    parameters,
    handleTypeChange,
    handleIterationsChange,
    handleSubmit,
    handleContinue,
  };
};
