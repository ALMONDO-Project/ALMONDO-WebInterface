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
          <GraphFormSelector
            defaultFormState={defaultGraphFormState}
            customFormState={customGraphFormState}
          />
        );
      case 1:
        return <LobbyistForm />;
      case 2:
        return <ModelForm formState={modelFormState}/>;
      case 3:
        return <SimulationForm formState={simulationFormState}/>;
    }
  };

  return (
    <>
      <Stepper steps={steps} current={currentStep} />
      {getCurrentForm()}
      <Controls
        steps={steps}
        currentStep={currentStep}
        next={navigateNext}
        previous={navigatePrevious}
      />
    </>
  );
};

export default Configurator;
