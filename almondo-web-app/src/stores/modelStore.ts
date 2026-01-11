import { create } from "zustand";

type LobbyistsState = {
  numberOfLobbyists: number;
  data: LobbyistsData;
};

export type LobbyistData = {
  id: number;
  m: number;
  B?: number;
  c?: number;
  T?: number;
  strategies: string[];
  strategy?: [string, File];
};

type LobbyistsData = LobbyistData[];

type InitialStatus = {
  type: "uniform" | "unbiased" | "gaussian_mixture" | "user_defined";
  minRange?: number;
  maxRange?: number;
  unbiasedValue?: number;
  statusFile?: File;
};

export type Model = {
  optimisticProbability: number;
  pessimisticProbability: number;
  lambda: number | number[];
  phi: number | number[];
  initialStatus: InitialStatus;
};

type ModelState = {
  modelSeed: number | undefined;
  model: Model | null;
  lobbyistsState: LobbyistsState;
  updateModelSeed: (seed: number | undefined) => void,
  updateModel: (model: Model) => void;
  addLobbyist: (lobbyistData: LobbyistData) => void;
  deleteLobbyist: (lobbyistId: number) => void;
  updateLobbyistsState: (lobbyist: LobbyistsState) => void;
};

const useModelStore = create<ModelState>()((set) => ({
  modelSeed: undefined,
  model: null,
  lobbyistsState: {
    numberOfLobbyists: 0,
    data: [],
  },
  updateModelSeed: (seed) => set(() => ({modelSeed: seed})),
  updateModel: (model) => set(() => ({ model: model })),
  addLobbyist: (lobbyistData) =>
    set((state) => ({
      lobbyistsState: {
        numberOfLobbyists: state.lobbyistsState.numberOfLobbyists + 1,
        data: state.lobbyistsState.data.concat(lobbyistData),
      },
    })),
  deleteLobbyist: (lobbyistId) =>
    set((state) => ({
      lobbyistsState: {
        numberOfLobbyists: state.lobbyistsState.numberOfLobbyists - 1,
        data: state.lobbyistsState.data.filter((l) => l.id !== lobbyistId),
      },
    })),
  updateLobbyistsState: (lobbyists) =>
    set(() => ({ lobbyistsState: lobbyists })),
}));

export default useModelStore;
