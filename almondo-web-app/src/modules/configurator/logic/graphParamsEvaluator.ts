import BAGraphParams from "../model/BAGraphParams";
import CompleteGraphParams from "../model/CompleteGraphParams";
import ERGraphParams from "../model/ERGraphParams";
import WSGraphParams from "../model/WSGraphParams";

const defaultParameters = new Map([
  ["Erdős-Rényi", new ERGraphParams(1000, 0.1)],
  ["Watts-Strogatz", new WSGraphParams(1000, 0.1, 4)],
  ["Barabási-Albert", new BAGraphParams(1000, 2)],
  ["Complete graph", new CompleteGraphParams(1000)]
]);

export const getDefaultParamsByGraphType = (type: string) => {
  return defaultParameters.get(type);
};
