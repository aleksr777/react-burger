import styles from './ingredients-block.module.css'

type Props = {
  children: React.ReactNode
  title: string
  type: 'buns' | 'sauces' | 'fillings'
}

const IngredientsBlock = ( { children, title, type }: Props ) => {
  return (
    <div className={ `${ styles.block } ${ type }` }>
      <h3 className={ styles.block__title }>{ title }</h3>
      <ul className={ styles.block__list }>
        { children }
      </ul>
    </div>
  )
}

export default IngredientsBlock
