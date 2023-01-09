import { Link } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/actions/tab-actions';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TabElement = ({ children, ingredientText }) => {

  const dispatch = useDispatch();

  const current = useSelector(state => state.currentTab.current);

  const setCurrent = () => {
    dispatch({ type: SET_CURRENT_TAB, payload: { current: ingredientText } })
  }

  return (
    <Link
      to={ingredientText}
      spy={true}
      smooth={true}
      duration={700}
      containerId='section-blocks'
    >
      <Tab
        value={ingredientText}
        active={current === ingredientText}
        onClick={setCurrent}
      >
        {children}
      </Tab>
    </Link>
  )
};

export default TabElement;