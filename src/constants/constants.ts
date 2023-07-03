/* Прозрачная картинка для "пустой булки" и "пустого ингредиента" */
import transparentImgPath from '../images/transparent-picture.png';
import { IngredientInfoType } from '../types/types';

export const bodySelector: HTMLElement = document.querySelector('body') as HTMLElement;

export const STORAGE_KEY_PREFIX = 'react-burger_application_';

/* Продолжительность анимации для модальных окон */
export const MODAL_ANIMATION_TIME = 560;
document.documentElement.style.setProperty('--modal-animation-time', `${MODAL_ANIMATION_TIME}ms`);

/* Продолжительность анимации для лоадера */
export const LOADER_ANIMATION_TIME = 300;
document.documentElement.style.setProperty('--loader-animation-time', `${LOADER_ANIMATION_TIME}ms`);

// Объект для отображения "пустой булки", если булка не выбрана
export const noBunObj: IngredientInfoType = {
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
  _id: '',
};

// Объект для отображения "пустого ингредиента", если ингредиент не выбран
export const noIngrObj: IngredientInfoType = {
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
  _id: '',
};
