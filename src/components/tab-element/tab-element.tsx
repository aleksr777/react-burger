import React from 'react'
import { Link } from 'react-scroll'
import { useSelector, useDispatch } from 'react-redux'
import { SET_CURRENT_TAB } from '../../services/tab/tab-actions'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { getCurrentTabState } from '../../utils/selectors'
import { CurrentTabStateType } from '../../types/types'

type Props = {
  ingredientText: string
  children: React.ReactNode
}


const TabElement = ( { children, ingredientText }: Props ) => {

  const dispatch = useDispatch()
  const { currentTab }: CurrentTabStateType = useSelector( getCurrentTabState )

  function setCurrent ( ingredientText: string ) {
    dispatch( { type: SET_CURRENT_TAB, payload: { currentTab: ingredientText } } )
  }

  return (
    <Link
      to={ ingredientText }
      spy={ true }
      smooth={ true }
      hashSpy={ true }
      offset={ -30 }
      duration={ 800 }
      delay={ 0 }
      isDynamic={ true }
      spyThrottle={ 0 }
      ignoreCancelEvents={ false }
      onSetActive={ () => setCurrent( ingredientText ) }
      containerId='section-blocks'
    >
      <Tab
        value={ ingredientText }
        active={ currentTab === ingredientText ? true : false }
        onClick={ () => setCurrent( ingredientText ) }
      >
        { children }
      </Tab>
    </Link>
  )
}

export default TabElement
