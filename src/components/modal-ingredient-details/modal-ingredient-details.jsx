import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT_DETAILS } from '../../services/ingredient-details/ingredient-details-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';


const getIngredientDetailsState = state => state.ingredientDetails.ingredient;

const ModalIngredientDetails = () => {

  const dispatch = useDispatch();

  const currentIngredient = useSelector(getIngredientDetailsState);

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