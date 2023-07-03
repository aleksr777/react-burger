import styles from './order-info-ingredients.module.css'
import { useState, useEffect } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ImageDataType } from '../../types/types'

type Props = {
  orderData: {
    ingredients: ImageDataType[]
    totalPrice: number
  }
}


const OrderInfoIngredients = ( { orderData }: Props ) => {

  const stylePictureDefault: string = styles.picture
  const stylePictureOverflow: string = `${ styles.picture } ${ styles.picture_overflow }`

  const [ imagesData, setImagesData ] = useState<ImageDataType[]>( [] )

  let overflowCount: string | null = null

  const handleImageError = ( index: number ) => {
    let arr: ImageDataType[] = [ ...imagesData ]
    arr[ index ].isImgError = true
    setImagesData( arr )
  }

  function getArrRenderImg ( arrIngredients: ImageDataType[] ): ImageDataType[] {
    let arr: ImageDataType[] = []
    if ( arrIngredients ) {
      for ( let i = 0; i < 6 && i < arrIngredients.length; i += 1 ) {
        if ( arrIngredients[ i ] ) {
          arr.push( {
            _id: arrIngredients[ i ]._id,
            name: arrIngredients[ i ].name,
            path: arrIngredients[ i ].path,
            isImgError: false,
          } )
        }
      }
    }
    return arr
  }

  useEffect( () => {
    if ( orderData && orderData.ingredients.length ) {
      setImagesData( getArrRenderImg( orderData.ingredients ) )
    }
  }, [ orderData ] )

  if (
    orderData &&
    orderData.ingredients.length &&
    orderData.ingredients.length > 6
  ) {
    overflowCount = `+${ orderData.ingredients.length - 5 }`
  }

  return (
    imagesData &&
    orderData && (
      <div className={ styles.order_ingredients }>
        <div className={ styles.order__images }>
          { imagesData.map( ( obj, index ) => (
            <div className={ styles.imageWrapper } key={ obj._id }>
              { overflowCount && index === 5 && (
                <p className={ styles.countOverflow }>{ overflowCount }</p>
              ) }
              <picture
                className={ ( overflowCount && index === 5 ) ? stylePictureOverflow : stylePictureDefault }
              >
                <img
                  className={ styles.picture__img }
                  src={ obj.path }
                  alt={ obj.name }
                  draggable='false'
                  onError={ () => handleImageError( index ) }
                  style={ { color: obj.isImgError ? '#8585AD' : '' } }
                />
              </picture>
            </div>
          ) ) }
        </div>
        <div className={ styles.order__priceBlock }>
          <p className={ styles.priceBlock__number }>{ orderData.totalPrice }</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    )
  )
}

export default OrderInfoIngredients