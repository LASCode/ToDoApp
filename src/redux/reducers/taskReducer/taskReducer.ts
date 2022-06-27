import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITask {
  id: number,
  title: string,
}
interface ITasks {
  tasks: ITask[],
  isFetching: boolean,
  error: string,
}
const initialState: ITasks = {
  tasks: [],
  isFetching: false,
  error: ''
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    tasksFetching(state: ITasks) {
      state.isFetching = true;
    },
    taskFetchingSuccess(state: ITasks, action: PayloadAction<ITask[]>) {
      state.isFetching = false;
      state.tasks = action.payload;
      state.error = '';
    },
    taskFetchingError(state: ITasks, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload
    },
  },
})

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;