// Подсчёт общей стоимости
export function getTotalPrice(arrIngredients) {
  let totalPrice = 0;
  if (arrIngredients.length) {
    for (let i = 0; i < arrIngredients.length; i++) {
      if (arrIngredients[i].price) {
        totalPrice = totalPrice + arrIngredients[i].price;
      }
    };
    return totalPrice;
  };
};


// Формируем массив данных выбранных ингредиентов, необходимых для рендера 
export function getArrIngredients(ingredientsData, order) {

  let arrIngredients = [];

  if (ingredientsData.length && order.ingredients.length) {

    for (let i = 0; i < order.ingredients.length; i++) {

      let count = 0;
      for (let j = 0; j < order.ingredients.length; j++) {
        if (order.ingredients[i] === order.ingredients[j]) {
          count = count + 1;//число повторений ингредиента
        }
      }

      const foundIngredient = ingredientsData.find(function (item) {
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
    };

    return arrIngredients;
  };
};


// Удаление повторяющиеся компонентов
export function removeDuplicateIngredients(arrIngredients) {
  if (arrIngredients.length > 1 && arrIngredients) {
    return arrIngredients.filter(function (value, index, self) {
      return self.findIndex(function (obj) {
        return obj.name === value.name;
      }) === index;
    });
  }
  else { return arrIngredients }
};