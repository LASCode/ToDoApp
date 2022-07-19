import { configureStore, ThunkAction, Action, combineReducers, Middleware } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer/authReducer';
import { localstorageMW } from './middlewares/localstorageMW';
import { scrollReducer } from './reducers/scrollReducer/scrollReducer';
import { taskReducer } from './reducers/taskReducer/taskReducer';

const middlewares: Middleware[] = [localstorageMW];
const rootReducer = combineReducers({
  authReducer: authReducer,
  scrollReducer: scrollReducer,
  taskReducer: taskReducer,
})
export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
  devTools: true,
})


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
