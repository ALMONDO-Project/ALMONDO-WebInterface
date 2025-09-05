import buttonLogo from "../../assets/settings-icon.png";

type ActionButtonProps = {
  handleAction: Function;
};

const ActionButton = ({ handleAction }: ActionButtonProps) => {
  return (
    <div className="inline-block m-4 absolute top-0 left-0 z-20">
      <button
        onClick={() => handleAction()}
        className="w-10 p-2 bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer border rounded-full border-none shadow-xl/20"
      >
        <img src={buttonLogo} />
      </button>
    </div>
  );
};

export default ActionButton;
