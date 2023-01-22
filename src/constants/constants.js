import transparentImgPath from '../images/transparent-picture.png';

export const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space',
  headers: {
    authorization: '',
    'Content-Type': 'application/json'
  }
};

// Объект сделал для отображения "пустой" булки, если булка не выбрана
export const noBunObj = {
  image: transparentImgPath,
  name: '',
  price: 0,
  _id: '',
  type: 'bun',
};


// Объект для отображения "пустого" ингредиента, если ингредиент не выбран
export const noIngrObj = {
  image: transparentImgPath,
  name: 'Выберите ингредиент',
  price: 0,
  _id: '',
  _uKey: '',
  type: 'ingr',
};