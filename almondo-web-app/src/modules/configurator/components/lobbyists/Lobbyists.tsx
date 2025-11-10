import useModelStore from "../../../../stores/modelStore";
import Lobbyist from "./Lobbyist";

const Lobbyists = () => {
  const lobbyistsState = useModelStore((state) => state.lobbyistsState);
  const deleteLobbyist = useModelStore((state) => state.deleteLobbyist);

  return (
    <div className="flex flex-col border rounded-xl shadow-xl w-2/3 p-4 mt-4">
      <h1 className="font-medium text-xl mb-4">Lobbyists</h1>
      {lobbyistsState.numberOfLobbyists !== 0 ? (
        <ul
          className="flex flex-row gap-x-4 overflow-x-auto pb-4 
                [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {lobbyistsState.data.map((lobbyistData) => (
            <Lobbyist
              key={lobbyistData.id}
              data={lobbyistData}
              onDelete={deleteLobbyist}
            />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-base font-light">No lobbyist added</p>
      )}
    </div>
  );
};

export default Lobbyists;
