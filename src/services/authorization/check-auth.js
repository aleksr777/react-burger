import { STORAGE_KEY_PREFIX } from '../../constants/constants';

export function checkAuth(isAuthSuccess, userEmail) {
  const accessToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}access-token`);
  const refreshToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}refresh-token`);
  return (accessToken && refreshToken && isAuthSuccess && userEmail) ? true : false;
}