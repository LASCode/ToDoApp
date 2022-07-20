import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './declare_modules.d';
import { setDefaultLocalStorage } from './features/set-default-local-storage';
import './index.scss';
import { setupStore } from './redux/store';
import { createFakeBackend } from './fakeBackend';
import { BrowserRouter } from 'react-router-dom';
import { LSVariables } from './vriables/variables';


createFakeBackend();
setDefaultLocalStorage();
const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();

store.subscribe(() => {
  localStorage.setItem(LSVariables.TOKEN_STORAGE_NAME, JSON.stringify({key: store.getState().authReducer.token}));
})


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
