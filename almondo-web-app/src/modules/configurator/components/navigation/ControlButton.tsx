import type Step from "../../model/Step";

const ControlButton = ({
  step,
  text,
  action,
}: {
  step: Step;
  text: string;
  action: Function;
}) => {
  return (
    <div>
      <button
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        onClick={() => action()}
        disabled={!step.completable}
      >
        {text}
      </button>
    </div>
  );
};

export default ControlButton;
