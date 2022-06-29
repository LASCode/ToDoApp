import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './declare_modules.d';
import './index.scss';
import { setupStore } from './redux/store';
import { asyncServerRequest, createFakeBackend } from './fakeBackend';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();
createFakeBackend();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
