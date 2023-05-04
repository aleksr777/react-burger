import stylesModalIngredientDetails from './modal-ingredient-details.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

const getIngredientDetailsState = state => state.ingredientDetails;


const ModalIngredientDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  /* isModalOpened нужен для анимации 
  (иначе информация об ингредиенте в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { ingredient, isModalOpened } = useSelector(getIngredientDetailsState);

  if (!ingredient) {
    return null
  }

  const handleCloseModal = () => {
    dispatch(closeIngredientDetailsModal(navigate, fromPage));
  };

  return (
    <Modal handleCloseModal={handleCloseModal} isModalOpened={isModalOpened}>
      <div className={stylesModalIngredientDetails.container}>
        <IngredientDetails ingredient={ingredient} titleAlign='left' />
      </div>
    </Modal>
  )
};

export default ModalIngredientDetails;