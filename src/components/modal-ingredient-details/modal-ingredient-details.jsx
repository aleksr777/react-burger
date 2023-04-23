import { useSelector, useDispatch } from 'react-redux';
import { closeIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const getIngredientDetailsState = state => state.ingredientDetails;


const ModalIngredientDetails = () => {

  const dispatch = useDispatch();

  /* isModalOpened нужен для анимации 
  (иначе информация об ингредиенте в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { ingredient, isModalOpened } = useSelector(getIngredientDetailsState);

  if (!ingredient) {
    return null
  }

  const handleCloseModal = () => {
    dispatch(closeIngredientDetailsModal());
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  )
};

export default ModalIngredientDetails;