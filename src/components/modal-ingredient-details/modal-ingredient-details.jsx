import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT_DETAILS } from '../../services/ingredient-details/ingredient-details-actions';
import { REMOVE_MODAL } from '../../services/modal/modal-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { MODAL_ANIMATION_TIME } from '../../constants/constants';


const getIngredientDetailsState = state => state.ingredientDetails;
const getModalState = state => state.modal.isOpened;

const ModalIngredientDetails = () => {

  const dispatch = useDispatch();

  const { ingredient } = useSelector(getIngredientDetailsState);
  const isOpened = useSelector(getModalState);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_MODAL, payload: {} });
    setTimeout(() => {
      dispatch({ type: REMOVE_INGREDIENT_DETAILS, payload: {} });
    }, MODAL_ANIMATION_TIME);
  };

  /* прерываем код, если ingredient не определён*/
  if (!ingredient) {
    return null
  }

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isOpened}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
};

export default ModalIngredientDetails;