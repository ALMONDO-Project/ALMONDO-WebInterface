import { useState, useEffect, type FormEvent } from "react";
import {
  getDefaultParamsByGraphType,
  graphToFormParameters,
  graphTypeNameFormatter,
} from "../logic/graphParamsEvaluator";
import useGraphState from "../../../stores/graphStore";
import useMonitorState from "../../../stores/monitorStore";
import type CompleteGraphParams from "../model/CompleteGraphParams";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type DefaultGraphFormState = {
  graphType: string;
  handleGraphTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  parameters: CompleteGraphParams;
  handleParameterChange: (paramLabel: string, newValue: number) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const useDefaultGraphForm = () => {
  const [graphType, setGraphType] = useState("Erdős-Rényi");
  const [parameters, setParameters] = useState(
    () => getDefaultParamsByGraphType(graphType)!
  );
  const updateGraph = useGraphState((state) => state.updateGraph);
  const addMessage = useMonitorState((state) => state.addMessage);

  useEffect(() => {
    setParameters(() => getDefaultParamsByGraphType(graphType)!);
  }, [graphType]);

  const handleParameterChange = (paramLabel: string, newValue: number) => {
    setParameters(parameters.updateParam(paramLabel, newValue));
  };

  const handleGraphTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGraphType(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      type: "info",
      time: new Date(),
      message: "Generating Graph",
    });

    const formData = new FormData();
    formData.append("graphType", graphTypeNameFormatter(graphType));
    parameters
      .getParams()
      .forEach((param) =>
        formData.append(
          graphToFormParameters(graphType, param.label),
          String(param.value)
        )
      );

    const response = await fetch(`${BACKEND_URL}/generate-graph`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      updateGraph(graphTypeNameFormatter(graphType), data.nodes, data.links);
    }

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message,
    });
  };

  return {
    graphType,
    handleGraphTypeChange,
    parameters,
    handleParameterChange,
    handleSubmit,
  };
};
