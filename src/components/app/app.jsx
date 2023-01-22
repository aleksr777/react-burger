import appStyles from './app.module.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { GET_DATA_INGREDIENTS_REQUEST } from '../../services/actions/ingredients-data-actions';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Preloader from '../../ui/preloader/preloader';

const App = () => {

  const dispatch = useDispatch();

  const { loadingState } = useSelector(state => state.ingredientsData);

  useEffect(() => { dispatch({ type: GET_DATA_INGREDIENTS_REQUEST, payload: {} }) }, []);

  return (
    <div className={appStyles.app}>

      <AppHeader />

      {loadingState ? <Preloader /> : <AppMain />}

    </div >
  )
};

export default App;