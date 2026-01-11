import useMonitorState from "../../../stores/monitorStore";
import useModelStore from "../../../stores/modelStore";
import { useState } from "react";
import useSimulationState from "../../../stores/simulationStore";
import useGraphState from "../../../stores/graphStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type Parameters = {
  simulationType: string;
  iterations: number | undefined;
};

export type SimulationFormState = {
  parameters: Parameters;
  handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleIterationsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRun: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleContinue: (sim_id: string) => Promise<void>;
}

export const useSimulationForm = () => {
  const [parameters, setParameters] = useState<Parameters>({
    simulationType: "iteration-bunch",
    iterations: 100,
  });

  const graphState = useGraphState((state) => state);
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

  const handleRun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      type: "info",
      time: new Date(),
      message: `Running ${parameters.simulationType} simulation.`,
    });

    const formData = new FormData();
    formData.append("graph_type", graphState.graph!.type);
    formData.append("graph_params", JSON.stringify(graphState.graph?.parameters));
    formData.append("po", modelState.model!.optimisticProbability.toString());
    formData.append("po", modelState.model!.pessimisticProbability.toString());

    const initialStatus = modelState.model!.initialStatus;
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
        formData.append("unbiasedValue", initialStatus.unbiasedValue!.toString());
        break;
      default:
        formData.append("status", initialStatus.statusFile!);
    }

    formData.append("lambdaValue", modelState.model!.lambda.toString());
    formData.append("phiValue", modelState.model!.phi.toString());
    
    if(modelState.modelSeed) {
      formData.append("modelSeed", modelState.modelSeed.toString());
    }
    
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
    handleRun,
    handleContinue,
  };
};
