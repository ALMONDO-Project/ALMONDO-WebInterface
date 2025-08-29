import useModelStore from "../../../stores/modelStore";
import { useState } from "react";

type LobbyistParams = {
    budget: number,
    signalCost: number,
    activeSteps: number,
    model: number,
    strategy: File | undefined
}

export const useLobbyistParams = () => {
  const [parameters, setParameters] = useState<LobbyistParams>({
    budget: 10000,
    signalCost: 1,
    activeSteps: 10,
    model: 1,
    strategy: undefined,
  });
  const lobbyistsState = useModelStore((state) => state.lobbyistsState);
  const addLobbyist = useModelStore((state) => state.addLobbyist); 

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, budget: e.target.valueAsNumber });
  };

  const handleSignalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, signalCost: e.target.valueAsNumber });
  };

  const handleActiveStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, activeSteps: e.target.valueAsNumber });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParameters({ ...parameters, model: Number(e.target.value) });
  };

  const handleStrategyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, strategy: e.target.files![0] });
  };

  const handleModelStoreUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lobbyistData = {
        id: lobbyistsState.numberOfLobbyists,
        budget: parameters.budget,
        model: parameters.model,
        signalCost: parameters.signalCost,
        activeSteps: parameters.activeSteps,
        strategy: parameters.strategy !== undefined ? parameters.strategy : undefined
    }

    addLobbyist(lobbyistData);
    console.log("Model Updated");
  }

  return {
    parameters,
    handleBudgetChange,
    handleSignalCostChange,
    handleActiveStepsChange,
    handleModelChange,
    handleStrategyChange,
    handleModelStoreUpdate
  };
};
