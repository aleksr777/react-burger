import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT_DETAILS } from '../../services/ingredient-details/ingredient-details-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';


const getIngredientDetailsState = state => state.ingredientDetails;

const ModalIngredientDetails = () => {

  const dispatch = useDispatch();

  const { ingredient, isModalOpened } = useSelector(getIngredientDetailsState);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_INGREDIENT_DETAILS, payload: {} });
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
};

export default ModalIngredientDetails;