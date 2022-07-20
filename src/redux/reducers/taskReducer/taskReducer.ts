import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../../types/entity';
import { fetchTasks } from '../../actions';

interface ITasks {
  tasks: ITask[],
  isFetching: boolean,
  error: string | null,
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
  error: null,
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
      state.tasks.push({
        id: state.tasks.length,
        name: state.NTName,
        description: state.NTDesc,
        status: 'Active',
        isFetching: true,
        isSynchronized: false,
        unix: Date.now(),
        deadline: { isActive: state.NTDeadline.isActive, value: state.NTDeadline.value },
        notifications: { isActive: state.NTNotification.isActive, value: state.NTNotification.value },
        important: { isActive: state.NTImportant.isActive, value: state.NTImportant.value },
      })
    },
    clearNewTask(state: ITasks) {
      state.NTName = '';
      state.NTDesc = '';
      state.NTDeadline = { isActive: false, isOpen: false, value: [] };
      state.NTImportant = { isActive: false, isOpen: false, value: [] };
      state.NTNotification = { isActive: false, isOpen: false, value: [] };
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchTasks.pending, (state: ITasks) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state: ITasks, action) => {
        state.isFetching = false;
        state.error = action.payload.data.error ? action.payload.data.error : null;
        state.tasks = action.payload.data.tasks;
      })
      .addCase(fetchTasks.rejected, (state: ITasks) => {
        state.isFetching = false;
        state.error = 'Сервер отклонил запрос, соре';
      })
  })
})

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;