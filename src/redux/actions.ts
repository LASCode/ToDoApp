import { AppDispatch } from './store';
import { asyncServerRequest } from '../fakeBackend';
import { authActions } from './reducers/authReducer/authReducer';

const fetchAuth = (token: string) => async (dispatch: AppDispatch) => {
  console.log(token)
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

export { fetchAuth }