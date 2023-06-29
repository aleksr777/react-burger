import { STORAGE_KEY_PREFIX } from '../../constants/constants';

type CookieProps = {
  expires?: Date | number | string | unknown;
  sameSite?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  [key: string]: any; // Дополнительные свойства
};

const accessTokenName: string = `${STORAGE_KEY_PREFIX}a-tkn`;
const refreshTokenName: string = `${STORAGE_KEY_PREFIX}r-tkn`;

function setCookie(name: string, value: string, props: CookieProps): void {
  props = props || {};
  let exp: Date | number | string | unknown = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  } else if (exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  } else if (typeof exp === 'string') {
    exp = new Date(exp);
    if (exp instanceof Date && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    if (propName !== 'sameSite' && propName !== 'maxAge') {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
  }
  if (props.sameSite) {
    updatedCookie += '; SameSite=' + props.sameSite;
  }
  if (props.maxAge) {
    updatedCookie += '; max-age=' + props.maxAge;
  }
  if (props.expires) {
    updatedCookie += '; expires=' + props.expires;
  }
  if (props.secure) {
    updatedCookie += '; Secure';
  }
  if (props.httpOnly) {
    updatedCookie += '; HttpOnly';
  }
  document.cookie = updatedCookie;
}

function getCookie(name: string): string {
  let matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function removeTokens(): void {
  deleteCookie(accessTokenName);
  deleteCookie(refreshTokenName);
}

export function saveAccessToken(accessToken: string): void {
  if (accessToken && accessToken.indexOf('Bearer') === 0) {
    deleteCookie(accessTokenName);
    setCookie(accessTokenName, accessToken.split('Bearer ')[1], {
      sameSite: 'None',
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });
  } else if (accessToken) {
    deleteCookie(accessTokenName);
    setCookie(accessTokenName, accessToken, {
      sameSite: 'None',
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });
  }
}

export function saveRefreshToken(refreshToken: string): void {
  if (refreshToken) {
    deleteCookie(refreshTokenName);
    setCookie(refreshTokenName, refreshToken, {
      sameSite: 'None',
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });
  }
}

export function getAccessToken(): string {
  const token: string = getCookie(accessTokenName);
  return token ? `Bearer ${token}` : '';
}

export function getRawAccessToken(): string {
  const token: string = getCookie(accessTokenName);
  return token ? token : '';
}

export function getRefreshToken(): string {
  return getCookie(refreshTokenName);
}
