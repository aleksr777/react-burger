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

export type OderType = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: 'created' | 'pending' | 'done' | '';
  updatedAt: string;
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
  orders: OderType[] | null;
};

export type FeedOrdersStateType = LoadingStateType & {
  orders: OderType[] | null;
  total: null | number;
  totalToday: null | number;
};
