import { STORAGE_KEY_PREFIX } from '../../constants/constants';

const accessTokenName = `${STORAGE_KEY_PREFIX}access-token`;
const refreshTokenName = `${STORAGE_KEY_PREFIX}refresh-token`;

export function removeTokens() {
  localStorage.removeItem(accessTokenName);
  localStorage.removeItem(refreshTokenName);
}

export function saveAccessToken(accessToken) {
  localStorage.setItem(accessTokenName, accessToken);
}

export function saveRefreshToken(refreshToken) {
  localStorage.setItem(refreshTokenName, refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem(accessTokenName);
}

export function getRefreshToken() {
  return localStorage.getItem(refreshTokenName);
}