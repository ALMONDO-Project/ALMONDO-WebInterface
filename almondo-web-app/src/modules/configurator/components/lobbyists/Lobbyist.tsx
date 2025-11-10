import type { LobbyistData } from "../../../../stores/modelStore";
import infoIcon from "../../../../assets/info-icon.png";
import deleteIcon from "../../../../assets/delete-icon.png";
import { useState } from "react";

const Lobbyist = ({
  data,
  onDelete,
}: {
  data: LobbyistData;
  onDelete: (id: number) => void;
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="flex flex-col border rounded-xl shadow-xl py-2 px-3">
      <h6 className="text-base">Lobbyist {data.id}</h6>
      <div className="flex flex-row justify-center gap-x-4 mt-1">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="size-8 inline-flex justify-center items-center rounded-full border border-transparent cursor-pointer hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <img src={infoIcon} className="size-6" />
        </button>

        <button
          onClick={() => onDelete(data.id)}
          className="size-8 inline-flex justify-center items-center rounded-full border border-transparent cursor-pointer hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <img src={deleteIcon} className="size-6" />
        </button>

        {showInfo && (
          <div
            onClick={() => setShowInfo(false)}
            className="fixed inset-0 backdrop-blur flex items-end justify-center pb-20 z-50"
          >
            <div className="w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <h3 className="font-semibold text-sm mb-2">Lobbyist Details</h3>
              <div
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-gray-600 space-y-1"
              >
                <p>
                  <span className="font-medium capitalize">
                    Model supported:{" "}
                    {data.m === 0 ? "Pessimistic" : "Optimistic"}
                  </span>
                </p>
                {data.strategy ? (
                  <p>
                    <span className="font-medium capitalize">
                      Strategy: {data.strategy[0]}
                    </span>
                  </p>
                ) : (
                  <>
                    <p>
                      <span className="font-medium capitalize">
                        Budget: {data.B}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium capitalize">
                        Signal cost: {data.c}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium capitalize">
                        Active steps: {data.T}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobbyist;
