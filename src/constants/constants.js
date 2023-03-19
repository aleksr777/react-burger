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
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: transparentImgPath,
  image_large: transparentImgPath,
  image_mobile: transparentImgPath,
  name: 'Выберите и перенесите сюда булку',
  price: 0,
  proteins: 0,
  type: 'bun',
  __v: 0,
  _id: ''
};


// Объект для отображения "пустого" ингредиента, если ингредиент не выбран
export const noIngrObj = {
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: transparentImgPath,
  image_large: transparentImgPath,
  image_mobile: transparentImgPath,
  name: 'Выберите и перенесите сюда ингредиенты',
  price: 0,
  proteins: 0,
  type: 'ingr',
  __v: 0,
  _id: ''
};