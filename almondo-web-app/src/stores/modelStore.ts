import {create} from "zustand";

type LobbyistState = {
    numberOfLobbyists: number,
    data: LobbyistsData,
}

type LobbyistData = {
    id: number,
    m: number,
    B?: number,
    c?: number,
    T?: number,
    strategies: string[],
    strategy?: [string, File]
}

type LobbyistsData = LobbyistData[];

type InitialStatus = {
    type: "uniform" | "unbiased" | "gaussian_mixture" | "user_defined",
    minRange?: number,
    maxRange?: number,
    unbiasValue?: number,
    file?: File
}

type ModelState = {
    optimisticProbability: number,
    pessimisticProbability: number,
    lambda: number | number[] | undefined,
    phi: number | number[] | undefined,
    modelSeed: number,
    initialStatus: InitialStatus | undefined,
    lobbyistsState: LobbyistState,
    updateOptimisticProbability: (po: number) => void,
    updatePessimisticProbability: (pp: number) => void,
    updateLambda: (l: number | number[]) => void,
    updatePhi: (p: number | number[]) => void,
    updateSeed: (s: number) => void,
    updateInitialStatus: (status: InitialStatus) => void,
    addLobbyist: (lobbyistData: LobbyistData) => void
}

const useModelStore = create<ModelState>()((set) => ({
    optimisticProbability: 0.01,
    pessimisticProbability: 0.99,
    lambda: undefined,
    phi: undefined,
    modelSeed: 42,
    initialStatus: undefined,
    lobbyistsState: {
        numberOfLobbyists: 0,
        data: []
    },
    updateOptimisticProbability: (po) => set(() => ({optimisticProbability: po})),
    updatePessimisticProbability: (pp) => set(() => ({pessimisticProbability: pp})),
    updateLambda: (l) => set(() => ({lambda: l})),
    updatePhi: (p) => set(() => ({phi: p})),
    updateSeed: (s) => set(() => ({modelSeed: s})),
    updateInitialStatus: (status) => set(() => ({initialStatus: status})),
    addLobbyist: (lobbyistData) => set((state) => ({lobbyistsState: {
        numberOfLobbyists: state.lobbyistsState.numberOfLobbyists + 1,
        data: state.lobbyistsState.data.concat(lobbyistData),
    }}))
}))

export default useModelStore;