import appStyles from './app.module.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { START_LOADING } from '../../services/actions/loading-state-actions';
import AppHeader from '../app-header/app-header';
import AppMain from '../app-main/app-main';
import Preloader from '../../ui/preloader/preloader';

const App = () => {

  function startLoading() {
    dispatch({ type: START_LOADING, payload: {} })
  };

  const dispatch = useDispatch();

  const loadingState = useSelector(state => state.loadingState.isLoading);

  useEffect(() => { startLoading() }, []);

  return (

    <div className={appStyles.app}>

      <AppHeader />

      {loadingState ? (<Preloader />) : (<AppMain />)}

    </div >
  )
};

export default App;