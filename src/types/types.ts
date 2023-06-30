import { Dispatch } from '@reduxjs/toolkit';

type IngredientType = {
  _id: string;
  name: string;
  price: number;
};
export type IngredientInfoType = IngredientType & {
  _uKey?: string;
  locationDnd?: string;
  __v: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  proteins: number;
  type: string;
  path?: string;
};
export type SelectedIngredientType = IngredientType & {
  path: string;
  count: number;
};

export type ImageDataType = {
  _id: string;
  name: string;
  path: string;
  isImgError?: boolean;
};

type OrderType = {
  _id: string;
  createdAt: string;
  name: string;
  number: number;
  status: 'created' | 'pending' | 'done' | '';
  updatedAt: string;
  totalPrice: number;
};
export type OrderInfoType = OrderType & {
  ingredients: string[];
};
export type OrderDataType = OrderType & {
  ingredients: SelectedIngredientType[];
};

export type LoadingStateType = {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

export type OrdersStateType = LoadingStateType & {
  orders: OrderInfoType[] | null;
  total?: null | number;
  totalToday?: null | number;
};

export type IngredientsDataType = {
  ingredientsData: IngredientInfoType[];
};

export type ObjKeyStringType = { [key: string]: string };

export type UserType = {
  name: string;
  email: string;
};
export type UserObjType = { user: UserType };
export type PasswordObjType = { password: string };
export type UserDataType = UserType & PasswordObjType & ObjKeyStringType;


export type TokensType = {
  success: true;
  accessToken: string;
  refreshToken: string;
};

export type MessageObjType = {
  success: true;
  message: string;
};

export type DispatchFuncType = (dispatch: Dispatch<any>) => void;
