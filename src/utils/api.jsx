import { STORAGE_KEY_PREFIX } from '../constants/constants';
const accessToken = localStorage.getItem(`${STORAGE_KEY_PREFIX}accessToken`);

/* КонКонфигурация API */
const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space',
  headers: {
    authorization: accessToken,
    'Content-Type': 'application/json'
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
export const getIngredientsDataServer = () => {
  return request(`${apiConfig.baseUrl}/api/ingredients`, {
    method: 'GET',
    headers: apiConfig.headers
  })
};

//Отправка запроса о заказе и получение от сервера ответа с ID заказа
export const postOrder = async (arrId) => {
  return request(`${apiConfig.baseUrl}/api/orders`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'ingredients': arrId
    })
  })
};

//Запрос входа в аккаунт
export const requestLoginServer = async (email, password) => {
  return request(`${apiConfig.baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  })
};

// Запрос выхода из аккаунта
export const requestLogoutServer = async (refreshToken) => {
  return request(`${apiConfig.baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'token': refreshToken
    })
  })
};

// Запрос на обновление токена
export const requestUpdateTokenServer = async (refreshToken) => {
  return request(`${apiConfig.baseUrl}/api/auth/token`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'token': refreshToken
    })
  })
};

//Отправка данных для регистрации
export const registerUserRequestServer = async (valueName, valueEmail, valuePassword) => {
  return request(`${apiConfig.baseUrl}/api/auth/register`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'email': valueEmail,
      'password': valuePassword,
      'name': valueName 
    })
  })
};

//Отправка адреса email для сброса пароля
export const forgotPasswordRequestServer = async (valueEmail) => {
  return request(`${apiConfig.baseUrl}/api/password-reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'email': valueEmail
    })
  })
};

//Отправка нового пароля и проверочного кода
export const resetPasswordRequestServer = async (valuePassword, valueCode) => {
  return request(`${apiConfig.baseUrl}/api/password-reset/reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'password': valuePassword,
      'token': valueCode
    })
  })
};