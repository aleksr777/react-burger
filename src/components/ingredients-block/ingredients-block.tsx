import stylesScrollList from './ingredients-block.module.css'

type Props = {
  children: React.ReactNode
  title: string
}

const IngredientsBlock = ( { children, title }: Props ) => {
  return (
    <div className={ stylesScrollList.block }>
      <h3 className={ stylesScrollList.block__title }>{ title }</h3>
      <ul className={ stylesScrollList.block__list }>
        { children }
      </ul>
    </div>
  )
}

export default IngredientsBlock
