import Step from "../../model/Step";
import checkIcon from "../../../../assets/white-check-icon.png";
import checkIconBlack from "../../../../assets/black-check-icon.png";

const Stepper = ({ steps, current }: { steps: Step[]; current: number }) => {
  return (
    <ul className="flex flex-row w-3/4 mx-auto">
      {steps.map((step) => (
        <li key={step.number} className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span
              className={`size-7 flex justify-center items-center shrink-0 ${
                step.number <= current
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } font-medium rounded-full`}
            >
              {step.completed ? (
                <img className="w-4 h-4" src={step.number <= current ? checkIcon: checkIconBlack} />
              ) : (
                step.number
              )}
            </span>
            <div
              className={`w-full h-px flex-1 ${
                step.completed && (current > step.number) ? "bg-blue-600" : "bg-gray-200"
              } group-last:hidden`}
            ></div>
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-gray-800">
              {step.title}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
