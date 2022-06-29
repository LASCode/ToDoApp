import { LSVariables } from '../vriables/variables';

const setDefaultLocalStorage = (): void => {
  const tokenStorage = localStorage.getItem(LSVariables.TOKEN_STORAGE_NAME);
  const tasksStorage = localStorage.getItem(LSVariables.TASKS_STORAGE_NAME);
  if (!tokenStorage) { localStorage.setItem(LSVariables.TOKEN_STORAGE_NAME, JSON.stringify(LSVariables.TOKEN_STORAGE_DEFAULT_VALUE)) }
  if (!tasksStorage) { localStorage.setItem(LSVariables.TASKS_STORAGE_NAME, JSON.stringify(LSVariables.TASKS_STORAGE_DEFAULT_VALUE)) }
};

export { setDefaultLocalStorage };