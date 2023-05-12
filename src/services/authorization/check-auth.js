import {
  getAccessToken,
  getRefreshToken,
} from './tokens-service';

export function checkAuth(isAuthSuccess, userEmail) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return (accessToken && refreshToken && isAuthSuccess && userEmail) ? true : false;
}