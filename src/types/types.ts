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
  status: string;
  updatedAt: string;
};
