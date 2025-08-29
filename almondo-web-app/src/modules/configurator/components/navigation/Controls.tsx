import useGraphState from "../../../../stores/graphStore";
import type Step from "../../model/Step";
import ControlButton from "./ControlButton";

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
  const graphNodes = useGraphState((state) => state.nodes);

  if (graphNodes.length > 0) {
    steps[0].makeCompletable();
  }

  return (
    <div className="flex flex-row justify-around p-2">
      {currentStep > 0 && <ControlButton text="Previous" action={previous} />}
      {currentStep < steps.length &&
        (currentStep === steps.length - 1 ? (
          <ControlButton
            text="Finish"
            action={() => {}}
            disabled={!steps[currentStep].completable}
          />
        ) : (
          <ControlButton
            text="Next"
            action={next}
            disabled={!steps[currentStep].completable && !steps[currentStep].optional}
          />
        ))}
    </div>
  );
};

export default Controls;
