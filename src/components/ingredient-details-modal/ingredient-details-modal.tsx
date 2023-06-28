import styles from './ingredient-details-modal.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useNavigate, useLocation } from 'react-router-dom'
import { closeIngredientDetailsModal } from '../../services/ingredient-details/ingredient-details-actions'
import IngredientDetailsLayout from '../ingredient-details-layout/ingredient-details-layout'
import Modal from '../modal/modal'
import { getIngredientDetailsState } from '../../utils/selectors'
import { IngredientInfoType } from '../../types/types'


const IngredientDetailsModal = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  /* isModalOpened нужен для анимации
  (иначе информация об ингредиенте в модальном окне исчезает раньше, чем окно успевает закрыться) */
  const { ingredient, isModalOpened }: { ingredient: IngredientInfoType, isModalOpened: boolean } = useAppSelector( getIngredientDetailsState )

  if ( !ingredient ) {
    return null
  }

  const fromPage: string = location.state?.from || '/'

  function goToPage () {
    navigate( fromPage, { replace: true } )
  }

  const handleCloseModal = () => {
    dispatch( closeIngredientDetailsModal( goToPage ) )
  }

  return (
    <Modal handleCloseModal={ handleCloseModal } isModalOpened={ isModalOpened }>
      <div className={ styles.container }>
        <IngredientDetailsLayout ingredient={ ingredient } titleAlign='left' />
      </div>
    </Modal>
  )
}

export default IngredientDetailsModal