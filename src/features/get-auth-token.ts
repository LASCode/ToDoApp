import { LSVariables } from '../vriables/variables';

const getAuthToken = (): string => {
  const result = localStorage.getItem(LSVariables.TOKEN_STORAGE_NAME) || `${LSVariables.TOKEN_STORAGE_DEFAULT_VALUE}`;
  return JSON.parse(result).key;
}

export { getAuthToken };
