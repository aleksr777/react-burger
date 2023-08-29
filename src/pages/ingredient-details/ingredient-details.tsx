import styles from './ingredient-details.module.css'
import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useLocation, useNavigate } from "react-router-dom"
import { getIngredientInfo } from '../../services/ingredients-data/ingredients-data-actions'
import IngredientDetailsLayout from '../../components/ingredient-details-layout/ingredient-details-layout'
import { getIngredientDetailsState } from '../../utils/selectors'

/* Реализовал этот компонент так, чтобы можно было получить информацию по ингредиенту, если переходить на страницу по внешней ссылке*/
const IngredientDetailsPage = () => {

  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  //достаём id из строки адреса
  const id: string | undefined = pathname.split( '/' ).pop()

  const { ingredient } = useAppSelector( getIngredientDetailsState )

  function goToNotFoundPage () {
    navigate( '/not-found-page', { replace: true } )
  }

  useEffect( () => {
    if ( !ingredient || !ingredient._id || ingredient.path !== pathname ) {
      dispatch( getIngredientInfo( goToNotFoundPage, id, pathname ) )
    }
  }, [] )

  return (
    ingredient &&
    <div className={ styles.container }>
      <IngredientDetailsLayout ingredient={ ingredient } titleAlign='center' />
    </div>
  )
}

export default IngredientDetailsPage
