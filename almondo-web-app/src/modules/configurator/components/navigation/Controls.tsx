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
  return (
    <div className="flex flex-row justify-around p-2">
      {currentStep > 0 && (
        <ControlButton
          step={steps[currentStep]}
          text="Previous"
          action={previous}
        />
      )}
      {steps[currentStep].optional && (
        <ControlButton step={steps[currentStep]} text="Skip" action={next} />
      )}
      {currentStep < steps.length && (currentStep === steps.length - 1 ? (
        <ControlButton
          step={steps[currentStep]}
          text="Finish"
          action={() => {}}
        />
      ) : (
        <ControlButton step={steps[currentStep]} text="Next" action={next} />
      ))}
    </div>
  );
};

export default Controls;
