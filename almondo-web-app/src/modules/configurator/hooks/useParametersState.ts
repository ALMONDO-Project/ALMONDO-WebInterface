import { useState, useEffect, type FormEvent } from "react";
import {
  getDefaultParamsByGraphType,
  graphToFormParameters,
  graphTypeNameFormatter,
} from "../logic/graphParamsEvaluator";
import useGraphState from "../../../stores/graphStore";
import useMonitorState from "../../../stores/monitorStore";

export const useParametersState = (graphType: string) => {
  const [parameters, setParameters] = useState(
    () => getDefaultParamsByGraphType(graphType)!
  );
  const updateGraphNodes = useGraphState((state) => state.updateNodes);
  const updateGraphEdges = useGraphState((state) => state.updateEdges);
  const addMessage = useMonitorState((state) => state.addMessage);

  useEffect(() => {
    setParameters(() => getDefaultParamsByGraphType(graphType)!);
  }, [graphType]);

  const handleParameterChange = (paramLabel: string, newValue: number) => {
    setParameters(parameters.updateParam(paramLabel, newValue));
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

    const response = await fetch("http://127.0.0.1:5000/generate-graph", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      updateGraphNodes(data.nodes);
      updateGraphEdges(data.links);
    }

    addMessage({
      type: data.success ? "success" : "error",
      time: new Date(),
      message: data.message,
    });
  };

  return {
    parameters,
    handleParameterChange,
    handleSubmit,
  };
};
