import { checkTokenValidity } from './api';

export const isAuthenticated = async () => {
  const tokenIsValid = await checkTokenValidity();
  return tokenIsValid;
};
