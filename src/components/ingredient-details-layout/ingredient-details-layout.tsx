import ingrDetailsStyles from './ingredient-details-layout.module.css'
import { useState } from 'react'
import { IngredientObjType } from '../../types/types'

type Props = {
  ingredient: IngredientObjType
  titleAlign: 'left' | 'center' | 'right'
}


const IngredientDetailsLayout = ( { ingredient, titleAlign }: Props ) => {

  const [ isImgError, setIsImgError ] = useState<boolean>( false )

  function handleImgError () {
    setIsImgError( true )
  }

  return (
    <>
      <p className={ ingrDetailsStyles.title } style={ { textAlign: titleAlign } }>
        Детали ингредиента
      </p>

      <picture className={ ingrDetailsStyles.imageBox }>
        <img
          className={ ingrDetailsStyles.image }
          src={ ingredient.image_large }
          alt={ `Изображение "${ ingredient.name }".` }
          draggable='false'
          onError={ handleImgError }
          style={ { color: isImgError ? '#8585AD' : '' } } // по-умолчанию текст прозрачный
        />
      </picture>

      <p className={ ingrDetailsStyles.name }>{ ingredient.name }</p>

      <div className={ ingrDetailsStyles.composition }>
        <div className={ ingrDetailsStyles.composition__item }>
          <p className={ ingrDetailsStyles.composition__text }>Калории, ккал</p>
          <p className={ ingrDetailsStyles.composition__number }>{ ingredient.calories }</p>
        </div>
        <div className={ ingrDetailsStyles.composition__item }>
          <p className={ ingrDetailsStyles.composition__text }>Белки, г</p>
          <p className={ ingrDetailsStyles.composition__number }>{ ingredient.proteins }</p>
        </div>
        <div className={ ingrDetailsStyles.composition__item }>
          <p className={ ingrDetailsStyles.composition__text }>Жиры, г</p>
          <p className={ ingrDetailsStyles.composition__number }>{ ingredient.fat }</p>
        </div>
        <div className={ ingrDetailsStyles.composition__item }>
          <p className={ ingrDetailsStyles.composition__text }>Углеводы, г</p>
          <p className={ ingrDetailsStyles.composition__number }>{ ingredient.carbohydrates }</p>
        </div>
      </div>
    </>
  )
}

export default IngredientDetailsLayout
