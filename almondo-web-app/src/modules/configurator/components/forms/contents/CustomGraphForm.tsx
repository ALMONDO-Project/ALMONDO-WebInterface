import type { CustomGraphFormState } from "@/modules/configurator/hooks/useCustomGraphForm";

const CustomGraphForm = ({
  formState,
}: {
  formState: CustomGraphFormState;
}) => {
  return (
    <form className="w-2/3 mt-4" onSubmit={formState.handleSubmit}>
      <label htmlFor="upload-format" className="block mb-2 text-lg font-medium">
        Upload Format
      </label>
      <select
        onChange={(e) => formState.handleFormatSelection(e)}
        id="upload-format"
        value={formState.format}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      >
        <option value="edgelist">Edge List</option>
        <option value="matrix">Adjacency matrix</option>
      </select>
      <label className="block mt-4 mb-2 text-lg font-medium">
        Upload{" "}
        {formState.format === "edgelist" ? "Edge List" : "Adjacency Matrix"}
      </label>
      <input
        type="file"
        onChange={(e) => formState.handleFileChange(e)}
        accept={formState.format === "edgelist" ? ".edgelist" : ".csv"}
        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm file:bg-gray-50 
            file:border-0
            file:me-4
            file:py-3 file:px-4
            cursor-pointer"
      />
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={formState.file === null}
          className="px-5 py-2.5 me-2 mb-2 mt-8 text-white text-sm font-medium rounded-lg bg-green-700 cursor-pointer disabled:opacity-50 disabled:pointer-events-none hover:bg-green-800"
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default CustomGraphForm;
