import type { Message } from "../stores/monitorStore";

const MonitorPanel = ({
  isOpenPanel,
  messages,
  handleClear,
}: {
  isOpenPanel: boolean;
  messages: Message[];
  handleClear: Function;
}) => {
  return (
    <div
      className={`transition-[width] duration-500 ease-in-out absolute bottom-0 right-0 ${
        isOpenPanel ? "w-1/3" : "w-0"
      } h-1/2 z-10 border border-gray-300 rounded-tr-xl rounded-tl-xl shadow-lg/20 bg-[#FFFFFF] overflow-hidden`}
    >
      <div
        className={`transition-[width,padding,opacity,visibility] duration-500 ease-in-out ${
          isOpenPanel
            ? "w-full p-12 opacity-100 visible"
            : "w-0 p-0 opacity-0 invisible"
        } h-full flex flex-col overflow-hidden`}
      >
        <div className="flex justify-between mb-4">
          <h1 className="text-base font-semibold">Activity Monitor</h1>
          <button
            type="button"
            onClick={() => handleClear()}
            className="text-sm font-semibold rounded-lg text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:text-white/70 dark:focus:text-white/70"
          >
            clear
          </button>
        </div>

        <ul className="flex flex-col h-full overflow-y-auto">
          {messages.map((m, i) => (
            <li
              key={i}
              className={`p-4 mb-2 text-sm rounded-lg ${
                m.type === "info"
                  ? "text-gray-800 bg-gray-50"
                  : m.type === "success"
                  ? "text-green-800 bg-green-50"
                  : "text-red-800 bg-red-50"
              }`}
            >
              {m.time.toLocaleTimeString("it-IT")}: {m.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MonitorPanel;
