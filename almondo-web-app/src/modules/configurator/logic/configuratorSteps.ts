import Step from "../model/Step";

export const getConfiguratorSteps = () => {
  const steps: Step[] = [];
  const titles = ["Graph", "Lobbyist", "Model", "Simulation"];
  [...Array(4).keys()].forEach((n) => {
    const title = titles[n];
    title === "Lobbyist"
      ? steps.push(new Step(n, title, true, true))
      : steps.push(new Step(n, title));
  });
  return steps;
};
