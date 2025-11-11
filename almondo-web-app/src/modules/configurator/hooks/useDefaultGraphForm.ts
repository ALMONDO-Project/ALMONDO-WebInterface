import { useState, type FormEvent } from "react";
import {
  getDefaultParamsByGraphType,
  graphToFormParameters,
  createGraphParams
} from "../logic/graphParamsEvaluator";
import useGraphState from "../../../stores/graphStore";
import useMonitorState from "../../../stores/monitorStore";
import type CompleteGraphParams from "../model/CompleteGraphParams";
import type WSGraphParams from "../model/WSGraphParams";
import useModelStore from "../../../stores/modelStore";
import useSimulationState from "../../../stores/simulationStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type DefaultGraphFormState = {
  graphType: string;
  isSeedEditable: null | boolean;
  handleGraphTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSeedEditSwitch: () => void;
  parameters: CompleteGraphParams | WSGraphParams;
  handleParameterChange: (paramLabel: string, newValue: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const useDefaultGraphForm = () => {
  const {simID, resetSimState} = useSimulationState((state) => state);
  const [graphForm, setGraphForm] = useState({
    type: "erdos_renyi",
    parameters: getDefaultParamsByGraphType("erdos_renyi")!,
  });
  const [isSeedEditable, setIsSeedEditable] = useState(
    graphForm.type !== "complete_graph" ? false : null
  );
  const updateGraph = useGraphState((state) => state.updateGraph);
  const addMessage = useMonitorState((state) => state.addMessage);
  const updateModelSeed = useModelStore((state) => state.updateSeed);

  const handleParameterChange = (paramLabel: string, newValue: number) => {
    setGraphForm(prevGraphForm => ({
      ...prevGraphForm,
      parameters: prevGraphForm.parameters?.updateParam(paramLabel, newValue)
    }));
  };

  const handleGraphLoad = (graphType: string, params: [string, number][]) => {
    setGraphForm({
      type: graphType,
      parameters: createGraphParams(graphType, params)
    });
  }

  const handleGraphTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGraphForm({
      type: e.target.value,
      parameters: getDefaultParamsByGraphType(e.target.value)!
    });
  };

  const handleSeedEditSwitch = () => {
    setIsSeedEditable(!isSeedEditable);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      type: "info",
      time: new Date(),
      message: "Generating Graph",
    });

    const formData = new FormData();
    formData.append("graphType", graphForm.type);
    graphForm.parameters.getParams().forEach((param) => {
      if (param.label === "Seed") {
        if (isSeedEditable) {
          formData.append("seed", String(param.value));
          updateModelSeed(param.value);
        } else {
          updateModelSeed(undefined);
        }
      } else {
        formData.append(
          graphToFormParameters(graphForm.type, param.label),
          String(param.value)
        );
      }
    });

    const response = await fetch(`${BACKEND_URL}/generate-graph`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      const type = graphForm.type;
      const params: [string, number][] = graphForm.parameters
        .getParams()
        .map((p) => [p.label, p.value]);
      updateGraph(type, data.nodes, data.links, params);
      
      if(simID) {
        resetSimState();
      }
    }

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message,
    });
  };

  return {
    graphType: graphForm.type,
    handleGraphLoad,
    isSeedEditable,
    handleGraphTypeChange,
    handleSeedEditSwitch,
    parameters: graphForm.parameters,
    handleParameterChange,
    handleSubmit,
  };
};
