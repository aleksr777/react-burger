import transparentImgPath from '../images/transparent-picture.png';

export const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space',
  headers: {
    authorization: '',
    'Content-Type': 'application/json'
  }
};

// этот объект сделал для отображения "пустой" булки, если булка не выбрана
export const noBunObj = {
  image: transparentImgPath,
  name: '',
  price: 0,
  _id: '',
  type: 'bun',
};