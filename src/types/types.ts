export type IngredientObjType = {
  _id: string;
  _uKey?: string;
  locationDnd?: string;
  __v: number;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  type: string;
};

export type CounterType = { [key: string]: number };

export type OrderType = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: 'created' | 'pending' | 'done' | '';
  updatedAt: string;
  totalPrice?: number;
};

export type IngredientsDataStateType = {
  ingredientsData: IngredientObjType[];
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
  orders: OrderType[] | null;
};

export type FeedOrdersStateType = LoadingStateType & {
  orders: OrderType[] | null;
  total: null | number;
  totalToday: null | number;
};

export type OrderDetails = {
  order: OrderType;
  isModalOpened: boolean;
};
