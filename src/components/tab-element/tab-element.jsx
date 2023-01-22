import { Link } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/actions/tab-actions';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const getCurrentTabState = state => state.currentTab.current;

const TabElement = ({ children, ingredientText }) => {

  const dispatch = useDispatch();

  const current = useSelector(getCurrentTabState);

  const setCurrent = () => {
    dispatch({ type: SET_CURRENT_TAB, payload: { current: ingredientText } })
  }

  return (
    <Link
      to={ingredientText}
      spy={true}
      onSetActive={setCurrent}
      smooth={true}
      duration={700}
      offset={-20}
      containerId='section-blocks'
    >
      <Tab
        value={ingredientText}
        active={current === ingredientText}
      >
        {children}
      </Tab>
    </Link>
  )
};

export default TabElement;