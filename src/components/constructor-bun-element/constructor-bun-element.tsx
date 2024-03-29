import styles from './constructor-bun-element.module.css'
import { useAppSelector } from '../../hooks/useAppSelector'
import { memo } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { getSelectedIngrState } from '../../utils/selectors'

export interface Props {
  type: 'top' | 'bottom' | undefined
  positionText: '(верх)' | '(низ)'
}


const ConstructorBunElement = ( { type, positionText }: Props ) => {

  const { bun } = useAppSelector( getSelectedIngrState )

  let nameTxt: string
  let positionTxt: string

  if ( bun._id ) {
    nameTxt = bun.name
    positionTxt = positionText
  }
  else {
    nameTxt = 'Выберите и перенесите сюда булку'
    positionTxt = ''
  };

  return (
    <div className={ styles.boxElement } style={ { opacity: bun._id ? 1 : 0.6 } }>
      <ConstructorElement
        isLocked={ true }
        type={ type }
        text={ `${ nameTxt } ${ positionTxt }` }
        price={ bun.price }
        thumbnail={ bun.image }
      />
    </div>
  )
}

export default memo( ConstructorBunElement )
