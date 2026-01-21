import type { CustomGraphFormState } from "../../hooks/useCustomGraphForm";
import type { DefaultGraphFormState } from "../../hooks/useDefaultGraphForm";
import { useSelectedFormState } from "../../hooks/useSelectedFormState";
import CustomGraphForm from "../forms/contents/CustomGraphForm";
import DefaultGraphForm from "../forms/contents/DefaultGraphForm";

const GraphFormSelector = ({
  defaultFormState,
  customFormState,
}: {
  defaultFormState: DefaultGraphFormState;
  customFormState: CustomGraphFormState;
}) => {
  const { selected, handleFormChange } = useSelectedFormState();

  return (
    <div className="flex flex-col items-center h-full pt-8 min-h-0">
      <h1 className="font-medium text-2xl">Configure Graph</h1>
      <div className="w-full flex flex-col min-h-0">
        <ul className="flex flex-row justify-center mt-4">
          <div
            className={`border-b px-2 ${
              selected === "default"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-gray-500"
            }`}
          >
            <li
              className="cursor-pointer"
              onClick={() => handleFormChange("default")}
            >
              Default
            </li>
          </div>
          <div
            className={`border-b px-2 ${
              selected === "custom"
                ? "text-gray-900 border-gray-900"
                : "text-gray-500 border-gray-500"
            }`}
          >
            <li
              className="cursor-pointer"
              onClick={() => handleFormChange("custom")}
            >
              Custom
            </li>
          </div>
        </ul>
        <div
          className="flex flex-col items-center pt-10 pb-20 min-h-0 overflow-y-auto 
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {selected === "default" ? (
            <DefaultGraphForm formState={defaultFormState} />
          ) : (
            <CustomGraphForm formState={customFormState} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphFormSelector;
