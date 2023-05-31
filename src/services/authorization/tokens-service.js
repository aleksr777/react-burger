import { STORAGE_KEY_PREFIX } from '../../constants/constants';

const accessTokenName = `${STORAGE_KEY_PREFIX}a-tkn`;
const refreshTokenName = `${STORAGE_KEY_PREFIX}r-tkn`;

function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  };
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  };
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
  };
  // Добавление атрибута SameSite
  if (props.sameSite) {
    updatedCookie += '; SameSite=' + props.sameSite;
  };
  // Добавление атрибута max-age
  if (props.maxAge) {
    updatedCookie += '; max-age=' + props.maxAge;
  };
  // Добавление атрибута Secure
  if (props.secure) {
    updatedCookie += '; Secure';
  };
  // Добавление атрибута HttpOnly
  if (props.httpOnly) {
    updatedCookie += '; HttpOnly';
  };
  document.cookie = updatedCookie;
};

function getCookie(name) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : '';
};

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function removeTokens() {
  deleteCookie(accessTokenName);
  deleteCookie(refreshTokenName);
};

export function saveAccessToken(accessToken) {
  if (accessToken && accessToken.indexOf('Bearer') === 0) {
    // Отделяем схему авторизации от "полезной нагрузки токена"
    deleteCookie(accessTokenName);
    setCookie(accessTokenName, accessToken.split('Bearer ')[1], {
      sameSite: "Strict",
      maxAge: 1200, // 20 мин
      secure: true
    });
  }
  else if (accessToken) {
    deleteCookie(accessTokenName);
    setCookie(accessTokenName, accessToken, {
      sameSite: "Strict",
      maxAge: 1200, // 20 мин
      secure: true
    });
  };
};

export function saveRefreshToken(refreshToken) {
  if (refreshToken) {
    deleteCookie(refreshTokenName);
    setCookie(refreshTokenName, refreshToken, {
      sameSite: "Strict",
      maxAge: 86400, // 24 часа
      secure: true
    });
  }
};

export function getAccessToken() {
  const token = getCookie(accessTokenName);
  return token ? `Bearer ${token}` : '';
};

export function getRawAccessToken() {
  const token = getCookie(accessTokenName);
  return token ? token : '';
};

export function getRefreshToken() {
  return getCookie(refreshTokenName);
};
