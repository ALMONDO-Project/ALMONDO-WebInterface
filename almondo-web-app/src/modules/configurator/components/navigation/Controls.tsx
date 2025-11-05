import useModelStore from "../../../../stores/modelStore";
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
  const graphNodes = useGraphState((state) => state.graph?.nodes);
  const modelState = useModelStore((state) => state);

  const isValidModelState = () => {
    return (
      modelState.lambda !== undefined &&
      modelState.phi !== undefined &&
      modelState.initialStatus !== undefined
    );
  };

  if (graphNodes !== undefined) {
    steps[0].makeCompletable();
  }

  if (isValidModelState()) {
    steps[2].makeCompletable();
  }

  return (
    <div className="flex flex-row justify-around p-2 bg-white">
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
            disabled={
              !steps[currentStep].completable && !steps[currentStep].optional
            }
          />
        ))}
    </div>
  );
};

export default Controls;
