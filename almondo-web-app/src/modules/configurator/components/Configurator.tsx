import { useSteps } from "../hooks/useSteps";
import GraphsSelector from "./forms/GraphsSelector";
import LobbyistForm from "./forms/LobbyistForm";
import ModelForm from "./forms/ModelForm";
import SimulationForm from "./forms/SimulationForm";
import Stepper from "./navigation/Stepper";
import Controls from "./navigation/Controls";

const Configurator = () => {
  const { steps, currentStep, navigateNext, navigatePrevious } = useSteps();

  const getCurrentForm = () => {
    switch (currentStep) {
      case 0:
        return <GraphsSelector />;
      case 1:
        return <LobbyistForm />;
      case 2:
        return <ModelForm />;
      case 3:
        return <SimulationForm />;
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
