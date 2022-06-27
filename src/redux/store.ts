import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer/authReducer';



const rootReducer = combineReducers({
   authReducer: authReducer,
})
export const setupStore = () => configureStore({
  reducer: rootReducer,
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
