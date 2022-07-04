import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './declare_modules.d';
import { setDefaultLocalStorage } from './features/set-default-local-storage';
import './index.scss';
import { setupStore } from './redux/store';
import { asyncServerRequest, createFakeBackend } from './fakeBackend';
import { BrowserRouter } from 'react-router-dom';


createFakeBackend();
setDefaultLocalStorage();
const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
