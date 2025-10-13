import useModelStore from "../../../stores/modelStore";
import useGraphState from "../../../stores/graphStore";
import useSimulationState from "../../../stores/simulationStore";
import { useEffect, useState } from "react";

export const useSimulationsIDsState = () => {
  const [IDs, setIDs] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const updateSimID = useSimulationState((state) => state.updateSimID);
  const updateSimResults = useSimulationState((state) => state.updateResults);
  const updateGraph = useGraphState((state) => state.updateGraph);
  const updateOP = useModelStore((state) => state.updateOptimisticProbability);
  const updatePP = useModelStore((state) => state.updatePessimisticProbability);
  const updateLambda = useModelStore((state) => state.updateLambda);
  const updatePhi = useModelStore((state) => state.updatePhi);
  const updateLobbyists = useModelStore((state) => state.updateLobbyistsState);
  const updateSeed = useModelStore((state) => state.updateSeed);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/simulations-ids")
      .then((response) => response.json())
      .then((data) => setIDs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleIdSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleSimulationLoad = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("sim_id", selectedId);

    const response = await fetch("http://127.0.0.1:5000/load-simulation", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const data = await response.json();

      updateGraph('edgelist', data.nodes, data.links);
      updateSeed(data.sim_params.model_seed);
      updateOP(data.sim_params.p_o);
      updatePP(data.sim_params.p_p);
      updateLambda(data.sim_params.lambda_values);
      updatePhi(data.sim_params.phi_values);
      updateLobbyists({
        numberOfLobbyists: data.sim_params.n_lobbyists,
        data: data.sim_params.lobbyists_data,
      });
      updateSimID(data.simulation_id);
      updateSimResults(data.sim_results);
    }
  };

  return { IDs, selectedId, handleIdSelection, handleSimulationLoad };
};
