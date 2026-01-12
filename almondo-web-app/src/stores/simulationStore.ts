import { create } from "zustand";

export type SimulationStatus = [ { iteration: number; status: Record<string, number> } ];

type Simulation = {
    simID: string;
    status: SimulationStatus;
    currentIteration: number;
}

type SimulationState = {
  simulation: Simulation | undefined;
  updateCurrentIteration: (iteration: number) => void;
  updateStatus: (status: SimulationStatus) => void;
  updateSimulation: (simulation: Simulation) => void;
  resetSimState: () => void;
};

const useSimulationState = create<SimulationState>()((set) => ({
  simulation: undefined,
  updateCurrentIteration: (iteration) => 
    set((state) => 
      state.simulation
        ? { simulation: { ...state.simulation, currentIteration: iteration } }
        : state
    ),
  updateStatus: (newStatus) => 
    set((state) => 
      state.simulation 
        ? { simulation: { ...state.simulation, status: newStatus } }
        : state
    ),
  updateSimulation: (newSimulation) => set(() => ({simulation: newSimulation})),
  resetSimState: () =>
    set(() => ({
      simulation: undefined
    })),
}));

export default useSimulationState;
