const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json()
};

function request(url, config) {
  return fetch(url, config).then(getResponseData)
};

//Получение от сервера данных об ингредиентах
export const getIngredientsDataServer = (apiConfig) => {
  return request(`${apiConfig.baseUrl}/api/ingredients`, {
    method: 'GET',
    headers: apiConfig.headers
  })
};

//Отправка запроса о заказе и получение от сервера ответа с ID заказа
export const postOrder = async (apiConfig, arrId) => {
  return request(`${apiConfig.baseUrl}/api/orders`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'ingredients': arrId
    })
  })
};

//Отправка данных для регистрации
export const postRegisterUserRequest = async (apiConfig, valueName, valueEmail, valuePassword) => {
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
export const postResetEmailRequest = async (apiConfig, valueEmail) => {
  return request(`${apiConfig.baseUrl}/api/password-reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'email': valueEmail
    })
  })
};

//Отправка нового пароля и проверочного кода
export const postResetPasswordRequest = async (apiConfig, valuePassword, valueCode) => {
  return request(`${apiConfig.baseUrl}/api/password-reset/reset`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'password': valuePassword,
      'token': valueCode
    })
  })
};

//Запрос входа в аккаунт
export const requestLoginServer = async (apiConfig, email, password) => {
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
export const requestLogoutServer = async (apiConfig, refreshToken) => {
  return request(`${apiConfig.baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'token': refreshToken
    })
  })
};