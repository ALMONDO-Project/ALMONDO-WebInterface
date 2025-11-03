import BAGraphParams from "../model/BAGraphParams";
import CompleteGraphParams from "../model/CompleteGraphParams";
import ERGraphParams from "../model/ERGraphParams";
import WSGraphParams from "../model/WSGraphParams";

const defaultParameters: Map<string, CompleteGraphParams | WSGraphParams> = new Map();
defaultParameters.set("Erdős-Rényi", new ERGraphParams(1000, 0.1));
defaultParameters.set("Watts-Strogatz", new WSGraphParams(1000, 0.1, 4));
defaultParameters.set("Barabási-Albert", new BAGraphParams(1000, 2));
defaultParameters.set("Complete graph", new CompleteGraphParams(1000));

export const getDefaultParamsByGraphType = (type: string) => {
  return defaultParameters.get(type);
};

export const graphToFormParameters = (graphType: string, paramLabel: string): string => {
  switch(paramLabel) {
    case "Number of Agents":
      return graphType === "Complete graph" ? "n" : "nodes"
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
}

export const graphTypeNameFormatter = (graphType: string): string => {
  switch(graphType) {
    case "Erdős-Rényi":
      return "erdos_renyi";
    case "Watts-Strogatz":
      return "watts_strogatz";
    case "Barabási-Albert":
      return "barabasi_albert";
    case "Complete graph":
      return "complete_graph";
    default:
      throw new Error("Error on graph type formatting.");
  }
}
