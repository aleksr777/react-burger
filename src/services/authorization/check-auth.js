import {
  getAccessToken,
  getRefreshToken,
} from './tokens-service';

export function checkAuth(isAuthSuccess, userEmail) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  console.log(accessToken);
  console.log(refreshToken);
  return (accessToken && refreshToken && isAuthSuccess && userEmail) ? true : false;
}