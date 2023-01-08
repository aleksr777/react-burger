import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../ui/modal/modal';

const ModalIngredientDetails = () => {

  const dispatch = useDispatch();

  const currentIngredient = useSelector(state => state.ingredientDetails.ingredient);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_INGREDIENT_DETAILS, payload: {} });
  };

  return (
    <>
      {
        currentIngredient
          ? (<Modal handleCloseModal={handleCloseModal}><IngredientDetails ingredient={currentIngredient} /></Modal>)
          : null
      }
    </>
  )
};

export default ModalIngredientDetails;