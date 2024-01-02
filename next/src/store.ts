// /store/store.ts
import { create } from "zustand";

/* boilerplate example */
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

//boilerplate example
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

interface ScheduleViewState {
  scheduleView: string;
  setScheduleView: () => void;
}

export const useScheduleViewStore = create<ScheduleViewState>((set) => ({
  scheduleView: "d",
  setScheduleView: () =>
    set((state) => ({ scheduleView: state.scheduleView === "d" ? "w" : "d" })),
}));

interface DateState {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
}

export const useDateStore = create<DateState>((set) => ({
  date: new Date(),
  setDate: (newDate) => {
    set({ date: newDate });
  },
}));
