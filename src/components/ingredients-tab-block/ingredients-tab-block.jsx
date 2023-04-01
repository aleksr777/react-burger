import stylesTabBlockStyles from './ingredients-tab-block.module.css';
import TabElement from '../tab-element/tab-element';

const IngredientsTabBlock = () => {

  return (
    <div className={stylesTabBlockStyles.tab}>
      <TabElement ingredientText='buns'>Булки</TabElement >
      <TabElement ingredientText='sauces'>Соусы</TabElement >
      <TabElement ingredientText='fillings'>Начинки</TabElement >
    </div>
  )
};

export default IngredientsTabBlock;