import { createAppSlice } from "@/libs/createAppSlice";

import { getNewsByDate, getNewsByDateType } from "./eventsAPI";

export enum STATUS {
  idle = "idle",
  loading = "loading",
  failed = "failed",
}

export type EventsData = {
  pages: Array<any>;
  text: string;
  year: number;
};

export interface EventsSliceState {
  eventsList: {
    births: Array<EventsData>;
    deaths: Array<EventsData>;
    events: Array<EventsData>;
    holidays: Array<EventsData>;
    selected: Array<EventsData>;
  };
  status: STATUS;
}

const initialState: EventsSliceState = {
  eventsList: {
    births: [],
    deaths: [],
    events: [],
    holidays: [],
    selected: [],
  },
  status: STATUS.idle,
};

export const eventsSlice = createAppSlice({
  name: "wikiEvents",
  initialState,
  reducers: (create) => ({
    getWikiEvents: create.asyncThunk(
      async ({ date, language }: getNewsByDateType) => {
        const response = await getNewsByDate({ date: date, language });
        return response;
      },
      {
        pending: (state) => {
          state.status = STATUS.loading;
        },
        fulfilled: (state, action) => {
          state.status = STATUS.idle;
          state.eventsList = action.payload;
        },
        rejected: (state) => {
          state.status = STATUS.failed;
        },
      },
    ),
  }),
  selectors: {
    selectEventList: (store) => store.eventsList,
    selectStatus: (store) => store.status,
  },
});

export const { getWikiEvents } = eventsSlice.actions;
export const { selectEventList, selectStatus } = eventsSlice.selectors;
export default eventsSlice.reducer;
