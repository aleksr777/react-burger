/* КонКонфигурация API */
import {
  getAccessToken,
  getRefreshToken,
} from '../services/authorization/tokens-service';

/**
 * Сделал функцию, чтобы accessToken считывался напрямую из памяти при каждом обращении к серверу
 */
function getApiConfig() {
  const accessToken = getAccessToken();
  return {
    baseUrl: 'https://norma.nomoreparties.space',
    headers: {
      authorization: accessToken,
      'Content-Type': 'application/json'
    }
  }
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json()
};

function request(url, config) {
  return fetch(url, config).then(getResponseData)
};


//Получение от сервера данных об ингредиентах
export const requestGetIngredientsDataServer = () => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/ingredients`, {
    method: 'GET',
    headers,
  })
};


//Отправка запроса о заказе и получение от сервера ответа с ID заказа
export const postOrder = async (arrId) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'ingredients': arrId,
    })
  })
};


//Запрос входа в аккаунт
export const requestLoginServer = async (email, password) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'email': email,
      'password': password,
    })
  })
};

//Запрос на получение данных о пользователе
export const requestGetUserDataServer = async () => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/user`, {
    method: 'GET',
    headers,
  })
};

//Запрос на изменение данных о пользователе
export const requestChangeUserDataServer = async ({ name, email, password }) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/user`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
    })
  })
};

// Запрос выхода из аккаунта
export const requestLogoutServer = async () => {
  const refreshToken = getRefreshToken();
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'token': refreshToken,
    })
  })
};


// Запрос на обновление токена
export const requestUpdateTokenServer = async () => {
  const refreshToken = getRefreshToken();
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'token': refreshToken,
    })
  })
};


//Отправка данных для регистрации
export const registerUserRequestServer = async (name, email, password) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/auth/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'email': email,
      'password': password,
      'name': name,
    })
  })
};


//Отправка адреса email для сброса пароля
export const forgotPasswordRequestServer = async (valueEmail) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/password-reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'email': valueEmail,
    })
  })
};


//Отправка нового пароля и проверочного кода
export const resetPasswordRequestServer = async (valuePassword, valueCode) => {
  const { baseUrl, headers } = getApiConfig();
  return request(`${baseUrl}/api/password-reset/reset`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'password': valuePassword,
      'token': valueCode,
    })
  })
};