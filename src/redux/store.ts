import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  getDefaultMiddleware,
  Middleware
} from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer/authReducer';
import { localstorageMW } from './middlewares/localstorageMW';
import { scrollReducer } from './reducers/scrollReducer/scrollReducer';

const middlewares: Middleware[] = [localstorageMW];
const rootReducer = combineReducers({
  authReducer: authReducer,
  scrollReducer: scrollReducer,
})
export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
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
