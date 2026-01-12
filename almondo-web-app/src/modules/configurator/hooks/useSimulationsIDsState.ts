import useModelStore from "../../../stores/modelStore";
import useGraphState from "../../../stores/graphStore";
import useSimulationState from "../../../stores/simulationStore";
import { useEffect, useState } from "react";
import {type Model} from "../../../stores/modelStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useSimulationsIDsState = ({
  onDefaultGraphLoad,
}: {
  onDefaultGraphLoad: (graphType: string, params: [string, number][]) => void;
}) => {
  const [IDs, setIDs] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const simId = useSimulationState((state) => state.simulation?.simID);
  const updateSimulation = useSimulationState((state) => state.updateSimulation);
  const updateGraph = useGraphState((state) => state.updateGraph);
  const updateLobbyists = useModelStore((state) => state.updateLobbyistsState);
  const updateSeed = useModelStore((state) => state.updateModelSeed);
  const updateModel = useModelStore((state) => state.updateModel);

  useEffect(() => {
    fetch(`${BACKEND_URL}/simulations-ids`)
      .then((response) => response.json())
      .then((data: string[]) => {
        setIDs(data.filter((id) => id !== simId));
        if (data.length !== 0) setSelectedId(data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleIdSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleSimulationLoad = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sim_id", selectedId);

    const response = await fetch(`${BACKEND_URL}/load-simulation`, {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const data = await response.json();

      updateGraph(
        data.sim_params.graph_type,
        data.nodes,
        data.links,
        data.sim_params.graph_params
      );

      onDefaultGraphLoad(
        data.sim_params.graph_type,
        data.sim_params.graph_params
      );

      const seed = data.sim_params.model_seed
        ? data.sim_params.model_seed
        : undefined;

      const model: Model = {
        optimisticProbability: data.sim_params.p_o,
        pessimisticProbability: data.sim_params.p_p,
        lambda: data.sim_params.lambda_values,
        phi: data.sim_params.phi_values,
        initialStatus: {
          type: "uniform",
          minRange: 0,
          maxRange: 1,
        }
      }

      updateSeed(seed);
      updateModel(model);
      updateLobbyists({
        numberOfLobbyists: data.sim_params.n_lobbyists,
        data: data.sim_params.lobbyists_data,
      });

      updateSimulation({
        simID: data.simulation_id,
        status: data.sim_results,
        currentIteration: data.sim_results.length - 1
      });
    }
  };

  return { IDs, selectedId, handleIdSelection, handleSimulationLoad };
};
