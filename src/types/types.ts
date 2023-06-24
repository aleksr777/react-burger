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

export type CounterType = { [key: string]: number };

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

export type AuthStateType = LoadingStateType & {
  user: {
    name: string;
    email: string;
  };
};

export type OrderIdStateType = {
  isError: boolean;
  isLoading: boolean;
  id: null | number;
  isModalOpened: boolean;
};

export type ProfileOrdersStateType = LoadingStateType & {
  orders: OrderInfoType[] | null;
};

export type FeedOrdersStateType = LoadingStateType & {
  orders: OrderInfoType[] | null;
  total: null | number;
  totalToday: null | number;
};

export type OrderDetails = {
  order: OrderInfoType;
  isModalOpened: boolean;
};
