import { SelectedIngredientType, IngredientInfoType, OrderInfoType } from '../../types/types';

// Подсчёт общей стоимости
export function getTotalPrice(arrIngredients: SelectedIngredientType[]): number {
  let totalPrice = 0;
  if (arrIngredients.length) {
    for (let i = 0; i < arrIngredients.length; i++) {
      if (arrIngredients[i].price && typeof arrIngredients[i].price === 'number') {
        totalPrice = totalPrice + arrIngredients[i].price;
      }
    }
  }
  return totalPrice;
}

// Формируем массив данных выбранных ингредиентов, необходимых для рендера
export function getArrIngredients(
  ingredientsData: IngredientInfoType[],
  order: OrderInfoType
): SelectedIngredientType[] {
  let arrIngredients: SelectedIngredientType[] = [];
  if (ingredientsData.length && order.ingredients.length) {
    for (let i = 0; i < order.ingredients.length; i++) {
      let count: number = 0;
      for (let j = 0; j < order.ingredients.length; j++) {
        if (order.ingredients[i] === order.ingredients[j]) {
          count = count + 1; //число повторений ингредиента
        }
      }

      const foundIngredient = ingredientsData.find(function (item: IngredientInfoType) {
        return item._id === order.ingredients[i];
      });
      foundIngredient &&
        arrIngredients.push({
          _id: foundIngredient._id,
          name: foundIngredient.name,
          path: foundIngredient.image,
          price: foundIngredient.price,
          count: count,
        });
    }
  }

  return arrIngredients;
}

// Удаление повторяющиеся компонентов
export function removeDuplicateIngredients(
  arrIngredients: SelectedIngredientType[]
): SelectedIngredientType[] | [] {
  if (arrIngredients.length > 1) {
    return arrIngredients.filter(function (
      ingredient: SelectedIngredientType,
      index: number,
      ingredientsArr: SelectedIngredientType[]
    ) {
      return (
        ingredientsArr.findIndex(function (obj: SelectedIngredientType) {
          return obj.name === ingredient.name;
        }) === index
      );
    });
  } else {
    return arrIngredients;
  }
}
