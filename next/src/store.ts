// /store/store.ts
import { create } from "zustand";

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

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  _id: string;
  __v: number;
  activityName: string;
  duration: string;
}

interface ScheduleState {
  scheduleList: Schedule[] | undefined;
  setScheduleList: (newSchedule: Schedule[] | undefined) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  scheduleList: [],
  setScheduleList: (newSchedule) => {
    set({ scheduleList: newSchedule });
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
