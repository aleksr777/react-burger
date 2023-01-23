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

//Отправка запроса о заказе и получение от сервера ответа с данными
export const postOrder = async (apiConfig, arrId) => {
  return request(`${apiConfig.baseUrl}/api/orders`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      'ingredients': arrId
    })
  })
};
