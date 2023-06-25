import styles from './ingredients-block.module.css'

type Props = {
  children: React.ReactNode
  title: string
}

const IngredientsBlock = ( { children, title }: Props ) => {
  return (
    <div className={ styles.block }>
      <h3 className={ styles.block__title }>{ title }</h3>
      <ul className={ styles.block__list }>
        { children }
      </ul>
    </div>
  )
}

export default IngredientsBlock
