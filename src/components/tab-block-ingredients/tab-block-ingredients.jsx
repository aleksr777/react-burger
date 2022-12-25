import { useState } from 'react';
import { Link } from 'react-scroll';
import TabBlockStyles from './tab-block-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TabBlockIngredients = () => {

  const [current, setCurrent] = useState('buns');

  return (
    <div className={TabBlockStyles.tab}>
      <Link to='buns' activeClass='active' spy={true} smooth={true} duration={700} containerId='section-blocks'>
        <Tab value='buns' active={current === 'buns'} onClick={setCurrent}>Булки</Tab>
      </Link>
      <Link to='sauces' activeClass='active' spy={true} smooth={true} duration={700} containerId='section-blocks'>
        <Tab value='sauces' active={current === 'sauces'} onClick={setCurrent}>Соусы</Tab>
      </Link>
      <Link to='fillings' activeClass='active' spy={true} smooth={true} duration={700} containerId='section-blocks'>
        <Tab value='fillings' active={current === 'fillings'} onClick={setCurrent}>Начинки</Tab>
      </Link>
    </div>
  )
};

export default TabBlockIngredients;