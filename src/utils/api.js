const getResponseData =(res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 

export const getIngredientsData = ({ baseUrl }) => {
  return fetch(baseUrl)
    .then(res => { return getResponseData(res) })
};
