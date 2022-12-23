import { useState } from "react";
import TabBlockStyles from './tab-block-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TabBlockIngredients = () => {
  const [current, setCurrent] = useState('one')
  return (
    <div className={TabBlockStyles.tab}>
      <Tab value='buns' active={current === 'buns'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
};

export default TabBlockIngredients;