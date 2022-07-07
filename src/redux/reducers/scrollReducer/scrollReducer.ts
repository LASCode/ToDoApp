import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IScroll {
  noScrollRequests: number[],
}
const initialState: IScroll = {
  noScrollRequests: []
}

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setNoScrollRequest(state: IScroll, action: PayloadAction<number>) {
      state.noScrollRequests.push(action.payload);
    },
    removeNoScrollRequest(state: IScroll, action: PayloadAction<number>) {
      state.noScrollRequests = state.noScrollRequests.filter(el => el !== action.payload);
    },
    clearAllNoScrollRequest(state: IScroll) {
      state.noScrollRequests = [];
    }
  },
})

export const scrollActions = scrollSlice.actions;
export const scrollReducer = scrollSlice.reducer;