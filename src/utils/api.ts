import {
  getAccessToken,
  getRefreshToken,
  getRawAccessToken
} from '../services/authorization/tokens-service';

const baseUrl: string = 'norma.nomoreparties.space';
export const urlFeedOrders: string = `wss://${baseUrl}/orders/all`;
export const urlProfileOrders: string = `wss://${baseUrl}/orders`;

interface ApiConfig {
  baseUrl: string;
  headers: {
    authorization: string;
    'Content-Type': 'application/json';
  };
}

function getApiConfig(): ApiConfig {
  const accessToken = getAccessToken();
  return {
    baseUrl: `https://${baseUrl}`,
    headers: {
      authorization: accessToken,
      'Content-Type': 'application/json'
    }
  };
}

function getResponseData(res: Response) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function request(url: string, config: RequestInit) {
  return fetch(url, config).then(getResponseData);
}

export const requestGetIngredientsDataServer = () => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/ingredients`, {
    method: 'GET',
    headers
  });
};

export const postOrder = async (arrId: string[]) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ingredients: arrId
    })
  });
};

export const requestLoginServer = async (email: string, password: string) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password
    })
  });
};

export const requestGetUserDataServer = async () => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/user`, {
    method: 'GET',
    headers
  });
};

export const requestChangeUserDataServer = async ({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/user`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
};

export const requestLogoutServer = async () => {
  const refreshToken = getRefreshToken();
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      token: refreshToken
    })
  });
};

export const requestUpdateTokenServer = async () => {
  const refreshToken = getRefreshToken();
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      token: refreshToken
    })
  });
};

export const registerUserRequestServer = async (name: string, email: string, password: string) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
      name
    })
  });
};

export const forgotPasswordRequestServer = async (valueEmail: string) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/password-reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: valueEmail
    })
  });
};

export const resetPasswordRequestServer = async (valuePassword: string, valueCode: string) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/password-reset/reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      password: valuePassword,
      token: valueCode
    })
  });
};

export const openWebSocket = (url: string) => {
  const accessToken = getRawAccessToken();
  const ws = new WebSocket(`${url}?token=${accessToken}`);
  ws.onopen = () => {
    console.log('WebSocket соединение установлено');
  };
  return ws;
};

export const closeWebSocket = (ws: WebSocket) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
    console.log('WebSocket соединение закрыто');
  }
};
