import { useContext } from "react";
import PropTypes from 'prop-types';
import ItemStyles from './item-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PopupContext } from '../../context/popup-context';

const ItemIngredients = ({ children, itemPrice, itemTitle, imgPath, ingridient }) => {
  const { handleOpenModal, setPopupContent } = useContext(PopupContext);
  return (
    <li
      className={ItemStyles.item}
      onClick={() => {
        handleOpenModal();
        setPopupContent(<IngredientDetails ingridient={ingridient} />);
      }}
    >
      {children}
      <img
        className={ItemStyles.item__image}
        src={imgPath}
        alt={itemTitle}
      />
      <div className={ItemStyles.item__box}>
        <p className={ItemStyles.item__price}>{itemPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={ItemStyles.item__title}>{itemTitle}</p>
    </li>
  )
};

ItemIngredients.propTypes = {
  itemPrice: PropTypes.number.isRequired,
  imgPath: PropTypes.string.isRequired,
  itemTitle: PropTypes.string.isRequired
};

export default ItemIngredients;