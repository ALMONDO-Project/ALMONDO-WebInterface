import Step from "../model/Step";

export const getConfiguratorSteps = () => {
  const steps: Step[] = [];
  const titles = ["Load", "Graph", "Lobbyist", "Model", "Simulation"];
  [...Array(5).keys()].forEach((n) => {
    const title = titles[n];
    title === "Lobbyist" || title === "Load"
      ? steps.push(new Step(n, title, true, true))
      : steps.push(new Step(n, title));
  });
  return steps;
};
