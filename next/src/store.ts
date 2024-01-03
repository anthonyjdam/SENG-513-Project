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

export interface ActivityTogglesState {
  Toggles: {
    Badminton: boolean;
    Basketball: boolean;
    BallHockey: boolean;
    Volleyball: boolean;
    Soccer: boolean;
    OpenGym: boolean;
  };
  setActivityToggles: (
    newToggle: keyof ActivityTogglesState["Toggles"]
  ) => void;
  setAllTogglesToFalse: () => void;
}

export const useActivityToggleStore = create<ActivityTogglesState>((set) => ({
  Toggles: {
    Badminton: false,
    Basketball: false,
    BallHockey: false,
    Volleyball: false,
    Soccer: false,
    OpenGym: true,
  },
  setActivityToggles: (newToggle) => {
    set((state) => ({
      ...state,
      Toggles: {
        ...state.Toggles,
        [newToggle]: !state.Toggles[newToggle],
      },
    }));
  },
  setAllTogglesToFalse: () => {
    set(() => ({
      Toggles: {
        Badminton: false,
        Basketball: false,
        BallHockey: false,
        Volleyball: false,
        Soccer: false,
        OpenGym: false,
      },
    }));
  },
}));
