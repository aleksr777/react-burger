const getResponseData =(res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json()
};

function request(baseUrl) {
  return fetch(baseUrl).then(getResponseData)
};

export const getIngredientsData = ({ baseUrl }) => {
  return request(baseUrl)
};
