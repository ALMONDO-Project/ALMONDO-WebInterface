import { create } from "zustand";

export type SimulationResults = [{ iteration: number; status: Record<string, number> }];

type SimulationState = {
    simID: string | undefined,
    results: SimulationResults | undefined,
    updateResults: (results: SimulationResults) => void,
    updateSimID: (id: string) => void,
    resetSimState: () => void
}

const useSimulationState = create<SimulationState>()((set) => ({
    simID: undefined,
    results: undefined,
    updateResults: (newResults) => set(() => ({results: newResults})),
    updateSimID: (id) => set(() => ({simID: id})),
    resetSimState: () => set(() => ({
        simID: undefined,
        results: undefined
    }))
}))

export default useSimulationState;