import { AppDispatch } from './store';
import { asyncServerRequest } from '../fakeBackend';
import { authActions } from './reducers/authReducer/authReducer';

const fetchAuth = (token: string) => async (dispatch: AppDispatch) => {
  const { checkAuth } = asyncServerRequest;
  try {
    dispatch(authActions.authFetching());
    const response = await checkAuth(token);
    if (response.data.success) {
      dispatch(authActions.authFetchingSuccess({
        id: response.data.userData.id,
        login: response.data.userData.login,
        username: response.data.userData.username,
        avatar: response.data.userData.avatar,
      }))
    } else {
      dispatch(authActions.authFetchingError(response.data.error || ''));
    }
  } catch (e) {
    let result = e as Error;
    dispatch(authActions.authFetchingError(result.message))
  }

}

const fetchRegister = ({username, login, password}: {username: string, password: string, login: string}) => async (dispatch: AppDispatch) => {
  try {
    const { setToken,  } = authActions
    const { register } = asyncServerRequest;
    dispatch(authActions.authFetching());
    const response = await register(login, password, username);
    if (response.data.success) {
      dispatch(setToken(response.data.token as string));
      // dispatch()
    }
  } catch (e) {

  }
}

export { fetchAuth, fetchRegister }