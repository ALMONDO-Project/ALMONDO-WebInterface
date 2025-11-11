import BAGraphParams from "../model/BAGraphParams";
import CompleteGraphParams from "../model/CompleteGraphParams";
import ERGraphParams from "../model/ERGraphParams";
import WSGraphParams from "../model/WSGraphParams";

const defaultParameters: Map<string, CompleteGraphParams | WSGraphParams> =
  new Map();
defaultParameters.set("erdos_renyi", new ERGraphParams(1000, 0.1));
defaultParameters.set("watts_strogatz", new WSGraphParams(1000, 0.1, 4));
defaultParameters.set("barabasi_albert", new BAGraphParams(1000, 2));
defaultParameters.set("complete_graph", new CompleteGraphParams(1000));

export const getDefaultParamsByGraphType = (type: string) => {
  return defaultParameters.get(type);
};

export const graphToFormParameters = (
  graphType: string,
  paramLabel: string
): string => {
  switch (paramLabel) {
    case "Number of Agents":
      return graphType === "complete_graph" ? "n" : "nodes";
    case "Probability":
      return "prob";
    case "Rewiring Probability":
      return "rewiring_prob";
    case "K-Neighbors":
      return "k_neighbors";
    case "Edges to Attach":
      return "m";
    default:
      throw new Error("Error transforming form parameter");
  }
};

export const createGraphParams = (
  graphType: string,
  params: [string, number][]
): CompleteGraphParams | WSGraphParams => {
  switch (graphType) {
    case "erdos_renyi":
      return new ERGraphParams(params[0][1], params[1][1], params[2][1]);
    case "watts_strogatz":
      return new WSGraphParams(
        params[0][1],
        params[1][1],
        params[2][1],
        params[3][1]
      );
    case "barabasi_albert":
      return new BAGraphParams(params[0][1], params[1][1], params[2][1]);
    case "complete_graph":
      return new CompleteGraphParams(params[0][1]);
    default:
      throw new Error(`Graph type "${graphType}" doesn't exists`);
  }
};
