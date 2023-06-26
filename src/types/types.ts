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

export type CounterType = {
  [key: string]: number;
};

export type CounterStateType = {
  counter: CounterType;
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

export type IngredientsDataType = {
  ingredientsData: IngredientInfoType[];
};

export type IngredientsDataStateType = IngredientsDataType & {
  isError: boolean;
  isLoading: boolean;
};

export type LoadingStateType = {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};

export type ObjStringType = {
  [key: string]: string;
};

type UserType = {
  name: string;
  email: string;
};

export type UserDataType = ObjStringType &
  UserType & {
    password: string;
  };

export type AuthStateType = LoadingStateType & {
  user: UserType;
};

export type OrderIdStateType = {
  isError: boolean;
  isLoading: boolean;
  id: null | number;
  isModalOpened: boolean;
};

export type OrdersStateType = LoadingStateType & {
  orders: OrderInfoType[] | null;
  total?: null | number;
  totalToday?: null | number;
};

export type OrderDetailsStateType = {
  order: OrderInfoType;
  isModalOpened: boolean;
};

export type SelectedIngredientStateType = {
  ingredients: SelectedIngredientType[];
  bun: SelectedIngredientType;
  totalPrice: number;
};

export type CurrentTabStateType = {
  currentTab: string;
};
