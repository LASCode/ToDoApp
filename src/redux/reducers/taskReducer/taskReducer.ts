import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITask {
  id: number,
  title: string,
}
interface ITasks {
  tasks: ITask[],
  isFetching: boolean,
  error: string,
  newTaskOptions: {
    isOpen: boolean,
    name: string | null,
    description: string | null,
    deadline: { active: boolean, value: number[] },
    important: { active: boolean, value: number[] },
    notifications: { active: boolean, value: number[] },
  }
}
const initialState: ITasks = {
  tasks: [],
  isFetching: false,
  error: '',
  newTaskOptions: {
    isOpen: false,
    name: null,
    description: null,
    deadline: { active: false, value: [] },
    important: { active: false, value: [] },
    notifications: { active: false, value: [] },
  }
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
    isOpenToggle(state: ITasks, action: PayloadAction<boolean>) {
      state.newTaskOptions.isOpen = action.payload;
    },

  },
})

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;