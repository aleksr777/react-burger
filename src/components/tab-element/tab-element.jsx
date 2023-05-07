import { Link } from 'react-scroll';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/tab/tab-actions';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const getCurrentTabState = state => state.currentTab;


const TabElement = ({ children, ingredientText }) => {

  const dispatch = useDispatch();

  const { currentTab } = useSelector(getCurrentTabState);

  function setCurrent(ingredientText) {
    dispatch({ type: SET_CURRENT_TAB, payload: { currentTab: ingredientText } })
  }

  return (
    <Link
      to={ingredientText}
      spy={true}
      smooth={true}
      hashSpy={true}
      offset={-30}
      duration={800}
      delay={0}
      isDynamic={true}
      spyThrottle={0}
      ignoreCancelEvents={false}
      onSetActive={() => setCurrent(ingredientText)}
      containerId='section-blocks'
    >
      <Tab
        value={ingredientText}
        active={currentTab === ingredientText ? true : false}
      >
        {children}
      </Tab>
    </Link>
  )
};

export default TabElement;

TabElement.propTypes = {
  children: PropTypes.node.isRequired,
  ingredientText: PropTypes.string.isRequired
};