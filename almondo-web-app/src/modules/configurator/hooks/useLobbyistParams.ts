import useModelStore from "../../../stores/modelStore";
import { useState } from "react";

type LobbyistParams = {
  B: number;
  c: number;
  T: number;
  m: number;
  strategies: string[];
  strategy: File | undefined;
};

type StrategyFile = [string, File];

export const useLobbyistParams = () => {
  const [parameters, setParameters] = useState<LobbyistParams>({
    B: 10000,
    c: 1,
    T: 10,
    m: 1,
    strategies: [],
    strategy: undefined,
  });

  const lobbyistsState = useModelStore((state) => state.lobbyistsState);
  const addLobbyist = useModelStore((state) => state.addLobbyist);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, B: e.target.valueAsNumber });
  };

  const handleSignalCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, c: e.target.valueAsNumber });
  };

  const handleActiveStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, T: e.target.valueAsNumber });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParameters({ ...parameters, m: Number(e.target.value) });
  };

  const handleStrategyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, strategy: e.target.files![0] });
  };

  const handleModelStoreUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lobbyistData = {
      id: lobbyistsState.numberOfLobbyists,
      B: parameters.B,
      m: parameters.m,
      c: parameters.c,
      T: parameters.T,
      strategies: [],
      strategy:
        parameters.strategy !== undefined
          ? [
              `lobbyist_strategy_file_${lobbyistsState.numberOfLobbyists}`,
              parameters.strategy
            ] as StrategyFile
          : undefined
    };

    addLobbyist(lobbyistData);
    console.log("Model Updated");
  };

  return {
    parameters,
    handleBudgetChange,
    handleSignalCostChange,
    handleActiveStepsChange,
    handleModelChange,
    handleStrategyChange,
    handleModelStoreUpdate,
  };
};
