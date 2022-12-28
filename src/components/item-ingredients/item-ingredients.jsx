import { useState } from "react";
import PropTypes from 'prop-types';
import ItemStyles from './item-ingredients.module.css';
import ModalIngredientDetails from '../modal-ingredient-details/modal-ingredient-details';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ItemIngredients = ({ children, itemPrice, itemTitle, imgPath, ingridient }) => {

  const [popupContent, setPopupContent] = useState();

  const [ingridientId, setIngridientId] = useState();

  const handleOpenModal = (id, content) => {
    setIngridientId(id);
    setPopupContent(content);
  };

  const handleCloseModal = () => {
    setIngridientId();
    setPopupContent();
  };

  return (
    <>
      <li
        className={ItemStyles.item}
        onClick={() => {
          const content = (<ModalIngredientDetails ingridient={ingridient} handleCloseModal={handleCloseModal} />);
          handleOpenModal(ingridient._id, content);
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
      {ingridientId ? popupContent : null}
    </>
  )
};

ItemIngredients.propTypes = {
  itemPrice: PropTypes.number.isRequired,
  itemTitle: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  ingridient: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired
};

export default ItemIngredients;