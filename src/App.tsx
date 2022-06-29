import './App.scss';
import { Portal } from 'react-portal';
import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchAuth } from './redux/actions';
import { TimeLineBox } from './components/TimeLineBox/TimeLineBox';
import { Header } from './components/Header/Header';
import { authActions } from './redux/reducers/authReducer/authReducer';
import { getAuthToken } from './features/get-auth-token';
import { setDefaultLocalStorage } from './features/set-default-local-storage';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

function App() {
  const dispatch = useAppDispatch();
  const { token, access, userData } = useAppSelector(state => state.authReducer)
  const s = useAppSelector(state => state.authReducer)
  const [siteAccess, setSiteAccess] = useState(false);
  const [timePassed, setTimePassed] = useState(false);


  useEffect(() => {
    setDefaultLocalStorage();
    dispatch(authActions.setToken(getAuthToken()));
    setTimeout(() => setTimePassed(true), 0);
  }, [dispatch]);

  useEffect(() => {
    if (token !== false) {
      if (token !== '') {
        dispatch(fetchAuth(token))
      } else {
        dispatch(authActions.setAccess());
      }
    }
  }, [token])

  useEffect(() => {
    if (access && timePassed) {
      setSiteAccess(true);
    }
  }, [access, timePassed])


  return (
    <div className="App">
      <div className={'App__container'}>
        <header className={'App__header'}> <Header/> </header>
        <main className={'App__main'}>
          <div className={'App__navbar'}> <Navigation/> </div>
          <div className={'App__content'}>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </div>
          <div className={'App__timeline'}> <TimeLineBox/> </div>
        </main>
      </div>
      {!siteAccess &&
        <Portal node={document.body}>
          <div className={'App__test-access-box'}/>
        </Portal>
      }
    </div>
  );
}

export default App;
