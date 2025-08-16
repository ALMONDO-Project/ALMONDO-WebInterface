import ContentSelector from "../navigation/ContentSelector";
import CustomGraphForm from "./contents/CustomGraphForm";
import DefaultGraphForm from "./contents/DefaultGraphForm";

const GraphsSelector = () => {
  const graphContent = new Map([
    ["Default", <DefaultGraphForm />],
    ["Custom", <CustomGraphForm />],
  ]);

  return (
    <div className="flex flex-col items-center h-3/4 mt-8">
      <h1 className="font-medium text-2xl">Configure Graph</h1>
      <ContentSelector contentMap={graphContent} />
    </div>
  );
};

export default GraphsSelector;
