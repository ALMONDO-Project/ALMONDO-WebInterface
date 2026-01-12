import useModelStore from "../../../../stores/modelStore";
import useGraphState from "../../../../stores/graphStore";
import type Step from "../../model/Step";
import ControlButton from "./ControlButton";
import useSimulationState from "../../../../stores/simulationStore";

const Controls = ({
  steps,
  currentStep,
  next,
  previous,
}: {
  steps: Step[];
  currentStep: number;
  next: Function;
  previous: Function;
}) => {
  const graphNodes = useGraphState((state) => state.graph?.nodes);
  const modelState = useModelStore((state) => state);
  const simID = useSimulationState((state) => state.simulation?.simID);

  const isValidModelState = () => modelState.model;

  if (graphNodes !== undefined) {
    steps[1].makeCompletable();
  }

  if (isValidModelState()) {
    steps[3].makeCompletable();
  }

  if(simID) {
    steps[4].makeCompletable();
    steps[4].complete();
  } else {
    steps[4].reset();
  }

  return (
    <div className="flex flex-row justify-around p-2 bg-white">
      {currentStep > 0 && <ControlButton text="Previous" action={previous} />}
      {currentStep < steps.length && currentStep !== steps.length - 1 && (
        <ControlButton
          text="Next"
          action={next}
          disabled={
            !steps[currentStep].completable && !steps[currentStep].optional
          }
        />
      )}
    </div>
  );
};

export default Controls;
