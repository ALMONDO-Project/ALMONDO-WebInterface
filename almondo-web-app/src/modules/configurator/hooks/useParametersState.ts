import { useState, useEffect } from "react"
import { getDefaultParamsByGraphType } from "../logic/graphParamsEvaluator"

export const useParametersState = (graphType: string) => {
    const [parameters, setParameters] = useState(() => getDefaultParamsByGraphType(graphType)!);
    const [updateToggle, setUpdateToggle] = useState(false);

    useEffect(() => {
        setParameters(() => getDefaultParamsByGraphType(graphType)!);
    }, [graphType]);

    const handleParameterChange = (paramLabel: string, newValue: number) => {
        parameters.updateParam(paramLabel, newValue);
        setUpdateToggle(!updateToggle);
    }

    return {
        parameters,
        handleParameterChange
    }
}