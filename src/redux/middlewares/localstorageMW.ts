import { authActions } from '../reducers/authReducer/authReducer';
import { AppStore } from '../store';
import { Action, Middleware } from '@reduxjs/toolkit';
import { LSVariables } from '../../vriables/variables';

const localstorageMW: Middleware = api => next => action => {
  switch (true) {
    case authActions.setToken.match(action): localStorage.setItem(LSVariables.TOKEN_STORAGE_NAME, JSON.stringify({key: action.payload}))
  }
  return next(action)
}

export { localstorageMW };