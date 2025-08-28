const ControlButton = ({
  text,
  action,
  disabled = false,
}: {
  text: string;
  action: Function;
  disabled?: boolean
}) => {
  return (
    <div>
      <button
        className="cursor-pointer text-white bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        onClick={() => action()}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default ControlButton;
