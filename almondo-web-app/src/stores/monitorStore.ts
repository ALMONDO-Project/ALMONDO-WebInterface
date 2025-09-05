import { create } from "zustand";

export type Message = {
  type: "info" | "success" | "error";
  time: Date,
  message: string;
};

type MonitorState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
};

const useMonitorState = create<MonitorState>()((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: state.messages.concat(message),
    })),
  clearMessages: () => set({ messages: [] }),
}));

export default useMonitorState;
