import { useSelector, useDispatch } from 'react-redux';
import {
  CLOSE_MODAL_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from '../../services/ingredient-details/ingredient-details-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';


const getIngredientDetailsState = state => state.ingredientDetails;

const ModalIngredientDetails = () => {

  const dispatch = useDispatch();

  const { ingredient, isModalOpened } = useSelector(getIngredientDetailsState);

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL_INGREDIENT_DETAILS, payload: {} });
    setTimeout(() => {
      dispatch({ type: REMOVE_INGREDIENT_DETAILS, payload: {} });
    }, MODAL_ANIMATION_TIME);
  };

  /* прерываем код, если ingredient не определён*/
  if (!ingredient) {
    return null
  }

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
};

export default ModalIngredientDetails;