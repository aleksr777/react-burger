/* Прозрачная картинка для  "пустой булки" и "пустого ингредиента"*/
import transparentImgPath from '../images/transparent-picture.png';

export const bodySelector = document.querySelector('body');

/* Настройка API */
export const apiConfig = {
  baseUrl: 'https://norma.nomoreparties.space',
  headers: {
    authorization: '',
    'Content-Type': 'application/json'
  }
};

/* Продолжительность анимации для модальных окон */
export const MODAL_ANIMATION_TIME = 600;
const modalCssTimeOpen = Math.round(MODAL_ANIMATION_TIME / 1.4);
const modalCssTimeClose = Math.round(MODAL_ANIMATION_TIME / 1.2);
document.documentElement.style.setProperty('--modal-animation-time-open', `${modalCssTimeOpen}ms`);
document.documentElement.style.setProperty('--modal-animation-time-close', `${modalCssTimeClose}ms`);

/* Продолжительность анимации для лоадера */
export const LOADER_ANIMATION_TIME = 400;
const loaderCssTime = Math.round(MODAL_ANIMATION_TIME / 2);
document.documentElement.style.setProperty('--loader-animation-time', `${loaderCssTime}ms`);

// Объект для отображения "пустой булки", если булка не выбрана
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


// Объект для отображения "пустого ингредиента", если ингредиент не выбран
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