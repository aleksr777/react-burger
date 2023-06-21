import { memo } from 'react'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

type Props = {
  count: number
}

const CounterItem = ( { count }: Props ) => {
  return count > 0 ? <Counter count={ count } size='default' extraClass='m-1' /> : null
}

export default memo( CounterItem )
