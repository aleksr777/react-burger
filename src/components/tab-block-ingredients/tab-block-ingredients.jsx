import TabBlockStyles from './tab-block-ingredients.module.css';
import TabElement from '../tab-element/tab-element';

const TabBlockIngredients = () => {

  return (
    <div className={TabBlockStyles.tab}>
      <TabElement ingredientText='buns'>Булки</TabElement >
      <TabElement ingredientText='sauces'>Соусы</TabElement >
      <TabElement ingredientText='fillings'>Начинки</TabElement >
    </div>
  )
};

export default TabBlockIngredients;