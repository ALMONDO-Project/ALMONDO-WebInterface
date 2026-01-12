import useMonitorState from "../../../stores/monitorStore";
import useModelStore from "../../../stores/modelStore";
import { useState } from "react";
import useSimulationState from "../../../stores/simulationStore";

type LobbyistParams = {
  strategy: string;
  B: number;
  c: number;
  T: number;
  m: number;
  strategies: string[];
  strategyFile: File | undefined;
};

type StrategyFile = [string, File];

export const useLobbyistParams = () => {
  const [parameters, setParameters] = useState<LobbyistParams>({
    strategy: "random",
    B: 10000,
    c: 1,
    T: 10,
    m: 1,
    strategies: [],
    strategyFile: undefined,
  });
  const addMessage = useMonitorState(state => state.addMessage);
  const lobbyistsState = useModelStore((state) => state.lobbyistsState);
  const addLobbyist = useModelStore((state) => state.addLobbyist);
  const simID = useSimulationState((state) => state.simulation?.simID);
  const resetSimState = useSimulationState((state) => state.resetSimState);

  const handleParameterChange = (e: React.ChangeEvent<HTMLInputElement>, param: string) => {
    setParameters({ ...parameters, [param]: e.target.valueAsNumber });
  }

  const handleSupportedModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParameters({ ...parameters, m: Number(e.target.value) });
  };

  const handleStrategyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParameters({...parameters, strategy: e.target.value});
  }

  const handleStrategyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, strategyFile: e.target.files![0] });
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
        parameters.strategyFile !== undefined
          ? [
              `lobbyist_strategy_file_${lobbyistsState.numberOfLobbyists}`,
              parameters.strategyFile
            ] as StrategyFile
          : undefined
    };

    addLobbyist(lobbyistData);

    if(simID){
      resetSimState();
    }
    
    addMessage({
      type: "success",
      time: new Date(),
      message: `Lobbyist ${lobbyistData.id} added successfully.`
    })
  };

  return {
    parameters,
    handleSupportedModelChange,
    handleStrategyChange,
    handleParameterChange,
    handleStrategyFileChange,
    handleModelStoreUpdate,
  };
};
