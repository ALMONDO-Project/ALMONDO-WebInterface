import useModelStore from "../../../stores/modelStore";
import useGraphState from "../../../stores/graphStore";
import useSimulationState from "../../../stores/simulationStore";
import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useSimulationsIDsState = ({
  onDefaultGraphLoad,
}: {
  onDefaultGraphLoad: (graphType: string, params: [string, number][]) => void;
}) => {
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
    fetch(`${BACKEND_URL}/simulations-ids`)
      .then((response) => response.json())
      .then((data) => {
        setIDs(data);
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

      console.log("Load simulation data:", data);

      updateGraph(
        data.sim_params.graph_type,
        data.nodes,
        data.links,
        data.sim_params.graph_params
      );

      onDefaultGraphLoad(data.sim_params.graph_type, data.sim_params.graph_params);

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
