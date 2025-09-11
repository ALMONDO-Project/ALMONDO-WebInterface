import { create } from "zustand";

export type SimulationResults = [{ iteration: number; status: Record<string, number> }];

type SimulationState = {
    simID: number | undefined,
    results: SimulationResults | undefined,
    updateResults: (results: SimulationResults) => void
}

const useSimulationState = create<SimulationState>()((set) => ({
    simID: undefined,
    results: undefined,
    updateResults: (newResults) => set(() => ({results: newResults}))
}))

export default useSimulationState;