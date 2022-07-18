import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITask {
  isSynchronized: boolean,
  isFetching: boolean,
  id: number,
  name: string,
  description: string,
  deadline: { isActive: boolean, value: number[] },
  important: { isActive: boolean, value: number[] },
  notifications: { isActive: boolean, value: number[] },
  status: 'active' | 'failed' | 'deleted',
}
interface ITasks {
  tasks: ITask[],
  isFetching: boolean,
  error: string,
  NTIsOpen: boolean,
  NTName: string,
  NTDesc: string,
  NTDeadline: { isActive: boolean, isOpen: boolean, value: number[] },
  NTImportant: { isActive: boolean, isOpen: boolean, value: number[] },
  NTNotification: { isActive: boolean, isOpen: boolean, value: number[] },
}
const initialState: ITasks = {
  tasks: [],
  isFetching: false,
  error: '',
  NTIsOpen: false,
  NTName: '',
  NTDesc: '',
  NTDeadline: { isActive: false, isOpen: false, value: [] },
  NTImportant: { isActive: false, isOpen: false, value: [] },
  NTNotification: { isActive: false, isOpen: false, value: [] },
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
      state.error = action.payload;
    },
    clearNTForm(state: ITasks) {
      state.NTName = '';
      state.NTDesc = '';
      state.NTIsOpen = false;
      state.NTDeadline = { isOpen: false, isActive: false, value: [] };
      state.NTNotification = { isOpen: false, isActive: false, value: [] };
      state.NTImportant = { isOpen: false, isActive: false, value: [] };
    },
    isOpenToggle(state: ITasks, action: PayloadAction<boolean>) {
      state.NTIsOpen = action.payload;
    },
    setTaskName(state: ITasks, action: PayloadAction<string>) {
      state.NTName = action.payload;
    },
    setTaskDescription(state: ITasks, action: PayloadAction<string>) {
      state.NTDesc = action.payload;
    },
    deadlineIsOpenToggle(state: ITasks, action: PayloadAction<boolean>) {
      state.NTDeadline = { ...state.NTDeadline, isOpen: action.payload };
    },
    deadlineIsActiveToggle(state: ITasks, action: PayloadAction<boolean>) {
      state.NTDeadline = { ...state.NTDeadline, isActive: action.payload };
    },
    deadlineSetData(state: ITasks, action: PayloadAction<number[]>){
      state.NTDeadline = { ...state.NTDeadline, value: action.payload };
    },
    createNewTask(state: ITasks) {
      console.log(state);
    }
  },
})

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;