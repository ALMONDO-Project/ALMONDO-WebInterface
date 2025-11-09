import { useSteps } from "../hooks/useSteps";
import LobbyistForm from "./forms/LobbyistForm";
import ModelForm from "./forms/ModelForm";
import SimulationForm from "./forms/SimulationForm";
import Stepper from "./navigation/Stepper";
import Controls from "./navigation/Controls";
import { useDefaultGraphForm } from "../hooks/useDefaultGraphForm";
import GraphFormSelector from "./navigation/GraphFormSelector";
import { useCustomGraphForm } from "../hooks/useCustomGraphForm";
import { useModelForm } from "../hooks/useModelForm";
import { useSimulationForm } from "../hooks/useSimulationForm";
import LoadSimulationForm from "./forms/LoadSimulationForm";

const Configurator = () => {
  const { steps, currentStep, navigateNext, navigatePrevious } = useSteps();
  const defaultGraphFormState = useDefaultGraphForm();
  const customGraphFormState = useCustomGraphForm();
  const modelFormState = useModelForm();
  const simulationFormState = useSimulationForm();

  const getCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <LoadSimulationForm
            onDefaultGraphLoad={defaultGraphFormState.handleGraphLoad}
          />
        );
      case 1:
        return (
          <GraphFormSelector
            defaultFormState={defaultGraphFormState}
            customFormState={customGraphFormState}
          />
        );
      case 2:
        return <LobbyistForm />;
      case 3:
        return <ModelForm formState={modelFormState} />;
      case 4:
        return <SimulationForm formState={simulationFormState} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Stepper steps={steps} current={currentStep} />
      <div className="flex-1 min-h-0">{getCurrentForm()}</div>
      <Controls
        steps={steps}
        currentStep={currentStep}
        next={navigateNext}
        previous={navigatePrevious}
      />
    </div>
  );
};

export default Configurator;
