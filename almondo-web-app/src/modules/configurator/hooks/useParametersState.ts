import { useState, useEffect, type FormEvent } from "react";
import {
  getDefaultParamsByGraphType,
  graphToFormParameters,
  graphTypeNameFormatter
} from "../logic/graphParamsEvaluator";
import useGraphState from "../../../stores/graphStore";

export const useParametersState = (graphType: string) => {
  const [parameters, setParameters] = useState(
    () => getDefaultParamsByGraphType(graphType)!
  );
  const updateGraphNodes = useGraphState((state) => state.updateNodes);
  const updateGraphEdges = useGraphState((state) => state.updateEdges);

  useEffect(() => {
    setParameters(() => getDefaultParamsByGraphType(graphType)!);
  }, [graphType]);

  const handleParameterChange = (paramLabel: string, newValue: number) => {
    setParameters(parameters.updateParam(paramLabel, newValue));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    })

    if(response.ok) {
        const data = await response.json();
        updateGraphNodes(data.nodes);
        updateGraphEdges(data.links);
    } else {
        console.log(response);
    }
  };

  return {
    parameters,
    handleParameterChange,
    handleSubmit
  };
};
